import { defineQuery } from 'next-sanity'
import { client } from './client'
import {
  TeamMember,
  SanityProgram,
  PressPost,
  PressPostPreview,
  PressSpotlight,
} from '../types'

const pressClient = client.withConfig({
  useCdn: false,
})

// GROQ query for team members
const teamMembersQuery = defineQuery(/* groq */ `
  *[_type == "profile"]
  | order(order asc)
  {
    name,
    title,
    category,
    "slug": slug.current,
    "linkedinUrl": linkedinUrl,
    "imageUrl": profileImage.asset->url,
    "fadeIn": select(
      defined(fadeInImage.asset) => fadeInImage.asset->url,
      null
    )
  }
`)

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await client.fetch(teamMembersQuery)
    return members
  } catch (error) {
    console.error('Error fetching team members from Sanity:', error)
    return []
  }
}

// GROQ query for individual profile
const profileQuery = defineQuery(/* groq */ `
  *[_type == "profile" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    shortDescription,
    "profileImage": {
      "url": profileImage.asset->url,
      "alt": profileImage.alt
    },
    "position": title,
    category,
    linkedinUrl,
    timeline[]{
      year,
      title,
      order
    } | order(year desc, order asc),
    qa[]{
      question,
      answer,
      "media": select(
        defined(media.asset) => {
          "url": media.asset->url,
          "alt": media.alt
        },
        null
      )
    }
  }
`)

export async function getProfile(slug: string) {
  try {
    const bio = await client.fetch(profileQuery, { slug })
    return bio
  } catch (error) {
    console.error('Error fetching profile from Sanity:', error)
    return null
  }
}

// ===== Program Queries =====

// Full program query with all sections expanded
const programBySlugQuery = defineQuery(/* groq */ `
  *[_type == "program" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    tagline,
    order,
    hero {
      title,
      body,
      "logoImageUrl": logoImage.asset->url,
      "heroImageUrl": heroImage.asset->url
    },
    apply {
      status,
      link,
      ctaLabel,
      statusText
    },
    sections[]{
      _key,
      _type,
      // textSection fields
      _type == "textSection" => {
        heading,
        body
      },
      // stickyScrollSection fields
      _type == "stickyScrollSection" => {
        heading,
        showUnderline,
        items[]{
          _key,
          title,
          description,
          "imageUrl": image.asset->url,
          "mobileImageUrl": mobileImage.asset->url
        }
      },
      // rolesSection fields
      _type == "rolesSection" => {
        heading,
        intro,
        preRolesContent[]{
          _key,
          type,
          text,
          link
        },
        rolesIntro,
        roles[]{
          _key,
          title,
          isOpen,
          description,
          benefits,
          buttonText,
          color,
          applicationLink
        },
        footer,
        footerContact {
          label,
          href
        }
      },
      // faqSection fields
      _type == "faqSection" => {
        heading,
        showUnderline,
        items[]{
          _key,
          question,
          answer
        }
      },
      // logoSliderSection fields
      _type == "logoSliderSection" => {
        heading,
        body,
        logos[]{
          _key,
          alt,
          "imageUrl": image.asset->url,
          width,
          height
        },
        speed
      },
      // ctaSection fields
      _type == "ctaSection" => {
        heading,
        body,
        applyOverride {
          status,
          link,
          buttonText
        }
      }
    },
    contacts[]{
      _key,
      label,
      href
    },
    externalSite,
    descriptionSmall,
    descriptionLarge,
    "desktopImageUrl": desktopImage.asset->url
  }
`)

export async function getProgramBySlug(slug: string): Promise<SanityProgram | null> {
  try {
    const program = await client.fetch(programBySlugQuery, { slug })
    return program
  } catch (error) {
    console.error('Error fetching program from Sanity:', error)
    return null
  }
}

// Get all programs for listings
const allProgramsQuery = defineQuery(/* groq */ `
  *[_type == "program"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    order,
    descriptionSmall,
    descriptionLarge,
    "svgIconUrl": hero.logoImage.asset->url,
    "desktopImageUrl": desktopImage.asset->url,
    apply {
      status,
      link
    }
  }
`)

export type ProgramListItem = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  order?: number;
  descriptionSmall?: string;
  descriptionLarge?: string;
  svgIconUrl?: string;
  desktopImageUrl?: string;
  apply?: {
    status?: boolean;
    link?: string;
  };
};

export async function getAllPrograms(): Promise<ProgramListItem[]> {
  try {
    const programs = await client.fetch(allProgramsQuery)
    return programs
  } catch (error) {
    console.error('Error fetching programs from Sanity:', error)
    return []
  }
}

// ===== Press Queries =====

const pressPostPreviewFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  layout,
  excerpt,
  eyebrow,
  seoTitle,
  seoDescription,
  sourceName,
  sourceUrl,
  "coverImage": select(
    defined(coverImage.asset) => {
      "url": coverImage.asset->url,
      "alt": coverImage.alt
    },
    {
      "url": null,
      "alt": coverImage.alt
    }
  )
`

const pressBodyFields = /* groq */ `
  body[]{
    ...,
    _type == "block" => {
      _key,
      _type,
      style,
      markDefs[]{
        _key,
        _type,
        href,
        color
      },
      children[]{
        _key,
        _type,
        text,
        marks
      }
    },
    _type == "image" => {
      _key,
      _type,
      "imageUrl": asset->url,
      alt,
      caption
    }
  }
`

const pressSpotlightQuery = defineQuery(/* groq */ `
  *[_type == "pressSpotlight" && _id == "pressSpotlight"][0]{
    "featuredPost": featuredPost->{
      ${pressPostPreviewFields}
    },
    "secondaryPosts": secondaryPosts[]->{
      ${pressPostPreviewFields}
    }
  }
`)

export async function getPressSpotlight(): Promise<PressSpotlight | null> {
  try {
    const spotlight = await pressClient.fetch(pressSpotlightQuery)

    if (
      !spotlight?.featuredPost ||
      !Array.isArray(spotlight.secondaryPosts) ||
      spotlight.secondaryPosts.length !== 3
    ) {
      return null
    }

    return spotlight as PressSpotlight
  } catch (error) {
    console.error('Error fetching press spotlight from Sanity:', error)
    return null
  }
}

const pressIndexQuery = defineQuery(/* groq */ `
  *[
    _type == "pressPost" &&
    defined(slug.current) &&
    !(_id in $excludedIds)
  ]
  | order(publishedAt desc) {
    ${pressPostPreviewFields}
  }
`)

export type PressIndexResult = {
  spotlight: PressSpotlight | null
  posts: PressPostPreview[]
}

export async function getPressIndex(): Promise<PressIndexResult> {
  try {
    const spotlight = await getPressSpotlight()
    const excludedIds = [
      spotlight?.featuredPost?._id,
      ...(spotlight?.secondaryPosts?.map((post) => post._id) ?? []),
    ].filter((id): id is string => Boolean(id))

    const posts = await pressClient.fetch<PressPostPreview[]>(pressIndexQuery, {
      excludedIds,
    })

    return {
      spotlight,
      posts,
    }
  } catch (error) {
    console.error('Error fetching press index from Sanity:', error)
    return {
      spotlight: null,
      posts: [],
    }
  }
}

const pressPostBySlugQuery = defineQuery(/* groq */ `
  *[_type == "pressPost" && slug.current == $slug][0]{
    ${pressPostPreviewFields},
    ${pressBodyFields}
  }
`)

export async function getPressPostBySlug(slug: string): Promise<PressPost | null> {
  try {
    const post = await pressClient.fetch<PressPost>(pressPostBySlugQuery, { slug })
    return post ?? null
  } catch (error) {
    console.error(`Error fetching press post "${slug}" from Sanity:`, error)
    return null
  }
}

const allPressSlugsQuery = defineQuery(/* groq */ `
  *[_type == "pressPost" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export async function getAllPressSlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await pressClient.fetch<{ slug: string }[]>(allPressSlugsQuery)
    return slugs
  } catch (error) {
    console.error('Error fetching press slugs from Sanity:', error)
    return []
  }
}
