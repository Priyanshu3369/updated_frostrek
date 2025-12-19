import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import FrostyChatbot from "./FrostyChatbot";

const RobotModel = lazy(() => import("./RobotModel"));

export default function Hero3D() {
  const [showBubble, setShowBubble] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (showBubble && !hasPlayed && audioRef.current) {
      const playAudio = () => {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasPlayed(true);
          })
          .catch((error) => {
            console.log("Audio autoplay prevented:", error);
          });
      };
      playAudio();
    }
  }, [showBubble, hasPlayed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation(); 
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Audio play failed:", error));
      }
    }
  };

  const openChatbot = () => {
    setIsChatOpen(true);
  };
  return (
    <div className="relative w-full h-[350px] md:h-[500px]">
      <audio ref={audioRef} src="/Frosty3.mp3" preload="auto" />
      
      {/* Frosty Chatbot */}
      <FrostyChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {showBubble && (
      <motion.div
        drag
        dragMomentum={false}
        onClick={openChatbot}
        className="
          absolute
          top-[-3%]
          md:top-[-3%]
          right-[5%]
          md:right-[-10%]
          z-20
          max-w-[240px]
          md:max-w-[270px]
          cursor-pointer
          rounded-xl
          bg-[#06060C]/80
          backdrop-blur-xl
          border border-cyan-400/30
          px-4 py-3     
          text-sm 
          text-slate-200
          shadow-[0_12px_32px_rgba(0,255,255,0.18)]
          hover:border-cyan-400/50
          hover:shadow-[0_12px_40px_rgba(0,255,255,0.25)]
          transition-all duration-300
        "
        style={{ top: isMobile ? '-35%' : '-3%' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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

        <div className="mb-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-[10px] tracking-widest uppercase text-cyan-300">
              Frosty • AI Assistant
            </span>
          </div>
        
          <button
            onClick={toggleAudio}
            className="p-1 rounded-full hover:bg-cyan-400/20 transition-colors duration-200"
            title={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 5L7 9H3v6h4l4.5 4V5zM15.54 8.46a5.001 5.001 0 010 7.08l-1.41-1.41a3 3 0 000-4.24l1.41-1.43z"/>
                <path d="M18.36 5.64a9 9 0 010 12.72l-1.41-1.41a7 7 0 000-9.9l1.41-1.41z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 5L7 9H3v6h4l4.5 4V5zM16.5 12l3-3v6l-3-3z"/>
              </svg>
            )}
          </button>
        </div>
        
        <p className="leading-relaxed">
          <span className="text-cyan-300 font-medium">
            Welcome to the world of Frostrek.
          </span>
          <br />
          I’m <span className="text-white font-semibold">Frosty </span>.
          How may I help you today?
        </p>        
        {/* Click to chat hint */}
        <div className="mt-2 pt-2 border-t border-cyan-400/20 flex items-center justify-center gap-1.5">
          <svg className="w-3 h-3 text-cyan-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
          <span className="text-[10px] text-cyan-400/80 tracking-wide">Click to chat with me!</span>
        </div>      </motion.div>
      )}

      <Canvas 
        camera={{ position: [2, 1.8, 3], fov: 40 }} 
        dpr={[1, 1.5]}
        style={{ touchAction: 'pan-y', pointerEvents: isMobile ? 'none' : 'auto'}}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <RobotModel isSpeaking={isPlaying} />
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

        {!isMobile && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
          />
        )}
      </Canvas>
    </div>
  );
}
