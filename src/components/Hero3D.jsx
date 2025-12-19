import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useEffect, useState } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";

const RobotModel = lazy(() => import("./RobotModel"));

export default function Hero3D() {
  const [showBubble, setShowBubble] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 2000)
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {showBubble && (
      <motion.div
        drag
        dragMomentum={false}
        className="
          absolute
          top-[-3%]
          md:top-[-3%]
          right-[5%]
          md:right-[-10%]
          z-20
          max-w-[220px]
          md:max-w-[270px]
          cursor-grab
          rounded-xl
          bg-[#06060C]/80
          backdrop-blur-xl
          border border-cyan-400/30
          px-4 py-3     
          text-sm 
          text-slate-200
          shadow-[0_12px_32px_rgba(0,255,255,0.18)]
        "
        style={{ top: isMobile ? '-15%' : '-3%' }}
      >
        <span
          className="
            absolute
            -bottom-2
            right-10      
            h-4 w-4
            rotate-45
            bg-[#06060C]/80
            border-r border-b border-cyan-400/30
          "
        />

        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-[10px] tracking-widest uppercase text-cyan-300">
            Frosty • AI Assistant
          </span>
        </div>
        
        <p className="leading-relaxed">
          <span className="text-cyan-300 font-medium">
            Welcome to the world of Frostrek.
          </span>
          <br />
          I’m <span className="text-white font-semibold">Frosty </span>.
          How may I help you today?
        </p>
      </motion.div>
      )}

      <Canvas 
        camera={{ position: [2, 1.8, 3], fov: 40 }} 
        dpr={[1, 1.5]}
        style={{ touchAction: 'pan-y' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <RobotModel />
          <Environment preset="city" />
          <EffectComposer>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.45}
              luminanceSmoothing={0.2}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={!isMobile}
        />
      </Canvas>
    </div>
  );
}
