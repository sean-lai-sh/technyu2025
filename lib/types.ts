export type ProgramCardProps = {
  name: string;
  url: string;
  svgicon: string;
  tagline: string;
  description_small: string;
  description_large: string;
  desktopImage: string;
};

export type TeamMember = {
  name: string;
  title: string;
  category: string;
  imageUrl: string;
  linkedinUrl?: string;
  slug: string;
  fadeIn?: string; // Optional second image URL to fade in on hover
};

export type ValueCardProps = {
  name: string;
  svgicon: string;
  description: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  order: number;
};

export type ProfileBio = {
  name: string;
  slug: string;
  position?: string; // From profile.title
  category?: string; // From profile.category
  shortDescription?: string;
  linkedinUrl?: string;
  profileImage: {
    url: string;
    alt?: string;
  };
  timeline?: TimelineItem[];
  qa?: {
    question: string;
    answer: string;
    media?: {
      url: string;
      alt?: string;
    } | null;
  }[];
};

// ===== Sanity Program Types =====

export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type PortableTextBlock = {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _key: string;
    _type: string;
    href?: string;
    color?: string;
  }[];
  style?: string;
};

export type ContactLink = {
  _key?: string;
  label: string;
  href: string;
};

export type SanityRole = {
  _key: string;
  title: string;
  isOpen?: boolean;
  description: string;
  benefits: string[];
  buttonText: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
  applicationLink?: string;
};

export type StickyStep = {
  _key: string;
  title: string;
  description: string;
  imageUrl: string;
  mobileImageUrl?: string;
};

export type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type PartnerLogo = {
  _key: string;
  alt: string;
  imageUrl: string;
  width?: number;
  height?: number;
};

// Section Types
export type TextSection = {
  _key: string;
  _type: 'textSection';
  heading?: string;
  body?: PortableTextBlock[];
};

export type StickyScrollSection = {
  _key: string;
  _type: 'stickyScrollSection';
  heading: string;
  showUnderline?: boolean;
  items: StickyStep[];
};

export type RolesSection = {
  _key: string;
  _type: 'rolesSection';
  heading: string;
  intro?: string;
  preRolesContent?: {
    _key: string;
    type: 'subheading' | 'paragraph' | 'contact';
    text?: string;
    link?: string;
  }[];
  rolesIntro?: string;
  roles: SanityRole[];
  footer?: string;
  footerContact?: ContactLink;
};

export type FaqSection = {
  _key: string;
  _type: 'faqSection';
  heading: string;
  showUnderline?: boolean;
  items: FaqItem[];
};

export type LogoSliderSection = {
  _key: string;
  _type: 'logoSliderSection';
  heading: string;
  body?: string;
  logos: PartnerLogo[];
  speed?: number;
};

export type CtaSection = {
  _key: string;
  _type: 'ctaSection';
  heading: string;
  body?: PortableTextBlock[];
  applyOverride?: {
    status?: boolean;
    link?: string;
    buttonText?: string;
  };
};

export type ProgramSection =
  | TextSection
  | StickyScrollSection
  | RolesSection
  | FaqSection
  | LogoSliderSection
  | CtaSection;

export type SanityProgram = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  order?: number;
  // Hero section
  hero: {
    title?: string;
    body: PortableTextBlock[];
    logoImageUrl: string;
    heroImageUrl?: string;
  };
  // Application settings
  apply?: {
    status?: boolean;
    link?: string;
    ctaLabel?: string;
    statusText?: string;
  };
  // Page sections
  sections?: ProgramSection[];
  // Contacts
  contacts?: ContactLink[];
  externalSite?: string;
  // Card display fields
  descriptionSmall?: string;
  descriptionLarge?: string;
  desktopImageUrl?: string;
};
