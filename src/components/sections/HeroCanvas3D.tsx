"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Model } from "@/components/Model";


export interface HeroCanvas3DProps {
  onReady?: () => void;
  activeStep?: number;
  timelineIndex?: number;
  timelineContinuousProgressRef?: React.MutableRefObject<number>;
  scrollProgressRef?: React.RefObject<number>;
}

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
    console.warn("WebGL initialization note:", error.message);
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

function SceneWarmupNotifier({ onLoaded }: { onLoaded?: () => void }) {
  useEffect(() => {
    // Fires ONLY after Suspense resolves model loading and 2 render frames have painted
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (onLoaded) onLoaded();
      });
    });
    return () => cancelAnimationFrame(frameId);
  }, [onLoaded]);
  return null;
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

function StaticHeroCameraRig() {
  const currentCamPos = useRef(new THREE.Vector3(0, 1.20, 5.0));
  const currentCamLookAt = useRef(new THREE.Vector3(0, 0.96, 0.05));
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const cam = state.camera;
    const factor = Math.min(1, delta * 3.2);

    // On mobile (< 768px), shift camera so character sits slightly to the left
    const isMobile = state.size.width < 768;
    const offsetX = isMobile ? 0.35 : 0;
    const offsetY = isMobile ? 0.06 : 0;

    const parallaxX = state.pointer.x * 0.16;
    const parallaxY = state.pointer.y * 0.08;

    targetPos.current.set(parallaxX + offsetX, 1.20 + parallaxY + offsetY, 5.0);
    targetLookAt.current.set(
      (parallaxX + offsetX) * 0.25 + offsetX * 0.75,
      0.96 + parallaxY * 0.25 + offsetY,
      0.05
    );

    currentCamPos.current.lerp(targetPos.current, factor);
    currentCamLookAt.current.lerp(targetLookAt.current, factor);

    cam.position.copy(currentCamPos.current);
    cam.lookAt(currentCamLookAt.current);

    if (cam instanceof THREE.PerspectiveCamera) {
      cam.fov = isMobile ? 35 : 32;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/**
 * Pauses Three.js rendering when the dot raster wave covers the 3D scene.
 * Toggles frameloop between 'always' and 'never' at runtime — model keeps
 * walking normally while visible, zero WebGL cost while occluded.
 */
function RenderController({ scrollProgressRef }: { scrollProgressRef?: React.RefObject<number> }) {
  const set = useThree((s) => s.set);
  const invalidate = useThree((s) => s.invalidate);
  const paused = useRef(false);

  useEffect(() => {
    let rafId: number;
    const PAUSE_THRESHOLD = 0.12;

    const loop = () => {
      const p = scrollProgressRef?.current ?? 0;
      if (p >= PAUSE_THRESHOLD && !paused.current) {
        paused.current = true;
        set({ frameloop: 'never' });
      } else if (p < PAUSE_THRESHOLD && paused.current) {
        paused.current = false;
        set({ frameloop: 'always' });
        invalidate();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      if (paused.current) {
        set({ frameloop: 'always' });
      }
    };
  }, [set, invalidate, scrollProgressRef]);

  return null;
}

export default function HeroCanvas3D({
  onReady,
  scrollProgressRef,
}: HeroCanvas3DProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(() => checkWebGLSupport());
  const [isLoaded, setIsLoaded] = useState<boolean>(() => !checkWebGLSupport());

  useEffect(() => {
    if (!webGLSupported && onReady) {
      onReady();
    }
  }, [webGLSupported, onReady]);

  const handleModelRendered = () => {
    setIsLoaded(true);
    if (onReady) onReady();
  };

  const handleWebGLFailure = () => {
    setWebGLSupported(false);
    setIsLoaded(true);
    if (onReady) onReady();
  };

  if (!webGLSupported) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[#000000]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: isLoaded ? 1 : 0 }}
    >
      {/* Backdrop: Pure Pitch Black Canvas matching Field Log */}
      <div className="absolute inset-0 w-full h-full min-w-[100vw] min-h-[100dvh] pointer-events-none overflow-hidden select-none bg-[#000000]" />

      <WebGLErrorBoundary
        fallback={
          <div className="fixed inset-0 z-0 pointer-events-none bg-[#000000]" />
        }
        onCatch={handleWebGLFailure}
      >
        <Canvas
          style={{ pointerEvents: "auto" }}
          shadows="percentage"
          gl={{
            powerPreference: "default",
            antialias: true,
            alpha: true,
            failIfMajorPerformanceCaveat: false,
          }}
        >
        <RenderController scrollProgressRef={scrollProgressRef} />
        <fog attach="fog" args={["#000000", 8, 28]} />

        <PerspectiveCamera
          makeDefault
          position={[0, 1.20, 5.0]}
          fov={32}
          near={0.1}
          far={1000}
        />

        {/* Permanent Stable Hero Camera with Subtle Pointer Parallax */}
        <StaticHeroCameraRig />

        {/* Studio Lighting tuned for Black Void Backdrop */}
        <ambientLight intensity={1.35} />

        {/* Main Key Light: Crisp daylight sculpting Face, Sunglasses, & Yellow Jacket */}
        <directionalLight
          position={[3, 8, 5]}
          intensity={3.0}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Left Warm Contrast Rim Light (Subtle rim separation against black backdrop) */}
        <directionalLight
          position={[-3.8, 4.2, -3.2]}
          intensity={1.4}
          color="#FFF0E6"
        />

        {/* Right Subtle Warm Fill */}
        <directionalLight
          position={[3.6, 3.2, -3.0]}
          intensity={1.0}
          color="#FFE8DC"
        />

        {/* Floor Ground Bounce (Soft neutral bounce fill beneath shoes & trousers) */}
        <directionalLight
          position={[0, -1.8, 1.0]}
          intensity={0.3}
          color="#222222"
        />

        <Suspense fallback={null}>
          <SceneWarmupNotifier onLoaded={handleModelRendered} />
          <group position={[0, 0, 0]}>
            {/* Ground Contact Shadow (Soft, natural grounding beneath walking character) */}
            <ContactShadows
              position={[0, 0.002, 0.05]}
              color="#000000"
              opacity={0.80}
              scale={4.0}
              blur={1.6}
              far={1.8}
            />

            {/* Scaled Walking Character (Centered, Grounded, Brought Forward & Dominant) */}
            <Model scale={1.62} position={[0, 0.0015, 0.05]} />
          </group>
        </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
