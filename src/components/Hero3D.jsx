import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import FrostyChatbot from "./FrostyChatbot";

const RobotModel = lazy(() => import("./RobotModel"));

// Q&A data for rotating display - Storytelling format
const qaData = [
  {
    question: "Where is Frostrek located?",
    answer: "Based in Gurgaon, India - where innovation meets opportunity!",
    icon: "📍",
    iconBg: "from-blue-500/20 to-cyan-500/20"
  },
  {
    question: "What services does Frostrek deal in?",
    answer: "AI systems, agentic workflows, and scalable software powered by AI training expertise.",
    icon: "⚡",
    iconBg: "from-purple-500/20 to-pink-500/20"
  },
  {
    question: "Who is the founder of Frostrek?",
    answer: "Founded by Akash Mittal - revolutionizing businesses through AI innovation.",
    icon: "👨‍💼",
    iconBg: "from-orange-500/20 to-yellow-500/20"
  },
  {
    question: "How can I contact Frostrek?",
    answer: "Email: info@Frostrek.com | Call: +91 6399999955",
    icon: "📞",
    iconBg: "from-green-500/20 to-emerald-500/20"
  }
];

export default function Hero3D() {
  const [showBubble, setShowBubble] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // Q&A rotation effect - changes every 10 seconds
  useEffect(() => {
    if (!showBubble) return;
    
    const rotationInterval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentQAIndex((prevIndex) => (prevIndex + 1) % qaData.length);
        setIsTransitioning(false);
      }, 500); // Half second for fade out, then content changes, then fade in
    }, 10000); // 10 seconds
    
    return () => clearInterval(rotationInterval);
  }, [showBubble]);

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

  const currentQA = qaData[currentQAIndex];

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
          top-[-50%]
          md:top-[5%]
          right-[3%]
          md:right-[-5%]
          z-20
          max-w-[260px]
          md:max-w-[290px]
          cursor-pointer
          rounded-xl
          bg-[#06060C]/90
          backdrop-blur-xl
          border border-cyan-400/30
          px-3 py-2.5     
          text-sm 
          text-slate-200
          shadow-[0_12px_32px_rgba(0,255,255,0.18)]
          hover:border-cyan-400/50
          hover:shadow-[0_12px_40px_rgba(0,255,255,0.25)]
          transition-all duration-300
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          className="
            absolute
            -bottom-2
            md:-bottom-2
            left-10
            md:left-10      
            h-4 w-4
            rotate-45
            md:rotate-45
            bg-[#06060C]/90
            border-r border-b border-cyan-400/30
          "
        />

        <div className="mb-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
            <span className="text-[9px] tracking-wider uppercase text-cyan-300">
              Frosty • AI Assistant
            </span>
          </div>
        
          <button
            onClick={toggleAudio}
            className="p-0.5 rounded-full hover:bg-cyan-400/20 transition-colors duration-200"
            title={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 5L7 9H3v6h4l4.5 4V5zM15.54 8.46a5.001 5.001 0 010 7.08l-1.41-1.41a3 3 0 000-4.24l1.41-1.43z"/>
                <path d="M18.36 5.64a9 9 0 010 12.72l-1.41-1.41a7 7 0 000-9.9l1.41-1.41z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 5L7 9H3v6h4l4.5 4V5zM16.5 12l3-3v6l-3-3z"/>
              </svg>
            )}
          </button>
        </div>
        
        {/* Animated Q&A Content */}
        <motion.div
          key={currentQAIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -10 : 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          {/* Question Header with Icon */}
          <div className="flex items-center gap-2 pb-2 border-b border-cyan-400/10">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentQA.iconBg} border border-cyan-400/20 flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <span className="text-lg">{currentQA.icon}</span>
            </div>
            <p className="text-cyan-300 font-semibold text-[11px] leading-tight flex-1">
              {currentQA.question}
            </p>
          </div>
          
          {/* Answer - Storytelling Style */}
          <div className="relative">
            <div className="absolute -left-1.5 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-cyan-400/60 to-transparent rounded-full" />
            <p className="pl-2.5 text-slate-100 text-[11px] leading-relaxed">
              {currentQA.answer}
            </p>
          </div>
        </motion.div>        
        
        {/* Progress indicator dots */}
        <div className="mt-2.5 pt-2 border-t border-cyan-400/10 flex items-center justify-center gap-1.5">
          {qaData.map((_, index) => (
            <div key={index} className="relative">
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  index === currentQAIndex 
                    ? 'w-6 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                    : 'w-1 bg-cyan-400/20 hover:bg-cyan-400/40'
                }`}
              />
              {index === currentQAIndex && (
                <span className="absolute inset-0 w-full h-full bg-cyan-400/40 rounded-full animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Click to chat hint */}
        <div className="mt-2 pt-1.5 border-t border-cyan-400/10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 -mx-3 px-3 py-1.5 rounded-b-xl">
          <svg className="w-3 h-3 text-cyan-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
          <span className="text-[10px] text-cyan-400 tracking-wide font-medium">Click to chat with me!</span>
        </div>      </motion.div>
      )}

      <Canvas 
        camera={{ position: [0.5, 1.8, 3], fov: 40 }} 
        dpr={[1, 1.5]}
        style={{ touchAction: 'pan-y', pointerEvents: isMobile ? 'none' : 'auto'}}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <RobotModel isSpeaking={isPlaying} position={isMobile ? [-0.3, -0.8, 0] : [-0.8, 0, 0]} />
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
