# Gaming-Themed Portfolio Website

A high-performance, gaming-themed portfolio website for showcasing 3D campaigns, video editing, and creative work.

## Features

- Responsive design with gaming-inspired aesthetics
- Optimized for performance on all devices
- Video portfolio with lazy loading
- Interactive UI elements with performance-focused animations
- Contact form with validation

## Performance Optimizations

This website includes several performance optimizations to ensure smooth operation even on lower-end devices:

### Core Web Vitals Optimization

- Optimized LCP (Largest Contentful Paint) by prioritizing critical rendering
- Reduced CLS (Cumulative Layout Shift) with proper image dimensions and placeholders
- Improved FID (First Input Delay) with code splitting and optimized event handlers

### Media Optimizations

- Lazy loading for images and videos
- Automatic video quality adjustment based on device capabilities
- Optimized particle animations with spatial partitioning
- Video format selection based on browser support
- Reduced animation complexity on low-end devices

### Code Optimizations

- React component memoization to prevent unnecessary re-renders
- Performance monitoring utilities
- Optimized React Query configuration
- Efficient state management
- Throttled animations and effects

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gaming-themed.git
cd gaming-themed
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Build for production
```bash
npm run build
# or
yarn build
# or
bun run build
```

## Project Structure

```
gaming-themed/
├── public/             # Static assets
│   └── assets/         # Images, videos, etc.
├── src/                # Source code
│   ├── components/     # React components
│   │   └── ui/         # UI components
│   ├── data/           # Data files
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Third-party library configurations
│   ├── pages/          # Page components
│   └── utils/          # Utility functions
├── .gitignore          # Git ignore file
├── components.json     # Component configuration
├── package.json        # Project dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## Performance Utilities

The project includes several custom utilities for performance optimization:

### Media Optimizer

Located in `src/utils/mediaOptimizer.ts`, this utility provides functions for:
- Preloading videos strategically
- Optimizing image loading with priority queues
- Setting up lazy loading for media elements

Usage:
```typescript
import { preloadVideos, optimizeImageLoading } from '@/utils/mediaOptimizer';

// Preload important videos
preloadVideos(['video1.mp4', 'video2.mp4'], 'medium');

// Optimize image loading with priority
optimizeImageLoading(imageUrls, [0, 1, 2]); // First 3 images are high priority
```

### Video Optimizer

Located in `src/utils/videoOptimizer.ts`, this utility provides functions for:
- Detecting supported video formats
- Creating optimized video elements
- Adjusting video quality based on device capabilities

Usage:
```typescript
import { optimizeExistingVideo } from '@/utils/videoOptimizer';

// Optimize a video element
const videoRef = useRef<HTMLVideoElement>(null);
useEffect(() => {
  if (videoRef.current) {
    optimizeExistingVideo(videoRef.current, {
      enablePlaybackRate: true,
      lowQualityForLowEndDevices: true
    });
  }
}, []);
```

### Performance Monitor

Located in `src/utils/performanceMonitor.ts`, this utility provides:
- Core Web Vitals monitoring
- Automatic optimizations for low-end devices
- Performance metrics collection

## Custom Hooks

### useMediaOptimization

A custom hook for optimizing media loading and playback:

```typescript
import useMediaOptimization from '@/hooks/useMediaOptimization';

const { registerMediaElement, optimizeVideo } = useMediaOptimization({
  videoUrls: ['video1.mp4', 'video2.mp4'],
  imageUrls: ['image1.jpg', 'image2.jpg'],
  videoQuality: 'medium'
});
```

### useLazyLoad

A custom hook for lazy loading elements:

```typescript
import { useLazyImage } from '@/hooks/useLazyLoad';

const { ref, src, isLoaded } = useLazyImage('image.jpg');

return <img ref={ref} src={src} alt="Lazy loaded image" />;
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Rikazur Rehman M
