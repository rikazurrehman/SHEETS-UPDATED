
# Gaming-Themed Portfolio Website

A modern, responsive portfolio website with a gaming-inspired aesthetic, built using React and Tailwind CSS.

## Features

- Dark-themed UI with neon accents and gaming-inspired design elements
- Responsive layout that works on mobile, tablet, and desktop
- Interactive particle background animation
- Portfolio project showcase with modal details
- Skills visualization with progress bars
- Functional contact form with validation
- Smooth scrolling navigation

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- Framer Motion (for animations)
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gaming-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Customization

### Adding New Portfolio Projects

To add new portfolio projects, edit the `src/data/portfolioData.ts` file. Each project follows this structure:

```typescript
{
  id: number,
  title: string,
  shortDescription: string,
  fullDescription: string,
  imageUrl: string,
  tags: string[],
  tools: string[],
  highlights: string[],
  link: string | null,
  comingSoon: boolean
}
```

### Customizing Colors

The color scheme can be modified in the `tailwind.config.ts` file under the `theme.extend.colors.gaming` section.

### Updating Content

- Personal information can be updated in the respective component files
- Social media links can be updated in the `Contact.tsx` and `Footer.tsx` components
- Skills and their levels can be modified in the `Skills.tsx` component

## Deployment

This project can be deployed to any static site hosting service like Netlify, Vercel, or GitHub Pages.

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License
