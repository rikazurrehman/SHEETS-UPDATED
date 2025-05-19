
const portfolioData = [
  // Video Editing
  {
    id: 1,
    title: "Documentary Film Editing",
    category: "Video Editing",
    shortDescription: "Feature-length documentary film post-production",
    fullDescription: "Completed full post-production editing for a 90-minute documentary film about wildlife conservation. Work included color grading, audio mixing, and extensive footage compilation from over 200 hours of raw content.",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279",
    mediaType: "video",
    mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tags: ["Documentary", "Color Grading", "Audio Mixing"],
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    highlights: [
      "Complex timeline management",
      "Professional color grading",
      "Custom audio treatment"
    ],
    link: "#",
    comingSoon: false
  },
  {
    id: 2,
    title: "Commercial Advertisement",
    category: "Video Editing",
    shortDescription: "30-second product commercial for social media",
    fullDescription: "Created a high-energy 30-second commercial for a tech product launch, optimized for social media platforms. The advertisement featured dynamic transitions, custom text animations, and strategic pacing to maximize viewer retention.",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    mediaType: "video",
    mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tags: ["Commercial", "Fast Cuts", "Social Media"],
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    highlights: [
      "Platform-optimized formats",
      "Dynamic text animations",
      "Engagement-focused editing"
    ],
    link: "#",
    comingSoon: false
  },
  
  // 3D Campaigns/CGI
  {
    id: 3,
    title: "Product Launch Campaign",
    category: "3D Campaigns/CGI",
    shortDescription: "Full CGI campaign for smartphone launch",
    fullDescription: "Developed a comprehensive CGI campaign for a flagship smartphone launch, including 15 photorealistic renders, 3 animated sequences, and various marketing assets. The campaign helped achieve a 40% increase in pre-order sales.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    mediaType: "video",
    mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tags: ["Product Launch", "Photorealistic CGI", "Marketing Campaign"],
    tools: ["Blender", "Cinema 4D", "After Effects"],
    highlights: [
      "Photorealistic material creation",
      "Technical product accuracy",
      "Multi-platform asset delivery"
    ],
    link: "#",
    comingSoon: false
  },
  {
    id: 4,
    title: "Architectural Visualization",
    category: "3D Campaigns/CGI",
    shortDescription: "Real estate development visualization",
    fullDescription: "Created comprehensive architectural visualization for a luxury real estate development, including exterior renders, interior walkthroughs, and an interactive virtual tour experience for potential buyers.",
    imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
    mediaType: "3d-model",
    mediaUrl: "https://sketchfab.com/models/e172df862b684f719781a4b6456e6aff/embed",
    tags: ["Architecture", "Real Estate", "Virtual Tour"],
    tools: ["Blender", "Unreal Engine", "V-Ray"],
    highlights: [
      "Physically accurate lighting",
      "Interactive exploration",
      "High-detail modeling"
    ],
    link: "https://sketchfab.com/3d-models/room-e172df862b684f719781a4b6456e6aff",
    comingSoon: false
  },
  
  // Motion Graphics
  {
    id: 5,
    title: "Event Opening Sequence",
    category: "Motion Graphics",
    shortDescription: "Dynamic opener for tech conference",
    fullDescription: "Designed and animated the opening sequence for a major tech conference, establishing the visual style for the entire event. The sequence was projected on multiple large screens and helped create a memorable attendee experience.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    mediaType: "video",
    mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tags: ["Event Graphics", "Opening Sequence", "Corporate"],
    tools: ["After Effects", "Illustrator", "Cinema 4D"],
    highlights: [
      "Custom typography animation",
      "3D element integration",
      "Sound design synchronization"
    ],
    link: "#",
    comingSoon: false
  },
  {
    id: 6,
    title: "Explainer Animation Series",
    category: "Motion Graphics",
    shortDescription: "Educational explainer videos for finance app",
    fullDescription: "Created a series of 5 explainer animations for a financial technology app, breaking down complex financial concepts into engaging, easy-to-understand 60-second videos with custom illustrations and character animations.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    mediaType: "video",
    mediaUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tags: ["Explainer", "Educational", "Character Animation"],
    tools: ["After Effects", "Illustrator", "Audition"],
    highlights: [
      "Character rigging",
      "Concept visualization",
      "Educational storytelling"
    ],
    link: "#",
    comingSoon: false
  },
  
  // Product Visualization
  {
    id: 7,
    title: "E-commerce Product Gallery",
    category: "Product Visualization",
    shortDescription: "3D product visualization for online store",
    fullDescription: "Developed a complete 3D product visualization system for an e-commerce platform, creating consistent, high-quality product renders across a diverse catalog of over 200 items, increasing conversion rate by 15%.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    mediaType: "3d-model",
    mediaUrl: "https://sketchfab.com/models/36cabdc6f8a84b2c9135215c92def130/embed",
    tags: ["E-commerce", "Product Photography", "Catalog Development"],
    tools: ["Blender", "Photoshop", "Lightroom"],
    highlights: [
      "Consistent lighting system",
      "Automated rendering pipeline",
      "360-degree product views"
    ],
    link: "https://sketchfab.com/3d-models/free-low-poly-shoe-36cabdc6f8a84b2c9135215c92def130",
    comingSoon: false
  },
  {
    id: 8,
    title: "Packaging Design Visualization",
    category: "Product Visualization",
    shortDescription: "Consumer product packaging concept renders",
    fullDescription: "Created photorealistic visualizations for new packaging concepts across a consumer product line, allowing the marketing team to test customer reactions before committing to production costs.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    mediaType: "3d-model",
    mediaUrl: "https://sketchfab.com/models/5c675d0681714f14bfa7bb3c70282112/embed",
    tags: ["Packaging", "Product Design", "Concept Visualization"],
    tools: ["Blender", "Substance Painter", "Photoshop"],
    highlights: [
      "Material accuracy simulation",
      "Multiple design variations",
      "Retail environment integration"
    ],
    link: "https://sketchfab.com/3d-models/low-poly-shampoo-and-conditioner-bottle-5c675d0681714f14bfa7bb3c70282112",
    comingSoon: false
  },
  
  // 3D Modeling
  {
    id: 9,
    title: "Character Modeling Collection",
    category: "3D Modeling",
    shortDescription: "Stylized game character models",
    fullDescription: "Designed and modeled a collection of 5 stylized characters for an indie game developer, including low-poly game-ready assets, high-resolution versions for marketing materials, and complete rigging for animation.",
    imageUrl: "https://images.unsplash.com/photo-1599824701954-6087a93a9bc1",
    mediaType: "3d-model",
    mediaUrl: "https://sketchfab.com/models/276016ab29d94cc8bbdae1c3fe9c6b01/embed",
    tags: ["Character Design", "Game Assets", "Low-Poly"],
    tools: ["Blender", "ZBrush", "Substance Painter"],
    highlights: [
      "Efficient topology",
      "Game-optimized meshes",
      "Character design language"
    ],
    link: "https://sketchfab.com/3d-models/polygon-knight-character-276016ab29d94cc8bbdae1c3fe9c6b01",
    comingSoon: false
  },
  {
    id: 10,
    title: "Industrial Product Modeling",
    category: "3D Modeling",
    shortDescription: "Precision industrial equipment modeling",
    fullDescription: "Created highly detailed 3D models of industrial machinery components for a manufacturing client, used for technical documentation, assembly instructions, and marketing materials. Models included complex mechanical systems with animated components.",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    mediaType: "3d-model",
    mediaUrl: "https://sketchfab.com/models/02334c45b86e403c8ac59fd1a7a96cbf/embed",
    tags: ["Industrial", "Technical Modeling", "Engineering"],
    tools: ["Blender", "AutoCAD", "KeyShot"],
    highlights: [
      "Technical accuracy",
      "Mechanical animation",
      "Cross-section visualization"
    ],
    link: "https://sketchfab.com/3d-models/low-poly-car-02334c45b86e403c8ac59fd1a7a96cbf",
    comingSoon: false
  }
];

export default portfolioData;
