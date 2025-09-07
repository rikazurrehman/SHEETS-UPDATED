import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, Volume2, VolumeX, Settings, Info, HelpCircle } from 'lucide-react';

interface ThreeJSViewerProps {
  modelUrl: string;
  title: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const ThreeJSViewer = ({ modelUrl, title, onLoad, onError, className = '' }: ThreeJSViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightingIntensity, setLightingIntensity] = useState(1.0);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Enhanced Renderer setup for better visibility
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8; // Increased exposure for brighter models
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.physicallyCorrectLights = true; // Enable physically correct lighting
    rendererRef.current = renderer;

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // Enhanced Lighting setup for better visibility
    // Main ambient light - increased intensity for better base lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    ambientLight.userData.originalIntensity = 0.8;
    scene.add(ambientLight);

    // Primary directional light - main light source
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(15, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.userData.originalIntensity = 2.5;
    scene.add(directionalLight);

    // Secondary directional light - fill light from opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight2.position.set(-10, 5, -5);
    directionalLight2.userData.originalIntensity = 1.2;
    scene.add(directionalLight2);

    // Key light - strong focused light
    const keyLight = new THREE.SpotLight(0xffffff, 2.0, 50, Math.PI / 6, 0.3);
    keyLight.position.set(10, 20, 10);
    keyLight.target.position.set(0, 0, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.userData.originalIntensity = 2.0;
    scene.add(keyLight);
    scene.add(keyLight.target);

    // Rim light - creates edge lighting
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.0);
    rimLight.position.set(-15, 10, -15);
    rimLight.userData.originalIntensity = 1.0;
    scene.add(rimLight);

    // Accent lights for depth and interest
    const accentLight1 = new THREE.PointLight(0x06b6d4, 1.5, 50);
    accentLight1.position.set(15, 10, -10);
    accentLight1.userData.originalIntensity = 1.5;
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xff6b6b, 1.0, 40);
    accentLight2.position.set(-15, 5, 15);
    accentLight2.userData.originalIntensity = 1.0;
    scene.add(accentLight2);

    // Hemisphere light for natural sky/ground lighting
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.6);
    hemisphereLight.userData.originalIntensity = 0.6;
    scene.add(hemisphereLight);

    // Add subtle fog for depth
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

  }, []);

  // Load 3D model
  const loadModel = useCallback(() => {
    if (!sceneRef.current || !modelUrl) return;

    setIsLoading(true);
    setError(null);
    setLoadingProgress(0);

    const loader = new GLTFLoader();
    
    loader.load(
      modelUrl,
      (gltf) => {
        // Remove existing model
        if (modelRef.current) {
          sceneRef.current?.remove(modelRef.current);
        }

        const model = gltf.scene;
        modelRef.current = model;

        // Enable shadows and ensure proper material handling
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Ensure materials are properly configured for lighting
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                  if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
                    material.needsUpdate = true;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial || child.material instanceof THREE.MeshPhysicalMaterial) {
                child.material.needsUpdate = true;
              }
            }
          }
        });

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        sceneRef.current?.add(model);
        
        // Adjust camera to fit model
        if (cameraRef.current && controlsRef.current) {
          const distance = maxDim * 2;
          cameraRef.current.position.set(distance, distance, distance);
          controlsRef.current.target.copy(center);
          controlsRef.current.update();
        }

        setIsLoading(false);
        onLoad?.();
      },
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
        setLoadingProgress(percentComplete);
      },
      (error) => {
        console.error('Error loading 3D model:', error);
        setError('Failed to load 3D model');
        setIsLoading(false);
        onError?.(error.message);
      }
    );
  }, [modelUrl, onLoad, onError]);

  // Animation loop
  const animate = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  // Control functions
  const resetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  const toggleAutoRotate = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!mountRef.current) return;

    if (!document.fullscreenElement) {
      mountRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const adjustLightingIntensity = useCallback((intensity: number) => {
    setLightingIntensity(intensity);
    if (sceneRef.current) {
      sceneRef.current.traverse((child) => {
        if (child instanceof THREE.Light) {
          child.intensity = child.userData.originalIntensity * intensity;
        }
      });
    }
  }, []);

  const setBrightLighting = useCallback(() => {
    adjustLightingIntensity(2.0);
  }, [adjustLightingIntensity]);

  // Initialize on mount
  useEffect(() => {
    initScene();
    loadModel();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initScene, loadModel, handleResize]);

  // Start animation loop
  useEffect(() => {
    animate();
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [animate]);

  return (
    <div className={`relative w-full h-full bg-black/90 ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gaming-purple/30 border-t-gaming-purple rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80 text-lg mb-2">Loading 3D Model...</p>
            <div className="w-64 bg-black/30 rounded-full h-2 mx-auto">
              <div 
                className="bg-gradient-to-r from-gaming-purple to-gaming-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-white/60 text-sm mt-2">{Math.round(loadingProgress)}% loaded</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Model Loading Error</h3>
            <p className="text-white/70 mb-4">{error}</p>
            <button
              onClick={loadModel}
              className="px-4 py-2 bg-gaming-purple/20 hover:bg-gaming-purple/30 text-white rounded-lg transition-colors border border-gaming-purple/30"
            >
              Retry Loading
            </button>
          </div>
        </div>
      )}

      {/* 3D Viewer Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
        {/* Reset Camera */}
        <button
          onClick={resetCamera}
          className="bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
          title="Reset Camera"
        >
          <RotateCcw size={18} />
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className="bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
          title="Toggle Auto Rotate"
        >
          <RotateCw size={18} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        {/* Controls Toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
          title="Show Controls"
        >
          <Settings size={18} />
        </button>

        {/* Info Toggle */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer text-white shadow-glow"
          title="Show Info"
        >
          <Info size={18} />
        </button>

        {/* Lighting Intensity Control */}
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-2">
          <div className="text-xs text-white/70 mb-1">Lighting</div>
          <input
            type="range"
            min="0.1"
            max="3.0"
            step="0.1"
            value={lightingIntensity}
            onChange={(e) => adjustLightingIntensity(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(lightingIntensity / 3.0) * 100}%, #333 ${(lightingIntensity / 3.0) * 100}%, #333 100%)`
            }}
          />
          <div className="text-xs text-white/50 text-center mt-1">{lightingIntensity.toFixed(1)}x</div>
          <button
            onClick={setBrightLighting}
            className="w-full mt-1 px-2 py-1 bg-gaming-purple/20 hover:bg-gaming-purple/30 text-white text-xs rounded transition-colors"
            title="Set Bright Lighting"
          >
            Bright
          </button>
        </div>
      </div>

      {/* Controls Panel */}
      {showControls && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white text-sm z-20 max-w-xs">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Settings size={16} />
            Controls
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
              <span>Left Click + Drag: Rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gaming-blue rounded-full"></div>
              <span>Right Click + Drag: Pan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
              <span>Scroll: Zoom In/Out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gaming-blue rounded-full"></div>
              <span>Double Click: Focus</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
              <span>Lighting: {lightingIntensity.toFixed(1)}x</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white text-sm z-20 max-w-xs">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Info size={16} />
            Model Info
          </h4>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-white/60">Title:</span>
              <span className="ml-2">{title}</span>
            </div>
            <div>
              <span className="text-white/60">Format:</span>
              <span className="ml-2">GLB</span>
            </div>
            <div>
              <span className="text-white/60">Renderer:</span>
              <span className="ml-2">Three.js</span>
            </div>
            <div>
              <span className="text-white/60">Shadows:</span>
              <span className="ml-2 text-green-400">Enabled</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Hints */}
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 text-white/80 text-sm z-20">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-4 h-4 text-gaming-purple" />
          <span className="font-medium">Interactive 3D Model</span>
        </div>
        <p className="text-xs text-white/60">Click & drag to rotate • Scroll to zoom • Right-click to pan</p>
      </div>
    </div>
  );
};

export default ThreeJSViewer;
