import { ProgramCardProps, TeamMember, ValueCardProps } from "./types"

export const programs = [
    {name: "Dev Team", href: "/programs/dev-team"},
    {name: "Tech Treks", href: "/programs/tech-treks"},
    {name: "Startup Week", href: "/programs/startup-week"},
    {name: "Mentorship", href: "/programs/mentorship"},
]

export const contacts: [string, string][] = [
    ["Email", "mailto:hello@techatnyu.org"],
    ["Newsletter", "https://stats.sender.net/forms/bD2Zye/view"],
    ["Instagram", "https://www.instagram.com/techatnyu"],
    ["Discord", "https://discord.gg/q3cBnFMpMQ"],
    ["LinkedIn", "https://www.linkedin.com/company/tech-at-nyu"],
]

export const about = [
    {
        name: "Team",
        href: "/team"
    },
    {
        name: "Mission",
        href: "/"
    }

]

export const programsLinks: ProgramCardProps[] = [
    {
        name: "Dev Team",
        url: "/programs/dev-team",
        svgicon: "/program-logos/dev-team.svg",
        tagline: "Build, Ship, Repeat",
        description_large: "Build in a small cohort from 0 -> 1, learning from users, and creating public proof of work as we embark on the startup lifecycle. Experience what top engineering teams have to do to acquire and maintain users in a semester long sprint.",
        description_small: "Build in a small cohort a product from 0 -> 1. Learning what it takes to get and maintain users.",
        desktopImage: "/program-logos/dev-team-desktop.jpg"
    },
    {
        name: "Tech Treks",
        url: "/programs/tech-treks",
        svgicon: "/program-logos/tech-treks.svg",
        tagline: "The original beginner program",
        description_small: "Explore the tech industry with us! Meet professionals, visit companies, and build your resume",
        description_large: "Explore the tech industry with us! Meet professionals, visit companies, and get a behind-the-scenes look at the world of technology. Build your portfolio and receive guidance to ensure you're ready for SWE internships and roles.",
        desktopImage: "/program-logos/tech-treks-desktop.jpg"
    },
    {
        name: "Startup Week",
        url: "/programs/startup-week",
        svgicon: "/program-logos/startup-week.svg",
        tagline: "Launch your startup journey",
        description_small: "Build your network in nyc with VCs, founders, and operators all while hosting events",
        description_large: "Join our committee pulling off NYU's student run entrepreunership week, Startup Week. Network with the rising stars, learn what these Startups are looking for, and build lasting connections and friendships.",
        desktopImage: "/program-logos/startup-week-desktop.jpg"
    },
    {
        name: "Mentorship",
        url: "/programs/mentorship",
        svgicon: "/program-logos/mentorship.svg",
        tagline: "Guidance from those who came before you",
        description_large: "Connect with experienced mentors who can provide valuable insights, advice, and support as you navigate your career in tech. We'll match a mentor on your goals, on your own time. Leverage our network to succeed in this market",
        description_small: "Connect with mentors who can provide insights, advice, and support as you navigate your career in tech.",
        desktopImage: "/program-logos/mentorship-desktop.jpg"
    }
]

export const team_members: TeamMember[] = [
    {
        name: "Vivek Patel",
        title: "CTO @ Check, Former President",
        category: "Emeritus",
        imageUrl: "/team_pics/vivek-patel.png",
        linkedinUrl: "https://www.linkedin.com/in/vivek-patel-827b958b/",
        slug: "vivek-patel"
    },{
        name: "Terri Burns",
        title: "Type Capital Founder, Former President",
        category: "Emeritus",
        imageUrl: "/team_pics/terri-burns.png",
        linkedinUrl: "https://www.linkedin.com/in/tcburning/",
        slug: "terri-burns"
    }
]

export const valuesData: ValueCardProps[] = [
    {
        name: "Community",
        svgicon: "/value-logos/community.svg",
        description: "Meet other tech-enthusiasts, builders, and curious minds."
    },
    {
        name: "Learning", 
        svgicon: "/value-logos/learning.svg",
        description: "Pick up new skills or brush up your code."
    },
    {
        name: "Creativity", 
        svgicon: "/value-logos/creativity.svg",
        description: "Ideate and innovate your ideas through design and creative computing."
    }
]

// Tech Treks role data
export const techTreksMemberData = {
    title: "Member",
    description: "Perfect for students beginning their tech journey",
    benefits: [
      "Join a 12-15 person semesterly cohort",
      "Weekly meetings on Tuesdays and Fridays", 
      "Connect with industry professionals",
      "Learn from hands-on workshops",
      "Build software projects for your portfolio"
    ],
    buttonText: "Apply",
    color: "green" as const
};

export const techTreksPMData = {
    title: "Product Manager", 
    description: "Lead a team of three in creating a semester long project - Applications open Feb. 9th!",
    benefits: [
      "Help members build their projects",
      "Gain experience in managing full-stack projects",
      "Get all the perks that regular members get", 
      "Build mentorship and leadership skills",
      "Expand your network within the tech community"
    ],
    buttonText: "Apply as PM",
    color: "green" as const
};

// Tech Treks parallax gallery images data
export const techTreksGalleryImages = [
    {
      src: "/event-pics/img1.jpg",
      alt: "Tech Treks Event 1",
      style: "top-10 left-10 w-64 h-80"
    },
    {
      src: "/event-pics/img2.jpg", 
      alt: "Tech Treks Event 2",
      style: "top-32 right-16 w-56 h-72"
    },
    {
      src: "/event-pics/img3.jpg",
      alt: "Tech Treks Event 3", 
      style: "top-64 left-1/4 w-60 h-76"
    },
    {
      src: "/event-pics/img4.jpg",
      alt: "Tech Treks Event 4",
      style: "top-20 right-1/3 w-52 h-68"
    },
    {
      src: "/event-pics/img5.jpg",
      alt: "Tech Treks Event 5",
      style: "top-96 left-16 w-58 h-74"
    },
    {
      src: "/event-pics/img6.jpg",
      alt: "Tech Treks Event 6",
      style: "top-44 right-10 w-54 h-70"
    },
    {
      src: "/event-pics/img7.jpg",
      alt: "Tech Treks Event 7",
      style: "top-16 left-1/3 w-62 h-78"
    },
    {
      src: "/event-pics/img10.jpg",
      alt: "Tech Treks Event 8",
      style: "top-80 right-1/4 w-56 h-72"
    },
    {
      src: "/event-pics/eboard_pic.jpg",
      alt: "Tech Treks Eboard",
      style: "top-52 left-20 w-68 h-84"
    },
    {
      src: "/event-pics/eboardpic1.jpg",
      alt: "Tech Treks Team",
      style: "top-28 right-12 w-60 h-76"
    }
];

// Startup Week team roles
export const startupWeekRoles = [
    {
        title: "Design & Marketing",
        description: "Create stunning visuals, manage social media, and craft compelling content to promote Startup Week",
        benefits: [
            "Build a portfolio with real-world design projects",
            "Learn marketing strategies for tech events",
            "Work with industry-standard design tools",
            "Create content that reaches thousands of students"
        ],
        buttonText: "Apply",
        color: "purple" as const
    },
    {
        title: "Operations",
        description: "Handle logistics, coordinate events, and ensure everything runs smoothly during Startup Week",
        benefits: [
            "Develop project management skills",
            "Network with industry professionals",
            "Learn event planning at scale",
            "Gain experience in team coordination"
        ],
        buttonText: "Apply",
        color: "blue" as const
    },
    {
        title: "Outreach/Growth",
        description: "Connect with sponsors, reach out to speakers, and build partnerships with companies and organizations",
        benefits: [
            "Build business development skills",
            "Network with startup founders and VCs",
            "Learn partnership and sponsorship strategies",
            "Develop communication and negotiation skills"
        ],
        buttonText: "Apply",
        color: "green" as const
    },
    {
        title: "Engineering",
        description: "Build and maintain the technical infrastructure for Startup Week, including websites and digital tools",
        benefits: [
            "Work on real production applications",
            "Learn modern web development technologies",
            "Contribute to open-source projects",
            "Build tools used by hundreds of participants"
        ],
        buttonText: "Apply",
        color: "orange" as const
    }
];

// Startup Week company logos
export const startupWeekCompanies = [
    {
        src: "/company-logos/ycombinator.svg",
        alt: "Y Combinator",
        width: 60,
        height: 60
    },
    {
        src: "/company-logos/sequoia.svg",
        alt: "Sequoia Capital",
        width: 450,
        height: 60
    },
    {
        src: "/company-logos/stripe.svg",
        alt: "Stripe",
        width: 144,
        height: 60
    },
    {
        src: "/company-logos/neo.svg",
        alt: "Neo",
        width: 150,
        height: 60
    },
    {
        src: "/company-logos/notion.svg",
        alt: "Notion",
        width: 173,
        height: 60
    },
    {
        src: "/company-logos/anthropic.svg",
        alt: "Anthropic",
        width: 87,
        height: 60
    },
    {
        src: "/company-logos/figma.svg",
        alt: "Figma",
        width: 40,
        height: 60
    },
    {
        src: "/company-logos/vercel.svg",
        alt: "Vercel",
        width: 60,
        height: 60
    },
    {
        src: "/company-logos/google.svg",
        alt: "Google",
        width: 183,
        height: 60
    },
    {
        src: "/company-logos/zfellows.svg",
        alt: "ZFellows",
        width: 225,
        height: 60
    },
    {
        src: "/company-logos/google-ventures.svg",
        alt: "Google Ventures",
        width: 95,
        height: 60
    },
    {
        src: "/company-logos/meta.svg",
        alt: "Meta",
        width: 90,
        height: 60
    },
    {
        src: "/company-logos/adobe.svg",
        alt: "Adobe",
        width: 54,
        height: 60
    },
    {
        src: "/company-logos/microsoft.svg",
        alt: "Microsoft",
        width: 60,
        height: 60
    },
];

// Dev Team roles
export const devTeamRoles = [
    {
        title: "Developer",
        description: "Build an AI-native coding TUI for spec-driven development using modern terminal interfaces and agentic patterns",
        benefits: [
            "Ship a cutting-edge development tool used by real developers",
            "Explore agentic coding and AI-native workflows",
            "Master CLI/TUI development and terminal interfaces",
            "Work with autonomous coding agents and spec-driven paradigms",
            "Collaborate with industry professionals and fellow students"
        ],
        buttonText: "Apply",
        color: "blue" as const
    },
];

// Mentorship FAQ data
export const mentorshipFAQ = [
    {
        question: "What kind of mentors do you have?",
        answer: "Our mentors are industry professionals working at top tech companies like Google, Meta, Microsoft, early-stage startups, and successful entrepreneurs. They span various roles including software engineers, product managers, designers, data scientists, and founders with 3-15+ years of experience. If you are keen on supporting this initative send us an email at hello@techatnyu.org with the subject line 'Mentorship Volunteer'."
    },
    {
        question: "How long does the mentorship program last?",
        answer: "Our mentorship program typically runs for one semester (about 4 months). This gives you enough time to build a meaningful relationship with your mentor and work towards your goals. Some mentorships may continue beyond the formal program if both parties agree."
    },
    {
        question: "How are mentors and mentees matched?",
        answer: "We use a careful matching process based on your goals, interests, background, and career aspirations. After you submit your application, our mentorship leads will interview you to better understand your needs. We then match you with a mentor who has relevant experience and can best support your journey."
    },
    {
        question: "How often do I meet with my mentor?",
        answer: "Most mentor-mentee pairs meet for 1 hour every 2 weeks, but the frequency and format are flexible based on both schedules. Some prefer weekly 30-minute calls, while others do monthly longer sessions. We encourage consistent communication and setting expectations early."
    },
    {
        question: "What can I work on with my mentor?",
        answer: "The mentorship is tailored to your goals! Common focuses include: technical skill development, career guidance and job search strategy, resume and LinkedIn optimization, interview preparation (technical and behavioral), side project guidance, startup advice, and general professional development."
    },
    {
        question: "Is there a cost to participate?",
        answer: "No! The mentorship program is completely free for NYU students. Our mentors volunteer their time because they're passionate about giving back to the next generation of technologists."
    },
    {
        question: "What if I'm not a Computer Science major?",
        answer: "No problem! We welcome students from all majors who are interested in tech. Whether you're in business, design, liberal arts, or any other field, if you're curious about technology and want to learn from industry professionals, we'd love to have you."
    },
    {
        question: "How do I apply?",
        answer: "Applications open at the beginning of each semester. Fill out our application form detailing your background, goals, and what you hope to gain from mentorship. After submitting, you'll have a brief interview with our team to help us find the perfect mentor match for you."
    }
];
