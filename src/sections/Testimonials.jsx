import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, MessageCircle, TrendingUp, Users, Award } from "lucide-react";

const testimonials = [
  {
    name: "Ritika Jain",
    role: "Team Lead, frostrek LLP",
    feedback:
      "Frostrek gave me platform where I received an exposure and have learned a lot about professional, work flows, and got an opportunity to work closure to understand the post training methods and how an AI model works.",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    category: "Startup",

  },
  {
    name: "Yash G",
    role: "Manager, frostrek LLP",
    feedback:
      "Their team delivered an AI-driven analytics tool that completely changed how we interpret our business data. Highly recommended! The ROI exceeded our expectations within the first quarter.",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    category: "Startup"
  },
  {
    name: "Sharadha Gujjar",
    role: "Quality Lead, frostrek LLP",
    feedback:
      "Working with Frostrek on our medical AI application was transformative. Their expertise in healthcare compliance combined with cutting-edge AI made our product launch a success.",
    avatar: "https://i.pravatar.cc/100?img=42",
    rating: 5,
    category: "Startup"
  },
];

const stats = [
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: TrendingUp, label: "Projects Delivered", value: "320+" },
  { icon: Award, label: "Success Rate", value: "98%" },
  { icon: MessageCircle, label: "Avg Rating", value: "4.9/5" },
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

const StatsCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #00FFFF, #6D28D9)",
        }}
      />

      <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/40 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-xl">
        <motion.div
          className="flex items-center justify-between mb-4"
          whileHover={{ x: 5 }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
        </motion.div>

        <motion.h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
          {stat.value}
        </motion.h3>
        <p className="text-sm text-slate-400">{stat.label}</p>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
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
      <div
        className="relative bg-gradient-to-br from-[#0D0D10] via-[#0B0B0E] to-[#0B0B0E] p-8 rounded-3xl border border-cyan-500/20 overflow-hidden backdrop-blur-sm shadow-lg shadow-cyan-500/10 font-sans"
        style={{ transform: "translateZ(50px)" }}
      >
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

        {/* Header with Category Badge */}
        <div className="relative flex items-start justify-between mb-6 z-10">
          <div className="flex-1">
            {/* Avatar Section */}
            <div className="relative flex items-center mb-4">
              <div className="relative">
                {/* Rotating Rings */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-cyan-400/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-3 rounded-full border border-blue-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Pulse Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-full bg-cyan-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Avatar */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="relative w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
                />

                {/* Status Indicator */}
                <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#111827]"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 8px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0.7)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="ml-4 flex-1">
                <motion.h3
                  className="font-bold text-base md:text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  animate={isHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.name}
                </motion.h3>
                <p className="text-[#D1D5DB] text-xs font-normal mt-0.5">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + i * 0.1 }}
                >
                  <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category Badge */}
          <motion.div
            className="ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-semibold text-cyan-300">{testimonial.category}</span>
          </motion.div>
        </div>

        {/* Feedback Text */}
        <div className="relative z-10 mb-6">
          <motion.div
            className="absolute -left-2 -top-2 text-4xl text-cyan-400/20 font-serif leading-none"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "
          </motion.div>

          <p className="text-[#D1D5DB] text-sm font-normal leading-relaxed pl-4 pr-2 relative">
            {testimonial.feedback}
          </p>

          <motion.div
            className="absolute -right-2 -bottom-2 text-4xl text-purple-400/20 font-serif leading-none"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            "
          </motion.div>
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
      <div
        className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-2xl -z-10 group-hover:bg-cyan-500/15 transition-all duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />
    </motion.div>
  );
};

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["all", ...new Set(testimonials.map(t => t.category))];
  const filteredTestimonials = selectedCategory === "all"
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  return (
    <section className="relative min-h-screen py-20 md:py-32 font-sans overflow-hidden bg-[#0B0B0E]">
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-16">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8 max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <h2 className="text-5xl md:text-7xl font-black mb-4 relative">
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Client Feedback
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
              Client Feedback
            </motion.span>
          </h2>

          <motion.p
            className="text-[#D1D5DB] text-base md:text-lg font-semibold uppercase tracking-widest mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ Verified Testimonials & Success Stories ]
          </motion.p>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-8 max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${selectedCategory === category
                ? "bg-cyan-400/20 border border-cyan-400 text-cyan-300"
                : "bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-400/30"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto relative z-10 "
          style={{ perspective: "1000px" }}
          layout
        >
          {filteredTestimonials.map((t, index) => (
            <TestimonialCard key={t.name} testimonial={t} index={index} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060C] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
};

export default Testimonials;