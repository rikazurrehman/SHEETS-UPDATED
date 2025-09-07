# 3D Models Directory

This directory contains GLB (GL Transmission Format Binary) files for the 3D Modelling projects in the portfolio.

## Current Files

- `architectural-visualization.glb` - Placeholder for architectural visualization model
- `salon-equipment.glb` - Placeholder for salon equipment models
- `character-model.glb` - Placeholder for character model

## Adding Your Own GLB Models

1. **Replace Placeholder Files**: Replace the placeholder `.glb` files with your actual 3D models
2. **File Naming**: Keep the same filenames or update the `glbUrl` field in `src/data/portfolioData.ts`
3. **File Size**: Optimize your GLB files for web delivery (recommended < 10MB per model)
4. **Format**: Ensure files are in GLB format (not GLTF)

## GLB Model Requirements

- **Format**: GLB (GL Transmission Format Binary)
- **Textures**: Embedded in the GLB file
- **Materials**: PBR materials recommended
- **Animations**: Supported if present in the model
- **Size**: Optimized for web delivery

## Optimization Tips

1. **Compress Textures**: Use compressed texture formats
2. **Reduce Polygons**: Optimize geometry for web performance
3. **LOD Models**: Consider using Level of Detail models for complex scenes
4. **File Size**: Keep individual models under 10MB for better loading performance

## Testing

After adding your GLB models:
1. Start the development server: `npm run dev`
2. Navigate to the Works page
3. Click on "3D Modelling" filter
4. Click "View Project" on any 3D Modelling project
5. The custom Three.js viewer should load your GLB model

## Troubleshooting

- **Model Not Loading**: Check browser console for errors
- **Performance Issues**: Optimize your GLB model or reduce polygon count
- **Loading Errors**: Ensure GLB file is valid and not corrupted
- **CORS Issues**: Make sure files are served from the same domain

## Three.js Viewer Features

The custom viewer includes:
- **Interactive Controls**: Mouse/touch controls for rotation, zoom, and pan
- **Lighting**: Professional lighting setup with shadows
- **Fullscreen Mode**: Toggle fullscreen viewing
- **Auto-rotate**: Optional automatic rotation
- **Loading States**: Progress indicators during model loading
- **Error Handling**: Graceful error handling for failed loads
