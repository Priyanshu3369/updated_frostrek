import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMemo } from "react";
import {
  Sparkles,
  Play,
  ArrowUpRight,
  Shield,
  Cpu,
  LineChart,
} from "lucide-react";
import TechGlobe from "../components/TechGlobe/TechGlobe";
import usePerformanceMode from "../hooks/usePerformanceMode";

const stats = [
  { label: "Enterprise Deployments", value: "120+", trend: "+32%" },
  { label: "Model Accuracy", value: "99.2%", trend: "+4.5%" },
  { label: "Automation Savings", value: "3.4M hrs", trend: "+56%" },
];

const highlights = [
  {
    icon: Shield,
    title: "Trusted AI Governance",
    description:
      "Enterprise-grade controls embedded at every layer to keep your models human-aligned and production ready.",
  },
  {
    icon: Cpu,
    title: "Adaptive Intelligence Core",
    description:
      "Modular inference pipelines that learn continuously from real-time signals without sacrificing reliability.",
  },
  {
    icon: LineChart,
    title: "Observable Performance",
    description:
      "Unified telemetry with drift detection, guided remediation, and precision reporting for stakeholders.",
  },
];

const floatingBeacons = [
  {
    title: "Neural Mesh",
    subtitle: "Self-healing data fabric",
    position: "top-[10%] left-[8%]",
    delay: 0.2,
  },
  {
    title: "Latency < 32ms",
    subtitle: "Realtime decisions",
    position: "bottom-[16%] left-[18%]",
    delay: 0.5,
  },
  {
    title: "Autonomous Ops",
    subtitle: "Smart escalation layer",
    position: "top-[14%] right-[15%]",
    delay: 0.8,
  },
];

const aboutStats = [
  { label: "AI Models", value: "50+" },
  { label: "Clients", value: "200+" },
  { label: "Accuracy", value: "99%" },
];

const HeroAboutPage = () => {
  const performanceMode = usePerformanceMode();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
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
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
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

  // Canvas animation for About section
  useEffect(() => {
    if (performanceMode) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const particles = [];
    const particleCount = 120;
    const waves = [];
    const waveCount = 3;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: (canvas.height / waveCount) * i + Math.random() * 100,
        amplitude: 40 + Math.random() * 30,
        frequency: 0.003 + Math.random() * 0.002,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.02,
      });
    }

    let time = 0;
    let animationId;

    const drawWave = (wave, time) => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          wave.y +
          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) *
          wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(0, 255, 255, ${wave.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(11, 11, 14, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      waves.forEach((wave) => {
        drawWave(wave, time);
      });

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.pulsePhase += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;

        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * pulseScale * 3
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(109, 40, 217, ${particle.opacity * 0.3})`
        );
        gradient.addColorStop(1, "rgba(20, 184, 166, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulseScale * 3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulseScale,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [performanceMode]);

  const paragraph1 =
    "Frostrek LLP is a forward-thinking AI company dedicated to empowering businesses through advanced automation, data-driven strategies, and intelligent system design.";
  const paragraph2 =
    "We bridge innovation with practical impact to help industries thrive in the digital age. With a deep focus on research, machine learning, and scalable solutions, our mission is to redefine how organizations leverage AI to create value, efficiency, and sustainability.";

  const words1 = paragraph1.split(" ");
  const words2 = paragraph2.split(" ");

  return (
    <div className="w-full overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-[#0B0B0E] pt-24 pb-16 font-sans"
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

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col justify-center"
          >
            <motion.div
              className="inline-flex items-center gap-3 self-start rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg w-fit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Frostrek Neural Edge
            </motion.div>

            <motion.h1
              className="mt-8 text-4xl font-bold leading-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Intelligent systems
              </span>{" "}
              built to scale with how your business thinks.
            </motion.h1>

            <motion.p
              className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-slate-300/80 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Frostrek orchestrates data, decisions, and human oversight into a
              single cognitive stack. Deploy bespoke copilots, automation agents,
              and predictive intelligence with enterprise reliability and precise
              guardrails.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] transition-transform duration-200 hover:-translate-y-1">
                <span className="relative z-10 flex items-center gap-2">
                  Launch Your AI Program
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>

              <button className="group flex items-center gap-3 rounded-full border border-white/10 px-6 py-4 text-base font-medium text-slate-200/80 transition duration-200 hover:border-cyan-400/40 hover:text-cyan-200">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.35)] transition group-hover:bg-cyan-400/20">
                  <Play className="h-4 w-4" />
                </span>
                See platform in action
              </button>
            </motion.div>

            <motion.div
              className="mt-12 grid w-full gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-bold text-slate-100 md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-emerald-300">{stat.trend} YoY</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex flex-1 flex-col justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -left-24 top-1/4 hidden h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl lg:block" />
            <div className="absolute -right-32 bottom-16 hidden h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl lg:block" />

            <div className="relative">
              <TechGlobe enablePointer={!performanceMode} />

              <div className="tech-globe-overlay pointer-events-none">
                <div className="tech-globe-grid" />
              </div>

              {!performanceMode && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  {floatingBeacons.map((beacon) => (
                    <motion.div
                      key={beacon.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + beacon.delay, duration: 0.6 }}
                      className={`absolute ${beacon.position} w-48 rounded-2xl border border-cyan-400/20 bg-[#0B0B0E]/80 p-4 text-xs font-medium text-slate-200 shadow-[0_18px_32px_rgba(8,47,73,0.35)] backdrop-blur-lg`}
                    >
                      <div className="text-sm font-semibold text-cyan-200">
                        {beacon.title}
                      </div>
                      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                        {beacon.subtitle}
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-slate-400/70">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                        Systems Nominal
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
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
      <section id="about" className="relative w-full py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0E] font-sans overflow-hidden">
        {!performanceMode && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full opacity-60"
            style={{ mixBlendMode: "screen" }}
          />
        )}

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
              Frostrek LLP
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
                    className="flex items-center gap-2 sm:gap-3 group"
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

            {/* Right side - Enhanced visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex h-[300px] sm:h-[380px] md:h-[460px] lg:h-[500px] w-full items-center justify-center order-1 lg:order-2"
            >
              <motion.div
                className="relative z-10 scale-75 sm:scale-90 md:scale-100"
                style={
                  performanceMode
                    ? undefined
                    : {
                      rotateY: mousePosition.x * 0.3,
                      rotateX: -mousePosition.y * 0.3,
                    }
                }
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Rotating rings with gradient */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      marginLeft: `-${100 + i * 40}px`,
                      marginTop: `-${100 + i * 40}px`,
                    }}
                    animate={
                      performanceMode
                        ? undefined
                        : {
                          rotate: i % 2 === 0 ? 360 : -360,
                        }
                    }
                    transition={{
                      duration: performanceMode ? 0 : 30 - i * 5,
                      repeat: performanceMode ? 0 : Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="rounded-full border-2"
                      style={{
                        width: `${200 + i * 80}px`,
                        height: `${200 + i * 80}px`,
                        borderImage:
                          "linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(109, 40, 217, 0.5), rgba(20, 184, 166, 0.3)) 1",
                      }}
                    />
                  </motion.div>
                ))}

                {/* Central core with pulsing effect */}
                <motion.div
                  className="relative flex h-24 w-24 items-center justify-center"
                  animate={performanceMode ? undefined : { rotate: 360 }}
                  transition={{
                    duration: performanceMode ? 0 : 20,
                    repeat: performanceMode ? 0 : Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="relative w-20 h-20 bg-[#0B0B0E] rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30">
                    <div className="text-2xl font-bold bg-gradient-to-br from-cyan-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                      AI
                    </div>
                  </div>

                  {/* Multiple pulse rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                      animate={
                        performanceMode
                          ? undefined
                          : {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }
                      }
                      transition={{
                        duration: performanceMode ? 0 : 3,
                        repeat: performanceMode ? 0 : Infinity,
                        delay: performanceMode ? 0 : i * 1,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Enhanced orbiting dots with trails */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 6;
                  const radius = 140;
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      animate={
                        performanceMode
                          ? { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
                          : {
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius,
                            scale: [1, 1.3, 1],
                          }
                      }
                      transition={{
                        x: { duration: 0 },
                        y: { duration: 0 },
                        scale: {
                          duration: performanceMode ? 0 : 2,
                          repeat: performanceMode ? 0 : Infinity,
                          delay: performanceMode ? 0 : i * 0.3,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <div className="relative">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70" />
                        <motion.div
                          className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full blur-sm"
                          animate={
                            performanceMode
                              ? undefined
                              : {
                                scale: [1, 2, 1],
                                opacity: [0.8, 0, 0.8],
                              }
                          }
                          transition={{
                            duration: performanceMode ? 0 : 2,
                            repeat: performanceMode ? 0 : Infinity,
                            delay: performanceMode ? 0 : i * 0.3,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Enhanced corner elements - Hidden on mobile for cleaner look */}
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
      </section>
    </div>
  );
};

export default HeroAboutPage;