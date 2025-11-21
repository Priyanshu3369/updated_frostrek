import { motion } from "framer-motion";
import { Brain, Code, Cpu, LineChart, ArrowRight } from "lucide-react";

const services = [
  {
    title: "AI Automation",
    description:
      "Streamline operations with intelligent workflows that remove manual busywork and scale effortlessly.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    title: "Data Analytics",
    description:
      "Transform raw data into clear signals using modern analytics pipelines and actionable dashboards.",
    icon: LineChart,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    title: "Custom AI Solutions",
    description:
      "Design bespoke machine learning models that reflect your business logic and compliance needs.",
    icon: Brain,
    color: "from-indigo-500 to-cyan-500",
    glowColor: "rgba(99, 102, 241, 0.4)"
  },
  {
    title: "AI Integration",
    description:
      "Embed AI safely into existing products with reliable deployment, monitoring, and iteration loops.",
    icon: Code,
    color: "from-teal-500 to-green-500",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 * index, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative min-h-screen py-32 font-sans overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=900&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black/70 pointer-events-none" />

      {/* Light reveal overlays for background visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20 px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                ⚡ Services
              </p>
            </div>
          </motion.div>

          <motion.h2
            className="mt-8 text-5xl md:text-6xl font-bold tracking-tight text-slate-50 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Next-Gen AI <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Solutions</span>
          </motion.h2>

          <motion.p
            className="mt-6 text-lg font-normal leading-relaxed text-slate-300/90"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-slate-950/60 p-10 text-left backdrop-blur-2xl transition-all duration-500 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  borderColor: "rgba(6, 182, 212, 0.6)",
                  y: -12,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Tech grid pattern background */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.5)_1px,transparent_1px)] bg-[size:30px_30px] rounded-3xl" />
                </div>

                {/* Gradient glow background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {/* Border glow effect */}
                <motion.div
                  className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.glowColor}, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-20">
                  {/* Title with index */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.span
                      className="text-4xl font-bold text-white group-hover:text-white/20 transition-colors"
                      animate={{ rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-50 leading-tight pt-1">{service.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-base font-normal leading-relaxed text-slate-300/90 mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Corner accent */}
                <motion.div
                  className={`absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl ${service.color} rounded-bl-3xl opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Top right tech indicator */}
                <div className="absolute top-6 right-6 flex gap-2 pointer-events-none">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;