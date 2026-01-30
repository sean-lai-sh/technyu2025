export type ProgramCardProps = {
  name: string;
  url: string;
  appOpen: boolean;
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

export type EboardBio = {
  name: string;
  slug: string;
  position?: string; // From teamMember.title
  category?: string; // From teamMember.category
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

export type SectionContent = {
  title: string;
  description: React.ReactNode;
  image?: string;
  flip?: boolean;
};
