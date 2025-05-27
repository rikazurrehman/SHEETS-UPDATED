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

# Contact Form with Google Sheets Integration

This project implements a sleek, gaming-themed contact form that submits data directly to Google Sheets, creating a simple CRM system without requiring a traditional backend server.

## Features

- **Google Sheets Integration**: Form submissions are sent directly to a Google Spreadsheet
- **reCAPTCHA Protection**: Spam prevention using Google reCAPTCHA v2
- **Modern UI**: Gaming-inspired design with glow effects and animations
- **Responsive Design**: Works on all devices from mobile to desktop
- **Error Validation**: Client-side form validation with helpful error messages
- **Toast Notifications**: User feedback on form submission status

## Setup Instructions

### 1. Google Apps Script Setup

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the contents of `google-sheets-script.js` into the script editor
4. Replace `SPREADSHEET_ID` with your own Google Spreadsheet ID or leave blank to create a new one
5. Deploy as a web app:
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the web app URL

### 2. reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site
3. Choose reCAPTCHA v2 ("I'm not a robot" checkbox)
4. Add your domains (including localhost for testing)
5. Copy the Site Key and Secret Key

### 3. Environment Variables

Create a `.env` file in your project root with:

```
VITE_GOOGLE_SCRIPT_URL=your_google_script_url
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 4. Testing the Connection

You can use the included `test-apps-script.html` file to test the connection to your Google Apps Script without involving the React app. Simply open it in a browser and:

1. Enter your Google Apps Script web app URL
2. Select the request method (GET to test connection, POST to test form submission)
3. Choose the content type and CORS mode
4. Fill in test data and click "Test Connection"

## Troubleshooting

### CORS Issues

This implementation handles CORS limitations when working with Google Apps Script by:

1. Using `no-cors` mode for fetch requests
2. Supporting both JSON and URL-encoded form data
3. Implementing a fallback mechanism when the primary method fails

If you experience CORS issues, try:

- Testing with the `test-apps-script.html` page
- Verifying your Google Apps Script web app deployment settings
- Checking the Google Apps Script logs for errors

### Google Sheets Access

If data isn't appearing in your spreadsheet:

1. Verify the spreadsheet ID in your script
2. Check that your Google account has edit access to the spreadsheet
3. Run the `testWithId()` function directly in the Apps Script editor
4. Review the execution logs in Apps Script for error messages

## Implementation Details

### Frontend (React + TypeScript)

The contact form is implemented in `src/components/Contact.tsx` and includes:

- Form state management with React hooks
- Error validation
- reCAPTCHA integration
- Multiple fetch strategies for maximum compatibility

### Backend (Google Apps Script)

The backend logic in `google-sheets-script.js` handles:

- Processing incoming form data
- Verifying reCAPTCHA responses
- Creating or accessing a spreadsheet
- Logging form submissions with timestamps
- Extensive error handling and debugging

## License

This project is open source and available under the MIT License.

## Credits

Developed by Rikaz for portfolio demonstration purposes.
