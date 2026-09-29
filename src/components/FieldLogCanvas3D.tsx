"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Model } from "@/components/Model";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  onCatch?: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL Field Log initialization note:", error.message);
    if (this.props.onCatch) {
      this.props.onCatch();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function FieldLogCanvas3D() {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(() => checkWebGLSupport());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!webGLSupported) {
    return null;
  }

  const stageOffsetX = isMobile ? 0 : 0.25;

  return (
    <div className="relative w-full h-full pointer-events-auto select-none">
      <WebGLErrorBoundary
        fallback={<div className="w-full h-full bg-transparent pointer-events-none" />}
        onCatch={() => setWebGLSupported(false)}
      >
        <Canvas
          style={{ width: "100%", height: "100%", cursor: "grab" }}
          shadows="percentage"
          gl={{
            powerPreference: "default",
            antialias: true,
            alpha: true,
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[stageOffsetX, 1.25, 4.2]}
            fov={isMobile ? 38 : 32}
            near={0.1}
            far={100}
          />

          {/* Full Interactive 360° OrbitControls */}
          <OrbitControls
            makeDefault
            enableRotate={true}
            enableZoom={true}
            enablePan={true}
            enableDamping={true}
            dampingFactor={0.06}
            minDistance={1.8}
            maxDistance={7.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2 + 0.05}
            target={[stageOffsetX, 0.95, 0]}
          />

          {/* Studio Lighting tuned for Dark Obsidian Void */}
          <ambientLight intensity={1.4} />

          {/* Main Key Light: Crisp daylight sculpting Face, Sunglasses, & Yellow Jacket */}
          <directionalLight
            position={[3, 8, 5]}
            intensity={3.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Left Warm Contrast Rim Light */}
          <directionalLight
            position={[-3.8, 4.2, -3.2]}
            intensity={1.5}
            color="#FFF0E6"
          />

          {/* Right Subtle Warm Fill */}
          <directionalLight
            position={[3.6, 3.2, -3.0]}
            intensity={1.0}
            color="#FFE8DC"
          />

          {/* Floor Ground Bounce */}
          <directionalLight
            position={[0, -1.8, 1.0]}
            intensity={0.3}
            color="#222222"
          />

          <Suspense fallback={null}>
            <group position={[stageOffsetX, 0, 0]}>
              {/* Ground Contact Shadow */}
              <ContactShadows
                position={[0, 0.002, 0]}
                color="#000000"
                opacity={0.85}
                scale={4.0}
                blur={1.6}
                far={1.8}
              />

              {/* Walking 3D Character */}
              <Model scale={1.55} position={[0, 0.0015, 0]} />
            </group>
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>

      {/* Subtle Interactive Instruction Pill */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 md:right-14 z-20 pointer-events-none flex items-center gap-2">
        <span
          aria-hidden="true"
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-chalk/40 select-none bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10"
        >
          [ 360° ORBIT · DRAG TO ROTATE · SCROLL TO ZOOM ]
        </span>
      </div>
    </div>
  );
}
