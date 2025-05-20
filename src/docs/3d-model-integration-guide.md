# Guide: Adding 3D Models to Your Gaming-Themed Website

This guide will walk you through the process of adding 3D models to your website, from creating models to displaying them in your portfolio.

## Table of Contents

1. [Creating/Finding 3D Models](#creating-finding-3d-models)
2. [Hosting 3D Models](#hosting-3d-models)
3. [Adding Models to the Portfolio Data](#adding-models-to-portfolio-data)
4. [Displaying 3D Models in the Works Page](#displaying-3d-models-in-works-page)
5. [Optimizing 3D Models for Web Performance](#optimizing-3d-models)

## 1. Creating/Finding 3D Models <a name="creating-finding-3d-models"></a>

### Creating Your Own Models

To create your own 3D models, you can use various software:

- **Blender** (Free) - Powerful open-source 3D creation software
- **Maya** - Industry standard for animation and modeling
- **Cinema 4D** - Excellent for motion graphics and visual effects
- **ZBrush** - Specialized for detailed sculpting

### Finding Ready-Made Models

If you don't want to create your own models, you can find free or paid models on:

- **Sketchfab** - Online platform to publish and find 3D models
- **TurboSquid** - Marketplace for 3D models
- **CGTrader** - Community of 3D designers and marketplace
- **Free3D** - Free 3D models for download

## 2. Hosting 3D Models <a name="hosting-3d-models"></a>

There are several ways to host your 3D models for web viewing:

### Option 1: Sketchfab (Recommended for Beginners)

1. Create an account on [Sketchfab](https://sketchfab.com/)
2. Upload your 3D model
3. Configure the viewer settings
4. Get the embed code or the model URL

Example Sketchfab embed URL:
```
https://sketchfab.com/models/e172df862b684f719781a4b6456e6aff/embed
```

### Option 2: Self-hosting with Three.js

For more control and customization, you can use Three.js:

1. Export your model as glTF or GLB format (most web-friendly format)
2. Set up a Three.js scene in your website 
3. Load the model using Three.js's GLTFLoader

This option requires more technical knowledge but gives you complete control over the viewing experience.

## 3. Adding Models to the Portfolio Data <a name="adding-models-to-portfolio-data"></a>

To add your 3D model to the portfolio, edit the `portfolioData.ts` file in the src/data directory:

```typescript
// Add a new entry to the portfolioData array
{
  id: 11, // Ensure this is unique
  title: "Your 3D Model Name",
  category: "3D Modeling", // or another relevant category
  shortDescription: "Brief description of your 3D model",
  fullDescription: "Detailed description of your 3D model, techniques used, purpose, etc.",
  imageUrl: "/assets/thumbnails/your-model-thumbnail.jpg", // A thumbnail image
  mediaType: "3d-model", // Important: specify this is a 3D model
  mediaUrl: "https://sketchfab.com/models/your-model-id/embed", // Your Sketchfab embed URL
  tags: ["3D", "Character", "Animation"], // Relevant tags
  tools: ["Blender", "Substance Painter"],
  highlights: [
    "Feature 1 of your model",
    "Feature 2 of your model",
    "Feature 3 of your model"
  ],
  link: "https://sketchfab.com/3d-models/your-model-id", // Direct link to the model
  comingSoon: false
}
```

## 4. Displaying 3D Models in the Works Page <a name="displaying-3d-models-in-works-page"></a>

The Works page is already set up to display 3D models using iframes for Sketchfab embeds. When a user clicks on a portfolio item with `mediaType: "3d-model"`, it will open in a modal with the embedded 3D viewer.

For custom Three.js integration, you'll need to create a new component:

1. Create a `ThreeJsViewer.tsx` component
2. Import the necessary Three.js libraries
3. Set up a scene, camera, and renderer
4. Load your model using GLTFLoader
5. Replace the iframe in the Works page modal with your custom viewer component

## 5. Optimizing 3D Models for Web Performance <a name="optimizing-3d-models"></a>

3D models can be resource-intensive. Follow these best practices:

### Model Optimization

1. **Reduce polygon count** - Use decimation tools in your 3D software
2. **Optimize textures** - Compress textures and use appropriate formats (JPG for color maps, PNG for alpha)
3. **Use Level of Detail (LOD)** - Show simpler models at greater distances
4. **Minimize texture size** - Use the smallest texture dimensions possible without sacrificing quality

### Web Performance

1. **Lazy load 3D content** - Only load when needed
2. **Provide loading indicators** - Show progress while models load
3. **Use draco compression** for glTF models
4. **Consider mobile devices** - Provide simplified versions for mobile

## Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Sketchfab API Documentation](https://sketchfab.com/developers)
- [glTF Format Specification](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0)
- [Blender Documentation](https://docs.blender.org/)

---

Happy 3D modeling! If you have any questions or need assistance, don't hesitate to reach out. 