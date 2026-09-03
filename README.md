# tech@nyu Website

The official website for tech@nyu, NYU's premier technology club connecting artists, makers, and hackers.

## About tech@nyu

tech@nyu is the space for artists, makers, and hackers to build at NYU. We foster innovation, community, and growth through our diverse programs and events.

### Our Programs

- **Dev Team** - Build products from 0 → 1 in small cohorts, learning from users and creating public proof of work
- **Tech Treks** - Explore the tech industry with company visits and professional networking  
- **Buildathon** - A 48-hour hackathon for turning ambitious ideas into working projects
- **NYSW** - Student-run startup programming for founders, operators, investors, and students
- **Mentorship** - Connect with experienced mentors for career guidance and support

## Tech Stack

This website is built with modern web technologies:

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://framer.com/motion)
- **Deployment**: [Vercel](https://vercel.com)

## Project Structure

```
technyu2025/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections (hero, values, etc.)
│   ├── navigation/        # Navigation components
│   └── team_profiles/     # Team-related components
├── lib/                   # Utilities and constants
├── public/                # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/sean-lai-sh/technyu2025.git
cd technyu2025
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Contributing

We welcome contributions from tech@nyu members! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes locally before submitting

## Team

This website is maintained by the tech@nyu development team. Special thanks to all contributors who have helped build and improve our digital presence.

## Contact

- **Email**: hello@techatnyu.org
- **Website**: [techatnyu.org](https://techatnyu.org)
- **Instagram**: [@techatnyu](https://instagram.com/techatnyu)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by tech@nyu
