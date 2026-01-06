import { motion } from "framer-motion";
import { Bot, Brain, Code, Cpu, LineChart, Workflow, Server } from "lucide-react";

const services = [
  {
    title: "AI Talent Acquisition & Deployment",
    description:
      "Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    title: "AI Model Training & Performance Optimization",
    description:
      "Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.",
    icon: LineChart,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    title: "Tailored AI Development Solutions",
    description:
      "Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.",
    icon: Brain,
    color: "from-indigo-500 to-cyan-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    title: "AI Agents & Autonomous Systems",
    description:
      "Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.",
    icon: Bot,
    color: "from-teal-500 to-green-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
  },
  {
    title: "AI-Powered Application & Platform Development",
    description:
      "Build production-ready web and mobile applications, internal tools, dashboards, and platforms that seamlessly embed AI into everyday business operations.",
    icon: Server,
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(251, 146, 60, 0.4)",
  },
  {
    title: "Organizational Workflow Automation & Integration",
    description:
      "Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination across systems and teams.",
    icon: Workflow,
    color: "from-emerald-500 to-lime-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    title: "ServiceNow Expertise",
    description:
      "Frostrek provides ServiceNow-focused implementation and managed services support through in-house certified professionals. Our team includes CSA (Certified System Administrator) and CAD (Certified Application Developer) certified resources, enabling us to support ITSM workflows, platform customization, integrations, and ongoing operations for enterprise clients and ServiceNow ecosystem partners.",
    icon: Code,
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
];



const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.1 * index, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative min-h-screen py-24 md:py-32 font-sans overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=900&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/80 pointer-events-none" />

      {/* Light reveal overlays for background visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.2),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(168,85,247,0.12),transparent_60%)] pointer-events-none" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 md:gap-20 px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                ⚡ Services
              </p>
            </div>
          </motion.div>

          <motion.h2
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-50 leading-[1.1]"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Next-Gen AI{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-300/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Services Grid - Improved Layout */}
        <div className="grid gap-6 sm:gap-7 md:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group relative flex flex-col h-full rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/70 p-7 md:p-9 text-left backdrop-blur-2xl transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  borderColor: "rgba(6, 182, 212, 0.5)",
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Tech grid pattern background */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.5)_1px,transparent_1px)] bg-[size:25px_25px] rounded-2xl md:rounded-3xl" />
                </div>

                {/* Gradient glow background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${service.glowColor} 0%, transparent 50%)`,
                      `radial-gradient(circle at 0% 0%, ${service.glowColor} 0%, transparent 50%)`,
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Border glow effect */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-25 pointer-events-none transition-opacity duration-500 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${service.glowColor}, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                  {/* Icon and Number Header */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </motion.div>
                    
                    <motion.span
                      className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white/30 to-white/10 bg-clip-text text-transparent group-hover:from-cyan-400/40 group-hover:to-purple-400/20 transition-all duration-500"
                      animate={{ rotate: [0, 3, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-50 leading-tight mb-4 group-hover:text-cyan-50 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base font-normal leading-relaxed text-slate-300/85 group-hover:text-slate-200/90 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>
                </div>

                {/* Corner accent - subtle */}
                <motion.div
                  className={`absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl ${service.color} rounded-tl-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Tech indicators */}
                <div className="absolute top-5 right-5 flex gap-1.5 pointer-events-none">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }}
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