# Program CMS Schema Documentation

This document describes the CMS schema for Tech@NYU program pages, including data models, relationships, and parsing guidance.

---

## Table of Contents

1. [Entity Overview](#entity-overview)
2. [Relationships](#relationships)
3. [Section Block Types](#section-block-types)
4. [Example JSON](#example-json)
5. [Migration Mapping](#migration-mapping)
6. [Parsing Guidance](#parsing-guidance)

---

## Entity Overview

### Program (Document)

The main document type representing a program page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | string | ✓ | Auto-generated Sanity ID |
| `name` | string | ✓ | Display name (e.g., "Dev Team") |
| `slug` | slug | ✓ | URL path (e.g., `dev-team`) |
| `tagline` | string | ○ | Short catchphrase for cards |
| `order` | number | ○ | Display order in listings |
| `hero` | object | ✓ | Hero section configuration |
| `apply` | object | ○ | Application settings |
| `sections` | array | ○ | Ordered content blocks |
| `contacts` | contactLink[] | ○ | Contact information |
| `externalSite` | url | ○ | External website link |
| `descriptionSmall` | text | ○ | For program cards |
| `descriptionLarge` | text | ○ | For expanded cards |
| `desktopImage` | image | ○ | Card hero image |

### Hero Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ○ | Page heading (defaults to `name`) |
| `body` | blockContent[] | ✓ | Rich text paragraphs |
| `logoImage` | image | ✓ | Program logo (SVG preferred) |
| `heroImage` | image | ○ | Optional background image |

### Apply Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | boolean | ○ | `true` = open, `false` = closed |
| `link` | url | ○ | Default application form URL |
| `ctaLabel` | string | ○ | Custom button text |
| `statusText` | string | ○ | Custom closed message |

### Role (Embedded Object)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✓ | Role name |
| `description` | string | ✓ | Role description |
| `benefits` | string[] | ✓ | List of benefits |
| `buttonText` | string | ✓ | CTA text (default: "Apply") |
| `color` | enum | ✓ | `green` \| `blue` \| `purple` \| `orange` |
| `applicationLink` | url | ○ | Role-specific override |

### FAQItem (Embedded Object)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | ✓ | Question text |
| `answer` | text | ✓ | Answer text |

### StickyStep (Embedded Object)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✓ | Step title |
| `description` | text | ✓ | Step description |
| `image` | image | ✓ | Desktop image |
| `mobileImage` | image | ○ | Mobile override |

### PartnerLogo (Embedded Object)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | image | ✓ | Logo asset |
| `alt` | string | ✓ | Company name (accessibility) |
| `width` | number | ○ | Display width in px |
| `height` | number | ○ | Display height in px |

### ContactLink (Embedded Object)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | ✓ | Display text |
| `url` | url | ✓ | Link URL (supports `mailto:`) |

---

## Relationships

```
Program (document)
    │
    ├── hero
    │   ├── body (blockContent[])
    │   ├── logoImage (image)
    │   └── heroImage (image)
    │
    ├── apply
    │   └── status, link, ctaLabel, statusText
    │
    ├── sections[] (ordered blocks)
    │   ├── textSection
    │   │   └── body (blockContent[])
    │   │
    │   ├── stickyScrollSection
    │   │   └── items: StickyStep[]
    │   │
    │   ├── rolesSection
    │   │   └── roles: Role[]
    │   │
    │   ├── faqSection
    │   │   └── items: FAQItem[]
    │   │
    │   ├── logoSliderSection
    │   │   └── logos: PartnerLogo[]
    │   │
    │   └── ctaSection
    │       └── applyOverride (optional)
    │
    └── contacts: ContactLink[]
```

---

## Section Block Types

Each section in the `sections` array has a `_type` field identifying it.

### `textSection`
Simple heading + rich text body. Use for "About" intros.

```typescript
{
  _type: 'textSection',
  heading: string,
  body: PortableTextBlock[]
}
```

### `stickyScrollSection`
Sticky scroll timeline with steps. Use for "Curriculum" or "Process".

```typescript
{
  _type: 'stickyScrollSection',
  heading: string,
  showUnderline?: boolean,
  items: StickyStep[]
}
```

### `rolesSection`
Role cards with application links. Use for "Get Involved" sections.

```typescript
{
  _type: 'rolesSection',
  heading: string,
  intro?: string,
  preRolesContent?: ContentBlock[],
  rolesIntro?: string,
  roles: Role[],
  footer?: string,
  footerContact?: ContactLink
}
```

### `faqSection`
Accordion FAQ list.

```typescript
{
  _type: 'faqSection',
  heading: string,
  showUnderline?: boolean,
  items: FAQItem[]
}
```

### `logoSliderSection`
Animated partner logo carousel.

```typescript
{
  _type: 'logoSliderSection',
  heading: string,
  body?: string,
  logos: PartnerLogo[],
  speed?: number
}
```

### `ctaSection`
Call-to-action with optional apply override.

```typescript
{
  _type: 'ctaSection',
  heading: string,
  body: PortableTextBlock[],
  applyOverride?: {
    status?: boolean,
    link?: string,
    buttonText?: string
  }
}
```

---

## Example JSON

Here's the complete JSON for the **Dev Team** program:

```json
{
  "_id": "program-dev-team",
  "_type": "program",
  "name": "Dev Team",
  "slug": { "current": "dev-team" },
  "tagline": "Build, Ship, Repeat",
  "order": 1,

  "hero": {
    "title": "Dev Team",
    "body": [
      {
        "_type": "block",
        "style": "normal",
        "children": [
          {
            "_type": "span",
            "text": "Join a semesterly long sprint in taking a product from 0 to 1. Learn, adapt, grow, and ship like a startup catering to real users."
          }
        ]
      },
      {
        "_type": "block",
        "style": "normal",
        "children": [
          {
            "_type": "span",
            "text": "Whether you're a backend demon or a frontend wizard, there's a place for you on our team. If you can ship good quality code, we want you on this team!"
          }
        ]
      },
      {
        "_type": "block",
        "style": "normal",
        "children": [
          {
            "_type": "span",
            "text": "Since the program's launch in Spring 2024, previous members have joined FAANG, Jane Street, and startups. Some have even started their own design agencies!"
          }
        ]
      }
    ],
    "logoImage": {
      "_type": "image",
      "asset": { "_ref": "image-dev-team-logo" }
    }
  },

  "apply": {
    "status": true,
    "link": "https://docs.google.com/forms/d/e/1FAIpQLSco6rN52XWXSGx93tDN1zUB_yFe5qW9ZQRtapVxFxaTKL2siQ/viewform"
  },

  "sections": [
    {
      "_type": "stickyScrollSection",
      "_key": "curriculum",
      "heading": "The Curriculum",
      "items": [
        {
          "_key": "step1",
          "title": "Building",
          "description": "Start an intense sprint working with fellow engineers to turn mocks into an MVP. Collaborate together to acquire users and ship fast.",
          "image": { "_type": "image", "asset": { "_ref": "image-buildathon" } }
        },
        {
          "_key": "step2",
          "title": "Iteration",
          "description": "As you acquire users, learn how to iterate quick, respond, and add features to support a growing userbase leveraging Tech@NYU's network.",
          "image": { "_type": "image", "asset": { "_ref": "image-devteam2" } }
        },
        {
          "_key": "step3",
          "title": "Showcase",
          "description": "Finally show off to a panel of technical founders and experts, with the repository becoming open-source to add to your portfolio.",
          "image": { "_type": "image", "asset": { "_ref": "image-devteam3" } }
        },
        {
          "_key": "step4",
          "title": "Workshops",
          "description": "Internal workshops hosted by the club to help upskill. Workshops have covered RAG, MCP, agentic frameworks, post training, database sharding and optimizations, and more!",
          "image": { "_type": "image", "asset": { "_ref": "image-panel" } }
        }
      ]
    },
    {
      "_type": "rolesSection",
      "_key": "roles",
      "heading": "Ready to join?",
      "intro": "If you're curious about AI-powered development workflows, excited to experiment with autonomous coding agents, or interested in building tools that reshape how developers work, there's a place for you on our team.",
      "roles": [
        {
          "_key": "developer",
          "title": "Developer",
          "description": "Build an AI-native coding TUI for spec-driven development using modern terminal interfaces and agentic patterns",
          "benefits": [
            "Ship a cutting-edge development tool used by real developers",
            "Explore agentic coding and AI-native workflows",
            "Master CLI/TUI development and terminal interfaces",
            "Work with autonomous coding agents and spec-driven paradigms",
            "Collaborate with industry professionals and fellow students"
          ],
          "buttonText": "Apply",
          "color": "blue",
          "applicationLink": "https://docs.google.com/forms/d/e/1FAIpQLSco6rN52XWXSGx93tDN1zUB_yFe5qW9ZQRtapVxFxaTKL2siQ/viewform"
        }
      ],
      "footer": "Have questions? Reach out to us at",
      "footerContact": {
        "label": "devteam@techatnyu.org",
        "url": "mailto:devteam@techatnyu.org"
      }
    }
  ],

  "descriptionSmall": "Build in a small cohort a product from 0 -> 1. Learning what it takes to get and maintain users.",
  "descriptionLarge": "Build in a small cohort from 0 -> 1, learning from users, and creating public proof of work as we embark on the startup lifecycle. Experience what top engineering teams have to do to acquire and maintain users in a semester long sprint."
}
```

---

## Migration Mapping

### From `lib/consts.ts`

| Current Location | New Location |
|-----------------|--------------|
| `programsLinks[].name` | `program.name` |
| `programsLinks[].url` | Generated from `program.slug` |
| `programsLinks[].svgicon` | `program.hero.logoImage` |
| `programsLinks[].tagline` | `program.tagline` |
| `programsLinks[].description_small` | `program.descriptionSmall` |
| `programsLinks[].description_large` | `program.descriptionLarge` |
| `programsLinks[].desktopImage` | `program.desktopImage` |

### From `lib/application-links.json`

| Current | New Location |
|---------|--------------|
| `[program].status` | `program.apply.status` |
| `[program].link` | `program.apply.link` |
| `[program].roles[role].link` | `rolesSection.roles[].applicationLink` |

### From Role Constants

| Current (`devTeamRoles`, etc.) | New Location |
|-------------------------------|--------------|
| `title` | `rolesSection.roles[].title` |
| `description` | `rolesSection.roles[].description` |
| `benefits` | `rolesSection.roles[].benefits` |
| `buttonText` | `rolesSection.roles[].buttonText` |
| `color` | `rolesSection.roles[].color` |

### From FAQ Constants

| Current (`mentorshipFAQ`) | New Location |
|--------------------------|--------------|
| `question` | `faqSection.items[].question` |
| `answer` | `faqSection.items[].answer` |

### From Company Logos

| Current (`startupWeekCompanies`) | New Location |
|---------------------------------|--------------|
| `src` | `logoSliderSection.logos[].image` |
| `alt` | `logoSliderSection.logos[].alt` |
| `width` | `logoSliderSection.logos[].width` |
| `height` | `logoSliderSection.logos[].height` |

---

## Parsing Guidance

### Section Type → Component Mapping

```typescript
// Map section types to React components
const sectionComponents: Record<string, React.ComponentType<any>> = {
  textSection: TextSection,
  stickyScrollSection: StickyScrollSection,
  rolesSection: RolesSection,
  faqSection: FAQSection,
  logoSliderSection: LogoSliderSection,
  ctaSection: CTASection,
};

// Render sections dynamically
function ProgramPage({ program }: { program: Program }) {
  return (
    <div>
      <HeroSection hero={program.hero} apply={program.apply} />

      {program.sections?.map((section) => {
        const Component = sectionComponents[section._type];
        if (!Component) return null;
        return <Component key={section._key} {...section} programApply={program.apply} />;
      })}
    </div>
  );
}
```

### Application Link Resolution

Role application links follow this priority:

1. **Role-specific link**: `role.applicationLink` (if set)
2. **Program default**: `program.apply.link` (if `program.apply.status` is true)
3. **Closed state**: Show "Applications Closed" if neither is available

```typescript
function getApplicationLink(
  role: Role,
  programApply: ApplySettings
): { status: boolean; link: string | null } {
  // Role-specific override takes priority
  if (role.applicationLink) {
    return { status: true, link: role.applicationLink };
  }

  // Fall back to program settings
  if (programApply?.status && programApply?.link) {
    return { status: true, link: programApply.link };
  }

  // Closed
  return { status: false, link: null };
}
```

### Portable Text Rendering

For `hero.body`, `textSection.body`, and `ctaSection.body` fields:

```typescript
import { PortableText } from '@portabletext/react';

const components = {
  marks: {
    link: ({ value, children }) => (
      <a href={value.href} className="text-blue-500 hover:text-blue-400">
        {children}
      </a>
    ),
    highlight: ({ value, children }) => (
      <span className={`text-${value.color}-500 font-bold`}>
        {children}
      </span>
    ),
  },
};

// Usage
<PortableText value={body} components={components} />
```

### Image URL Resolution

Use Sanity's image URL builder:

```typescript
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Usage
<Image
  src={urlFor(stickyStep.image).width(800).url()}
  alt={stickyStep.title}
/>
```

---

## GROQ Queries

### Fetch single program with all sections

```groq
*[_type == "program" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  tagline,
  hero {
    title,
    body,
    "logoImage": logoImage.asset->url,
    "heroImage": heroImage.asset->url
  },
  apply,
  sections[] {
    _type,
    _key,
    heading,
    showUnderline,
    body,
    intro,
    items[] {
      ...,
      "image": image.asset->url,
      "mobileImage": mobileImage.asset->url
    },
    roles[] {
      ...
    },
    logos[] {
      ...,
      "image": image.asset->url
    },
    footer,
    footerContact,
    applyOverride
  },
  contacts,
  externalSite,
  descriptionSmall,
  descriptionLarge,
  "desktopImage": desktopImage.asset->url
}
```

### Fetch all programs for listings

```groq
*[_type == "program"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  tagline,
  descriptionSmall,
  descriptionLarge,
  "svgIcon": hero.logoImage.asset->url,
  "desktopImage": desktopImage.asset->url,
  "applicationOpen": apply.status
}
```

---

## File Structure

```
studio-tech@nyucms/schemaTypes/
├── index.ts                    # Exports all schemas
├── program.ts                  # Main program document
├── teamMember.ts               # Team member document
├── eboardBio.ts                # E-board bio document
├── value.ts                    # Value card document
│
├── objects/                    # Embedded object types
│   ├── stickyStep.ts
│   ├── partnerLogo.ts
│   ├── role.ts
│   ├── faqItem.ts
│   └── contactLink.ts
│
├── sections/                   # Section block types
│   ├── textSection.ts
│   ├── stickyScrollSection.ts
│   ├── rolesSection.ts
│   ├── faqSection.ts
│   ├── logoSliderSection.ts
│   └── ctaSection.ts
│
└── [legacy]/                   # Can be removed after migration
    ├── programRole.ts
    ├── faq.ts
    ├── companyLogo.ts
    └── galleryImage.ts
```
