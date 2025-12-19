import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Hero3D from "../components/Hero3D";
import { useMemo } from "react";
import { Sparkles, Play, ArrowUpRight } from "lucide-react";
import usePerformanceMode from "../hooks/usePerformanceMode";


const aboutStats = [
  { label: "AI Models", value: "50+" },
  { label: "Clients", value: "200+" },
  { label: "Accuracy", value: "99%" },
];

const HeroAboutPage = () => {
  const performanceMode = usePerformanceMode();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsSmallScreen(mediaQuery.matches);

    handleChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (performanceMode) {
      setMousePosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [performanceMode]);

  const ambientParticles = useMemo(() => {
    const count = performanceMode ? 8 : isSmallScreen ? 12 : 18;

    if (count <= 0) {
      return [];
    }

    return Array.from({ length: count }, (_, index) => ({
      id: `hero-particle-${index}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 2,
      offset: Math.random() * 14,
    }));
  }, [isSmallScreen, performanceMode]);

  const paragraph1 =
  "Frostrek is a forward-thinking AI company dedicated to empowering businesses through advanced automation, data-driven strategies, and intelligent system design.";

const paragraph2 =
  "We bridge innovation with practical impact to help industries thrive in the digital age. With a deep focus on research, machine learning, and scalable solutions, our mission is to redefine how organizations leverage AI to create value, efficiency, and sustainability.";

const words1 = paragraph1.split(" ");
const words2 = paragraph2.split(" ");


  return (
    <div className="w-full overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-[#06060C] pt-20 pb-16 font-raleway"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {ambientParticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            {ambientParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute block h-[2px] w-[2px] rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: ["0%", "-10%", "0%"] }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-24 px-6 md:px-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col justify-center"
          >
            {/* <motion.div
              className="inline-flex items-center gap-3 self-start rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg w-fit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
            </motion.div> */}

            <motion.h1
              className="mt-8 text-5xl font-bold leading-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl xl:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.9,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent font-Raleway">
                Intelligent systems
              </span>{" "}
              built to scale with how your business thinks.
            </motion.h1>

            <motion.p
              className="mt-8 max-w-3xl text-base font-normal leading-relaxed text-slate-300/80 md:text-lg font-quicksand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Frostrek orchestrates data, decisions, and human oversight into a
              single cognitive stack. Deploy bespoke copilots, automation
              agents, and predictive intelligence with enterprise reliability
              and precise guardrails.
            </motion.p>

            <motion.div
              className="mt-44 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="relative flex flex-1 flex-col justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full h-[500px] flex items-center justify-between cursor-grab">
              <Hero3D />
            </div>
          </motion.div>
        </div>

        <div className="absolute right-12 top-24 hidden h-28 w-28 rounded-full border border-cyan-400/40 bg-cyan-400/10 blur-3xl lg:block" />
        <div className="absolute left-10 bottom-10 hidden h-24 w-24 rounded-full border border-indigo-500/40 bg-indigo-400/10 blur-3xl lg:block" />

        <motion.div
          className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#06060C] via-[#06060C]/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section
        id="about"
        className="relative w-full py-12 sm:py-8 md:py-20 lg:py-28 bg-[#06060C] font-sans overflow-hidden"
      >
        {/* Advanced Tech Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Holographic grid base */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scan" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(138,43,226,0.15)_1px,transparent_1px),linear-gradient(-45deg,rgba(138,43,226,0.15)_1px,transparent_1px)] bg-[size:60px_60px] animate-diagonal-grid" />
          </div>

          {/* Neural network connections */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            style={{ filter: "blur(0.5px)" }}
          >
            <defs>
              <linearGradient
                id="line-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="line-gradient-2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Animated connection lines */}
            <line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="80%"
              stroke="url(#line-gradient-1)"
              strokeWidth="1"
              className="animate-pulse-line"
            />
            <line
              x1="80%"
              y1="10%"
              x2="20%"
              y2="90%"
              stroke="url(#line-gradient-2)"
              strokeWidth="1"
              className="animate-pulse-line-delayed"
            />
            <line
              x1="30%"
              y1="0%"
              x2="70%"
              y2="100%"
              stroke="url(#line-gradient-1)"
              strokeWidth="1"
              className="animate-pulse-line-more"
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#line-gradient-2)"
              strokeWidth="1"
              className="animate-pulse-line-slow"
            />
          </svg>

          {/* Circuit board patterns */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(8)].map((_, i) => (
              <div
                key={`circuit-${i}`}
                className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-circuit-flow"
                style={{
                  width: "2px",
                  height: `${20 + Math.random() * 30}%`,
                  left: `${10 + i * 12}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Hexagon tech pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cG9seWdvbiBwb2ludHM9IjUwLDAgOTMuMzAxLDI1IDkzLjMwMSw3NSA1MCwxMDAgNi42OTksNzUgNi42OTksMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] bg-[size:100px_100px] animate-hex-drift" />
          </div>

          {/* Scanning lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line-1" />
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan-line-2" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-scan-line-3" />
          </div>

          {/* Data nodes */}
          <div className="absolute inset-0 opacity-50">
            {[...Array(15)].map((_, i) => (
              <div
                key={`node-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <div className="relative">
                  {/* Outer ring */}
                  <div
                    className="w-8 h-8 rounded-full border border-cyan-400/40 animate-ping-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  {/* Inner dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Digital rain effect */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={`rain-${i}`}
                className="absolute w-[1px] bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent animate-digital-rain"
                style={{
                  left: `${i * 8.33}%`,
                  height: "100px",
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Holographic layers */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-holo-sweep-1" />
            <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-holo-sweep-2" />
            <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-holo-sweep-3" />
            <div className="absolute top-[80%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-holo-sweep-4" />
          </div>

          {/* Energy orbs with trails */}
          <div className="absolute inset-0 opacity-25">
            {[...Array(5)].map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute w-24 h-24 rounded-full animate-orb-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  background: `radial-gradient(circle, ${
                    ["cyan", "purple", "indigo", "teal", "pink"][i]
                  }-400 0%, transparent 70%)`,
                  filter: "blur(20px)",
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${15 + i * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Geometric shapes */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-[10%] left-[15%] w-32 h-32 border border-cyan-400/30 rotate-45 animate-rotate-slow" />
            <div className="absolute bottom-[15%] right-[20%] w-40 h-40 border-2 border-purple-400/30 rounded-full animate-scale-pulse" />
            <div
              className="absolute top-[50%] right-[10%] w-24 h-24 border border-indigo-400/30 animate-rotate-reverse"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </div>

          {/* Particle system */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(30)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full animate-particle-drift"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Laser beams */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-[25%] w-[2px] h-full bg-gradient-to-b from-cyan-400 via-transparent to-cyan-400 animate-laser-pulse" />
            <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-purple-400 via-transparent to-purple-400 animate-laser-pulse-delayed" />
            <div className="absolute top-0 left-[75%] w-[2px] h-full bg-gradient-to-b from-indigo-400 via-transparent to-indigo-400 animate-laser-pulse-more" />
          </div>
        </div>

        <div className="relative mx-auto flex w-full flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-8 md:mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-8 sm:w-10 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span className="text-[#D1D5DB] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                About Us
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 tracking-tight text-[#FFFFFF]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              frostrek
            </motion.h2>

            <p className="text-base sm:text-lg md:text-xl font-normal text-[#D1D5DB] max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering businesses through intelligent AI solutions
              </motion.span>
            </p>
          </motion.div>

          <div className="grid items-center gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2 xl:gap-20">
            {/* Left side - text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            >
              <div ref={textRef} className="space-y-4 sm:space-y-6 max-w-3xl">
                <p className="text-[#D1D5DB] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                  {words1.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: "easeOut",
                      }}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>

                <p className="text-[#9CA3AF] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                  {words2.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: words1.length * 0.03 + index * 0.03,
                        ease: "easeOut",
                      }}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 border-t border-cyan-500/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {aboutStats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                  >
                    <motion.div
                      className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-1 bg-gradient-to-r from-[#00FFFF] to-[#6D28D9] bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[10px] sm:text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <motion.div
                      className="h-[1px] bg-gradient-to-r from-cyan-500 via-purple-600 to-transparent mt-1 sm:mt-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Key features */}
              <motion.div
                className="space-y-3 sm:space-y-4 pt-4 sm:pt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  "Advanced Machine Learning",
                  "Scalable AI Solutions",
                  "Data-Driven Insights",
                ].map((feature, idx) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-xs sm:text-sm font-normal text-[#9CA3AF] group-hover:text-cyan-400 transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side - Simplified 3D visualization using pure CSS */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex h-[300px] sm:h-[380px] md:h-[460px] lg:h-[500px] w-full items-center justify-center order-1 lg:order-2"
            >
              {/* Central AI Core */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                {/* Rotating rings - Pure CSS */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div
                  className="absolute inset-0 animate-spin-reverse"
                  style={{ animationDuration: "20s" }}
                >
                  <div
                    className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                    style={{
                      width: "120%",
                      height: "120%",
                      left: "-10%",
                      top: "-10%",
                    }}
                  />
                </div>
                <div
                  className="absolute inset-0 animate-spin-slow"
                  style={{ animationDuration: "25s" }}
                >
                  <div
                    className="absolute inset-0 rounded-full border-2 border-indigo-500/30"
                    style={{
                      width: "140%",
                      height: "140%",
                      left: "-20%",
                      top: "-20%",
                    }}
                  />
                </div>

                {/* Central core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#06060C] rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30 animate-pulse">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-cyan-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                      AI
                    </div>
                  </div>
                </div>

                {/* Orbiting dots */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = i * 60;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5"
                      style={{
                        animation: `orbit 8s linear infinite`,
                        animationDelay: `${-i * 1.33}s`,
                      }}
                    >
                      <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70 animate-pulse" />
                    </div>
                  );
                })}
              </div>

              <motion.div
                className="hidden sm:block absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-cyan-500/40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              <motion.div
                className="hidden sm:block absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-purple-500/40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Add custom keyframe animations */}
        <style jsx>{`
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(70px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(70px) rotate(-360deg);
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spin-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes grid-scan {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(40px);
            }
          }

          @keyframes diagonal-grid {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }

          @keyframes pulse-line {
            0%,
            100% {
              opacity: 0.3;
              stroke-dashoffset: 1000;
            }
            50% {
              opacity: 0.8;
              stroke-dashoffset: 0;
            }
          }

          @keyframes pulse-line-delayed {
            0%,
            100% {
              opacity: 0.2;
              stroke-dashoffset: 1000;
            }
            50% {
              opacity: 0.9;
              stroke-dashoffset: 0;
            }
          }

          @keyframes pulse-line-more {
            0%,
            100% {
              opacity: 0.25;
              stroke-dashoffset: 1000;
            }
            50% {
              opacity: 0.7;
              stroke-dashoffset: 0;
            }
          }

          @keyframes pulse-line-slow {
            0%,
            100% {
              opacity: 0.2;
              stroke-dashoffset: 1000;
            }
            50% {
              opacity: 0.6;
              stroke-dashoffset: 0;
            }
          }

          @keyframes circuit-flow {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(200%);
              opacity: 0;
            }
          }

          @keyframes hex-drift {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            100% {
              transform: translate(50px, 50px) rotate(360deg);
            }
          }

          @keyframes scan-line-1 {
            0% {
              top: -2px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes scan-line-2 {
            0% {
              top: -2px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes scan-line-3 {
            0% {
              top: -1px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          @keyframes digital-rain {
            0% {
              transform: translateY(-100px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(calc(100vh + 100px));
              opacity: 0;
            }
          }

          @keyframes holo-sweep-1 {
            0%,
            100% {
              transform: translateY(-20px);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes holo-sweep-2 {
            0%,
            100% {
              transform: translateY(-20px);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes holo-sweep-3 {
            0%,
            100% {
              transform: translateY(-20px);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes holo-sweep-4 {
            0%,
            100% {
              transform: translateY(-20px);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes orb-float {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(20px, -30px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 30px) scale(0.9);
            }
          }

          @keyframes rotate-slow {
            from {
              transform: rotate(45deg);
            }
            to {
              transform: rotate(405deg);
            }
          }

          @keyframes rotate-reverse {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }

          @keyframes scale-pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.6;
            }
          }

          @keyframes particle-drift {
            0%,
            100% {
              transform: translate(0, 0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50px + 100px * var(--random-x, 0.5)),
                calc(-50px + 100px * var(--random-y, 0.5))
              );
              opacity: 0;
            }
          }

          @keyframes laser-pulse {
            0%,
            100% {
              opacity: 0.2;
              transform: scaleY(0.8);
            }
            50% {
              opacity: 0.8;
              transform: scaleY(1.2);
            }
          }

          @keyframes laser-pulse-delayed {
            0%,
            100% {
              opacity: 0.15;
              transform: scaleY(0.7);
            }
            50% {
              opacity: 0.9;
              transform: scaleY(1.3);
            }
          }

          @keyframes laser-pulse-more {
            0%,
            100% {
              opacity: 0.25;
              transform: scaleY(0.9);
            }
            50% {
              opacity: 0.7;
              transform: scaleY(1.1);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }

          .animate-spin-reverse {
            animation: spin-reverse 15s linear infinite;
          }

          .animate-grid-scan {
            animation: grid-scan 20s linear infinite;
          }

          .animate-diagonal-grid {
            animation: diagonal-grid 30s linear infinite;
          }

          .animate-pulse-line {
            animation: pulse-line 4s ease-in-out infinite;
            stroke-dasharray: 1000;
          }

          .animate-pulse-line-delayed {
            animation: pulse-line-delayed 5s ease-in-out infinite 1s;
            stroke-dasharray: 1000;
          }

          .animate-pulse-line-more {
            animation: pulse-line-more 4.5s ease-in-out infinite 2s;
            stroke-dasharray: 1000;
          }

          .animate-pulse-line-slow {
            animation: pulse-line-slow 6s ease-in-out infinite 0.5s;
            stroke-dasharray: 1000;
          }

          .animate-circuit-flow {
            animation: circuit-flow 4s ease-in-out infinite;
          }

          .animate-hex-drift {
            animation: hex-drift 40s linear infinite;
          }

          .animate-scan-line-1 {
            animation: scan-line-1 6s ease-in-out infinite;
          }

          .animate-scan-line-2 {
            animation: scan-line-2 7s ease-in-out infinite 1.5s;
          }

          .animate-scan-line-3 {
            animation: scan-line-3 8s ease-in-out infinite 3s;
          }

          .animate-ping-slow {
            animation: ping-slow 3s ease-out infinite;
          }

          .animate-digital-rain {
            animation: digital-rain 4s linear infinite;
          }

          .animate-holo-sweep-1 {
            animation: holo-sweep-1 8s ease-in-out infinite;
          }

          .animate-holo-sweep-2 {
            animation: holo-sweep-2 9s ease-in-out infinite 2s;
          }

          .animate-holo-sweep-3 {
            animation: holo-sweep-3 10s ease-in-out infinite 4s;
          }

          .animate-holo-sweep-4 {
            animation: holo-sweep-4 11s ease-in-out infinite 6s;
          }

          .animate-orb-float {
            animation: orb-float 20s ease-in-out infinite;
          }

          .animate-rotate-slow {
            animation: rotate-slow 30s linear infinite;
          }

          .animate-rotate-reverse {
            animation: rotate-reverse 25s linear infinite;
          }

          .animate-scale-pulse {
            animation: scale-pulse 4s ease-in-out infinite;
          }

          .animate-particle-drift {
            animation: particle-drift 8s ease-in-out infinite;
          }

          .animate-laser-pulse {
            animation: laser-pulse 3s ease-in-out infinite;
          }

          .animate-laser-pulse-delayed {
            animation: laser-pulse-delayed 3.5s ease-in-out infinite 0.5s;
          }

          .animate-laser-pulse-more {
            animation: laser-pulse-more 4s ease-in-out infinite 1s;
          }

          @media (max-width: 640px) {
            @keyframes orbit {
              from {
                transform: rotate(0deg) translateX(50px) rotate(0deg);
              }
              to {
                transform: rotate(360deg) translateX(50px) rotate(-360deg);
              }
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default HeroAboutPage;
