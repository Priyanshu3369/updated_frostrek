import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Award, Shield, CheckCircle, Sparkles, Star } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "ISO 27001:2022",
    description: "Information Security Management System",
    image: "/iso3.png",
    year: "2022",
  },
  {
    id: 2,
    title: "ISO 9001:2015",
    description: "Quality Management System",
    image: "/iso4.png",
    year: "2015",
  }
];

const HexGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

const DataStream = ({ delay, duration }) => {
  return (
    <motion.div
      className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
      initial={{ height: 0, top: "-10%" }}
      animate={{
        height: ["0%", "20%", "0%"],
        top: ["-10%", "110%"],
      }}
      transition={{
        duration: duration || 3,
        delay: delay || 0,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ left: `${Math.random() * 100}%` }}
    />
  );
};

const CircuitLine = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M 0,100 Q 250,50 500,100 T 1000,100"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#6D28D9" stopOpacity="1" />
          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const CertificationCard = ({ cert, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Holographic Effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: "linear-gradient(45deg, #00FFFF, #6D28D9, #14B8A6, #00FFFF)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-[#0D0D10] via-[#0B0B0E] to-[#0B0B0E] p-8 rounded-3xl border border-cyan-500/20 overflow-hidden backdrop-blur-sm shadow-lg shadow-cyan-500/10">
        {/* Animated Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
          animate={{
            y: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.3,
          }}
        />

        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />

        {/* Digital Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 4px),
              repeating-linear-gradient(90deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 4px)
            `,
          }} />
        </div>

        {/* Image Container */}
        <div className="relative mb-6 mt-4">
          <motion.div
            className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-cyan-500/10"
            animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 bg-cyan-400"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.05, 0, 0.05],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5" />

            <img
              src={cert.image}
              alt={cert.title}
              className="relative z-10 w-full h-full object-contain p-8 drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {cert.title}
          </motion.h3>
          <p className="text-[#D1D5DB] text-sm font-normal leading-relaxed mb-4">
            {cert.description}
          </p>

          {/* Year Badge */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400">Certified Since {cert.year}</span>
          </div>
        </div>

        {/* Tech Lines */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 3D Shadow */}
      <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-2xl -z-10 group-hover:bg-cyan-500/15 transition-all duration-500" />
    </motion.div>
  );
};

const AchievementBadge = ({ icon: Icon, label, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #00FFFF, #6D28D9)",
        }}
      />

      <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/40 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-xl text-center">
        <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
        <motion.h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
          {value}
        </motion.h3>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
};

const CertificationsPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-[#0B0B0E]">
      <HexGrid />
      {mounted &&
        [...Array(8)].map((_, i) => (
          <DataStream key={i} delay={i * 0.5} duration={3 + Math.random() * 2} />
        ))}
      <CircuitLine />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
            <Award className="text-cyan-400" size={24} />
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 relative">
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Certifications & Awards
            </motion.span>

            {/* Glitch Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, -2, 2, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
            >
              Certifications & Awards
            </motion.span>
          </h2>

          <motion.p
            className="text-[#D1D5DB] text-base md:text-lg font-semibold uppercase tracking-widest mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ Excellence Recognized & Validated ]
          </motion.p>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-8 max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto">
          <AchievementBadge icon={Shield} label="Certifications" value="2+" delay={0.1} />
          <AchievementBadge icon={Award} label="Standards Met" value="100%" delay={0.2} />
          <AchievementBadge icon={CheckCircle} label="Compliance" value="Full" delay={0.3} />
          <AchievementBadge icon={Star} label="Recognition" value="Global" delay={0.4} />
        </div>

        {/* Certifications Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0E] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
};

export default CertificationsPage;