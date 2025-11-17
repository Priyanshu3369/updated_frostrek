import { useState, useEffect } from "react";
import { ShieldCheck, Rocket, Users, Zap, ArrowRight, CheckCircle2, TrendingUp, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  {
    title: "Trusted Expertise",
    desc: "Our team brings years of experience in AI research, software engineering, and scalable solution design.",
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
    benefits: ["Industry-Leading Experience", "500+ Successful Projects", "Expert Team"],
    metric: "15+ Years"
  },
  {
    title: "Innovation-Driven",
    desc: "We push the boundaries of technology by constantly exploring emerging AI trends and integrating them effectively.",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
    benefits: ["Cutting-Edge Technologies", "Continuous Research", "Forward Thinking"],
    metric: "100+ Patents"
  },
  {
    title: "Client-Centered Approach",
    desc: "We collaborate closely with clients to ensure that every solution is personalized, impactful, and efficient.",
    icon: Users,
    color: "from-indigo-500 to-cyan-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    benefits: ["Custom Solutions", "Dedicated Support", "Partnership Model"],
    metric: "98% Retention"
  },
  {
    title: "Cutting-Edge Solutions",
    desc: "From automation to predictive analytics, we deliver high-performance systems that scale with your business.",
    icon: Zap,
    color: "from-teal-500 to-green-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    benefits: ["Scalable Systems", "High Performance", "Enterprise-Ready"],
    metric: "99.9% Uptime"
  },
];

const comparisonData = [
  { feature: "AI Expertise", frostrek: true, competitor1: true, competitor2: false },
  { feature: "24/7 Support", frostrek: true, competitor1: false, competitor2: true },
  { feature: "Custom Solutions", frostrek: true, competitor1: true, competitor2: false },
  { feature: "Scalability", frostrek: true, competitor1: true, competitor2: true },
  { feature: "Cost Efficiency", frostrek: true, competitor1: false, competitor2: true },
  { feature: "Innovation Labs", frostrek: true, competitor1: false, competitor2: false },
];

// Animated particle background
const AnimatedParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-400"
          initial={{
            x: particle.x + "%",
            y: particle.y + "%",
            opacity: 0,
          }}
          animate={{
            y: [particle.y + "%", (particle.y - 20) + "%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Reason Card Component
const ReasonCard = ({ item, index, isActive, isHovered, onHover, onHoverLeave }) => {
  const Icon = item.icon;

  return (
    <motion.div
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Holographic Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${item.glowColor}, transparent)`,
        }}
        animate={{
          backgroundPosition: isActive || isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div
        className={`group relative h-full bg-gradient-to-br from-slate-950/80 to-slate-900/40 p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden backdrop-blur-xl ${
          isActive || isHovered
            ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
            : "border-cyan-500/20"
        }`}
      >
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${item.glowColor} 0%, transparent 50%)`,
          }}
        />

        {/* Scan Line */}
        <AnimatePresence>
          {isActive || isHovered ? (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              exit={{ y: "200%" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          ) : null}
        </AnimatePresence>

        {/* Corner Accents */}
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isActive ? 1 : 0 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isActive ? 1 : 0 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon + Index */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                isActive || isHovered
                  ? `bg-gradient-to-br ${item.color} border-transparent shadow-lg`
                  : "border-cyan-500/30 bg-cyan-500/5"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon
                size={32}
                className={`transition-colors duration-500 ${
                  isActive || isHovered ? "text-white" : "text-cyan-400"
                }`}
              />
            </motion.div>

            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent opacity-20"
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>
          </div>

          {/* Title & Description */}
          <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-500 ${
            isActive || isHovered ? "text-cyan-300" : "text-slate-100"
          }`}>
            {item.title}
          </h3>

          <p className="text-slate-300/80 text-sm leading-relaxed mb-6">
            {item.desc}
          </p>

          {/* Benefits List */}
          <motion.div
            className="space-y-2 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isActive || isHovered ? 1 : 0, height: isActive || isHovered ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 text-sm text-cyan-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <CheckCircle2 size={16} />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Metric */}
          <motion.div
            className="pt-4 border-t border-cyan-400/20 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive || isHovered ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs text-slate-400 uppercase tracking-wider">Key Metric</span>
            <span className="text-lg font-bold text-cyan-400">{item.metric}</span>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            scaleX: isActive || isHovered ? 1 : 0,
            opacity: isActive || isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Comparison Table Component
const ComparisonTable = () => {
  return (
    <motion.div
      className="relative z-10 w-full max-w-4xl mx-auto mt-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-slate-50 mb-2">
          Why We <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Stand Out</span>
        </h3>
        <p className="text-slate-400">Compare our comprehensive feature set with industry alternatives</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-cyan-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-950/80 to-slate-900/40">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-100">Feature</th>
              <th className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Rocket size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-cyan-400">Frostrek</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="text-xs font-bold">Other</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Standard</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="text-xs font-bold">Other</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Premium</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <motion.tr
                key={idx}
                className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="px-6 py-4 text-sm font-semibold text-slate-200">{row.feature}</td>
                <td className="px-6 py-4 text-center">
                  {row.frostrek ? (
                    <motion.div
                      className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto"
                      whileHover={{ scale: 1.1 }}
                    >
                      <CheckCircle2 size={16} className="text-cyan-400" />
                    </motion.div>
                  ) : (
                    <div className="text-2xl text-slate-600">—</div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {row.competitor1 ? (
                    <CheckCircle2 size={16} className="text-slate-500 mx-auto" />
                  ) : (
                    <div className="text-2xl text-slate-600">—</div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {row.competitor2 ? (
                    <CheckCircle2 size={16} className="text-slate-500 mx-auto" />
                  ) : (
                    <div className="text-2xl text-slate-600">—</div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen py-20 md:py-32 font-sans overflow-hidden bg-[#0B0B0E]">
      {/* Background Effects */}
      {mounted && <AnimatedParticles />}

      {/* Ambient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-96 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-96 bottom-20 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/40 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Why Choose Frostrek
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
            Why Choose{" "}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Frostrek?
            </motion.span>
          </h2>

          <p className="text-slate-300/80 text-lg max-w-2xl mx-auto mt-6">
            Next-generation AI solutions designed to transform your business operations with innovation, expertise, and results.
          </p>
        </motion.div>

        {/* Main Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {reasons.map((item, index) => (
            <ReasonCard
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              isHovered={hoveredIndex === index}
              onHover={() => {
                setHoveredIndex(index);
                setActiveIndex(index);
              }}
              onHoverLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />
      </div>
    </section>
  );
};

export default WhyChooseUs;