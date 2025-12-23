import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, ChevronDown, Brain, Users, Sparkles, Zap, Target, Award, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const FloatingGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 60;
    const perspective = 600;
    let rotationY = 0;
    let rotationX = 0.3;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      rotationY += 0.002;

      for (let x = -5; x <= 5; x++) {
        for (let z = -5; z <= 5; z++) {
          const x3d = x * gridSize;
          const z3d = z * gridSize;
          const y3d = Math.sin(x * 0.3 + z * 0.3 + rotationY * 2) * 20;

          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);
          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);

          const x1 = x3d * cosY - z3d * sinY;
          const z1 = x3d * sinY + z3d * cosY;
          const y1 = y3d * cosX - z1 * sinX;
          const z2 = y3d * sinX + z1 * cosX;

          const scale = perspective / (perspective + z2);
          const x2d = x1 * scale;
          const y2d = y1 * scale;

          const opacity = Math.max(0, Math.min(1, (z2 + 300) / 600)) * 0.15;

          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2);
          ctx.fill();

          if (x < 5) {
            const nextX3d = (x + 1) * gridSize;
            const nextX1 = nextX3d * cosY - z3d * sinY;
            const nextZ1 = nextX3d * sinY + z3d * cosY;
            const nextY3d = Math.sin((x + 1) * 0.3 + z * 0.3 + rotationY * 2) * 20;
            const nextY1 = nextY3d * cosX - nextZ1 * sinX;
            const nextZ2 = nextY3d * sinX + nextZ1 * cosX;
            const nextScale = perspective / (perspective + nextZ2);

            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(nextX1 * nextScale, nextY1 * nextScale);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" style={{ mixBlendMode: 'screen' }} />;
};

const Card3D = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), { stiffness: 400, damping: 40 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, z: 50 }}
      className={className}
    >
      {/* Mouse follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.15), transparent 40%)`,
        }}
      />

      <div style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const FAQCard = ({ faq, index, isOpen, toggle, color = "cyan" }) => {
  const colors = {
    cyan: {
      border: "rgba(6, 182, 212, 0.3)",
      bg: "rgba(6, 182, 212, 0.05)",
      shadow: "0 20px 50px rgba(6, 182, 212, 0.2)",
      icon: "text-cyan-400",
      gradient: "from-cyan-400 to-sky-500"
    },
    indigo: {
      border: "rgba(99, 102, 241, 0.3)",
      bg: "rgba(99, 102, 241, 0.05)",
      shadow: "0 20px 50px rgba(99, 102, 241, 0.2)",
      icon: "text-indigo-400",
      gradient: "from-indigo-400 to-purple-500"
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Background with glow */}
      <motion.div
        className="absolute inset-0 bg-white/[0.04] backdrop-blur-xl border border-white/5 rounded-2xl"
        whileHover={{
          borderColor: colors[color].border,
          backgroundColor: colors[color].bg,
          boxShadow: colors[color].shadow,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%)',
        }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.button
          onClick={toggle}
          className="w-full flex items-start justify-between p-6 text-left group/button"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-4 flex-1 pr-4">
            {/* Number badge */}
            <motion.div
              className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color].gradient} flex items-center justify-center text-white font-bold text-sm`}
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 15px rgba(255,255,255,0.8)',
                    '0 0 5px rgba(255,255,255,0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {index + 1}
              </motion.span>
            </motion.div>

            {/* Question text */}
            <span className="text-lg font-semibold text-slate-50 group-hover/button:text-white transition-colors">
              {faq.question}
            </span>
          </div>

          {/* Chevron icon */}
          <motion.div
            className="flex-shrink-0"
            animate={{
              rotateZ: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className={`w-6 h-6 ${colors[color].icon}`} />
          </motion.div>
        </motion.button>

        {/* Answer section */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <motion.div
            className="px-6 pb-6 border-t border-white/5"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-4 pl-14">
              <motion.p
                className="text-slate-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {faq.answer}
              </motion.p>

              {/* Decorative bottom line */}
              <motion.div
                className={`mt-4 h-1 bg-gradient-to-r ${colors[color].gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: isOpen ? '100%' : 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${colors[color].bg}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

const FAQs = () => {
  const [openAI, setOpenAI] = useState(null);
  const [openTalent, setOpenTalent] = useState(null);
  const { scrollYProgress } = useScroll();

  const aiSolutionsFAQs = [
    {
      question: "How does your AI training process work?",
      answer: "Our process involves data collection, model training using RLHF, continuous feedback from human experts, and fine-tuning to optimize AI performance. We use cutting-edge techniques to ensure models learn effectively from human preferences."
    },
    {
      question: "What sets your AI solutions apart from others in the market?",
      answer: "Our focus on personalized RLHF, extensive expertise with 200+ specialists, and commitment to real-world performance makes us stand out. We don't just train models—we create AI systems that understand and align with human values."
    },
    {
      question: "How long does it take to train an AI model with RLHF?",
      answer: "The training duration varies depending on the complexity of the model and your specific requirements. We typically aim for iterative improvements within a few weeks to months, with continuous optimization throughout the process."
    },
    {
      question: "How can I get started with your services?",
      answer: "Getting started is simple! Reach out to us via our contact page. Whether you're interested in AI model development or joining our talent pool, our team will guide you through every step of the process with personalized consultation."
    }
  ];

  const talentPoolFAQs = [
    {
      question: "What is your talent pool, and how does it work?",
      answer: "Our talent pool consists of highly skilled professionals across various fields, carefully vetted and matched to connect with top companies. We use advanced algorithms and human expertise to ensure perfect fits based on skills, experience, and cultural alignment."
    },
    {
      question: "How do you select talent for your pool?",
      answer: "We employ a rigorous multi-stage screening process evaluating qualifications, experience, technical skills, and soft skills. Each candidate undergoes thorough interviews and assessments to ensure they meet our high standards and client expectations."
    },
    {
      question: "How does your talent pool benefit companies?",
      answer: "We help companies find top-tier candidates quickly and efficiently, saving valuable time and resources in recruitment. Our pre-vetted talent pool ensures quality matches, reducing hiring risks and accelerating team growth with the right professionals."
    },
    {
      question: "How do you ensure the quality of candidates in your talent pool?",
      answer: "We maintain quality through continuous vetting, offering professional development opportunities, and staying current with market trends. Our candidates receive ongoing training and support, ensuring they remain at the cutting edge of their fields."
    }
  ];

  const toggleAI = (index) => {
    setOpenAI(openAI === index ? null : index);
  };

  const toggleTalent = (index) => {
    setOpenTalent(openTalent === index ? null : index);
  };

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen overflow-hidden">
      <FloatingGrid />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),transparent_60%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.25, 0.18] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(109,40,217,0.15),transparent_65%)]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.12]">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-white/5 px-6 py-2 text-sm uppercase tracking-widest text-cyan-200 backdrop-blur-lg mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(6,182,212,0.6)",
                boxShadow: "0 0 30px rgba(6,182,212,0.3)"
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
              <span>FAQs</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Frequently Asked
              </motion.span>
              <br />
              <span className="text-white">Questions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Find quick answers to common inquiries about our AI training, RLHF expertise,
              <br className="hidden md:block" />
              and how we connect top-tier professionals with leading organizations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Solutions FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="flex items-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon container */}
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 backdrop-blur-xl flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-cyan-400/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Brain className="w-10 h-10 text-cyan-400 relative z-10" />
            </motion.div>

            <div className="flex-1">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  AI Solutions
                </span>
              </motion.h2>
              <motion.p
                className="text-slate-400 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Everything you need to know about our AI training and RLHF expertise
              </motion.p>
            </div>
          </motion.div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {aiSolutionsFAQs.map((faq, index) => (
              <FAQCard
                key={index}
                faq={faq}
                index={index}
                isOpen={openAI === index}
                toggle={() => toggleAI(index)}
                color="cyan"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="relative h-px"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

          {/* Glowing dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400"
            animate={{
              scale: [1, 1.5, 1],
              boxShadow: [
                '0 0 10px rgba(6,182,212,0.5)',
                '0 0 20px rgba(6,182,212,0.8)',
                '0 0 10px rgba(6,182,212,0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Talent Pool FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="flex items-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon container */}
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 backdrop-blur-xl flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-indigo-400/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <Users className="w-10 h-10 text-indigo-400 relative z-10" />
            </motion.div>

            <div className="flex-1">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Talent Pool
                </span>
              </motion.h2>
              <motion.p
                className="text-slate-400 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Learn how we connect professionals with their dream opportunities
              </motion.p>
            </div>
          </motion.div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {talentPoolFAQs.map((faq, index) => (
              <FAQCard
                key={index}
                faq={faq}
                index={index}
                isOpen={openTalent === index}
                toggle={() => toggleTalent(index)}
                color="indigo"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Cards */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15),transparent_70%)]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Trusted by Leaders
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Our track record speaks for itself
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "5000+", label: "Training Sessions", icon: Zap, color: "from-cyan-400 to-sky-500" },
              { value: "200+", label: "RLHF Experts", icon: Users, color: "from-indigo-400 to-purple-500" },
              { value: "100%", label: "Client Satisfaction", icon: Award, color: "from-purple-400 to-pink-500" }
            ].map((stat, index) => (
              <Card3D key={index} className="group" delay={index * 0.15}>
                <motion.div
                  className="relative text-center p-10 bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/5 hover:border-cyan-300/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ borderColor: "rgba(6,182,212,0.4)" }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(6,182,212,0.1), transparent 70%)'
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="inline-flex mb-6"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 relative z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <p className="text-slate-300 text-lg relative z-10">{stat.label}</p>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                  />
                </motion.div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(109,40,217,0.15) 0%, transparent 50%)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Rotating gradient ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.4) 60deg, transparent 120deg, rgba(109,40,217,0.4) 180deg, transparent 240deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/20 rounded-full"
              style={{
                width: i * 120,
                height: i * 120,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-cyan-400/30 backdrop-blur-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">
                Ready to get started?
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Let's Build
              </span>{" "}
              <br className="hidden md:block" />
              Something Amazing Together
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Whether you're looking to enhance your AI models or explore new opportunities,
              we're here to help. Let's discuss how we can collaborate and drive success together.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-5 text-lg font-semibold text-slate-900 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 25px 60px rgba(6,182,212,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated shine */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              {/* Pulsing border */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-white/40"
                animate={{
                  scale: [1, 1.4, 1.4],
                  opacity: [1, 0, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Button content */}
              <Link to="/get-in-touch">

                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Link>
            </motion.button>

            {/* Trust indicators */}
            <motion.div
              className="mt-16 flex justify-center gap-8 flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Shield, text: "Secure & Confidential" },
                { icon: TrendingUp, text: "Proven Results" },
                { icon: CheckCircle, text: "24/7 Support" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(6,182,212,0.3)",
                    boxShadow: "0 0 20px rgba(6,182,212,0.2)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-400">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom decorative line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          {/* Animated dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"
              style={{ left: `${25 + i * 25}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQs;