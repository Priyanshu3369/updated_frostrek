import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as transform } from 'framer-motion';
import { ArrowRight, ChevronDown, Brain, Users, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";


// 3D Floating Grid Background
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

          // Rotate
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" style={{ mixBlendMode: 'screen' }} />;
};

// 3D Rotating Cube
const RotatingCube = ({ size = 100, delay = 0, speed = 10 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cube faces */}
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)` }} />
        <div className="absolute w-full h-full border border-cyan-400/20" style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
      </div>
    </motion.div>
  );
};

// 3D Perspective Card
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), { stiffness: 400, damping: 40 });
  const translateZ = useSpring(useTransform(x, [-150, 150], [0, 0]), { stiffness: 400, damping: 40 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
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
        translateZ,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}
    >
      <div style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// Parallax Icon
const ParallaxIcon = ({ Icon, className }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{ y, rotate, transformStyle: "preserve-3d" }}
      className={className}
      whileHover={{
        scale: 1.1,
        rotateY: 180,
        transition: { duration: 0.6 }
      }}
    >
      <Icon className="w-8 h-8 text-cyan-400" />
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
      answer: "Our process involves data collection, model training using RLHF, continuous feedback from human experts, and fine-tuning to optimize AI performance."
    },
    {
      question: "What sets your AI solutions apart from others in the market?",
      answer: "Our focus on personalized RLHF, extensive expertise, and commitment to real-world performance makes us stand out in delivering impactful AI solutions."
    },
    {
      question: "How long does it take to train an AI model with RLHF?",
      answer: "The training duration varies depending on the complexity of the model, but we typically aim for iterative improvements within a few weeks to months."
    },
    {
      question: "How can I get started with your services?",
      answer: "To get started, reach out to us via our contact page. Whether you're interested in AI model development or joining our talent pool, we'll guide you through every step of the process."
    }
  ];

  const talentPoolFAQs = [
    {
      question: "What is your talent pool, and how does it work?",
      answer: "Our talent pool consists of highly skilled professionals across various fields, carefully matched to connect with top companies based on specific job requirements and career goals."
    },
    {
      question: "How do you select talent for your pool?",
      answer: "We select talent based on rigorous screening, qualifications, experience, and a fit for the specific needs of our clients and industry demands."
    },
    {
      question: "How does your talent pool benefit companies?",
      answer: "We help companies find top-tier candidates quickly, saving time and resources in the recruitment process, and ensuring a good match for their specific needs."
    },
    {
      question: "How do you ensure the quality of candidates in your talent pool?",
      answer: "We maintain a high-quality talent pool by continuously vetting candidates, offering professional development, and matching skills to current market trends."
    }
  ];

  const toggleAI = (index) => {
    setOpenAI(openAI === index ? null : index);
  };

  const toggleTalent = (index) => {
    setOpenTalent(openTalent === index ? null : index);
  };

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen">
      <FloatingGrid />

      {/* 3D Rotating Cubes */}
      <RotatingCube size={80} delay={0} speed={15} />
      <RotatingCube size={60} delay={3} speed={12} />
      <RotatingCube size={100} delay={6} speed={18} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300/80 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Find quick answers to common inquiries about our AI training, RLHF expertise, and how we can help your business achieve AI excellence. Plus, learn more about how our talent pool connects you with top-tier professionals to meet your organization's needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Solutions FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-start gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ParallaxIcon
              Icon={Brain}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 backdrop-blur-xl flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                AI Solutions FAQs
              </h2>
              <p className="text-slate-400 text-lg">
                Answers to common questions about our cutting-edge AI training processes, RLHF expertise, and how we help businesses develop high-performing AI models.
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {aiSolutionsFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.button
                  onClick={() => toggleAI(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg font-semibold pr-4 text-slate-50">{faq.question}</span>
                  <motion.div
                    animate={{
                      rotateZ: openAI === index ? 180 : 0,
                      scale: openAI === index ? 1.1 : 1
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openAI === index ? "auto" : 0,
                    opacity: openAI === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="px-6 pb-6 text-slate-300/80 leading-relaxed border-t border-white/5 pt-4"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
      </div>

      {/* Talent Pool FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-start gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ParallaxIcon
              Icon={Users}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 backdrop-blur-xl flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Talent Pool FAQs
              </h2>
              <p className="text-slate-400 text-lg">
                Learn more about how our curated talent pool connects top-tier professionals with their dream companies and how we can help you find the right fit for your team.
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {talentPoolFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(109, 40, 217, 0.3)",
                  backgroundColor: "rgba(109, 40, 217, 0.05)",
                  boxShadow: "0 20px 40px rgba(109, 40, 217, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.button
                  onClick={() => toggleTalent(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg font-semibold pr-4 text-slate-50">{faq.question}</span>
                  <motion.div
                    animate={{
                      rotateZ: openTalent === index ? 180 : 0,
                      scale: openTalent === index ? 1.1 : 1
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openTalent === index ? "auto" : 0,
                    opacity: openTalent === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="px-6 pb-6 text-slate-300/80 leading-relaxed border-t border-white/5 pt-4"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.12),transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
            <Card3D>
              <motion.div
                className="text-center p-10 bg-white/[0.04] backdrop-blur-xl rounded-[28px] border border-white/5 hover:border-cyan-300/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent mb-4"
                  whileHover={{ scale: 1.1, rotateY: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  5000+
                </motion.div>
                <p className="text-slate-300/80 text-lg">Training Sessions Completed</p>
              </motion.div>
            </Card3D>

            <Card3D>
              <motion.div
                className="text-center p-10 bg-white/[0.04] backdrop-blur-xl rounded-[28px] border border-white/5 hover:border-indigo-300/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30, rotateY: 0 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent mb-4"
                  whileHover={{ scale: 1.1, rotateY: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  200+
                </motion.div>
                <p className="text-slate-300/80 text-lg">RLHF Experts</p>
              </motion.div>
            </Card3D>

            <Card3D>
              <motion.div
                className="text-center p-10 bg-white/[0.04] backdrop-blur-xl rounded-[28px] border border-white/5 hover:border-purple-300/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30, rotateY: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-cyan-400 bg-clip-text text-transparent mb-4"
                  whileHover={{ scale: 1.1, rotateY: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  100%
                </motion.div>
                <p className="text-slate-300/80 text-lg">Client Satisfaction</p>
              </motion.div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.16),transparent_70%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Interested? Come talk to us!
          </motion.h2>

          <motion.p
            className="text-lg text-slate-300/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Whether you're looking to enhance your AI models or explore new opportunities, we're here to help. Let's discuss how we can collaborate and drive success together.
          </motion.p>

          <Link to="/get-in-touch">
            <motion.button
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] mx-auto"
              initial={{ opacity: 0, y: 20, z: -50 }}
              whileInView={{ opacity: 1, y: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(13,148,136,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in touch
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.button>
          </Link>

        </div>
      </section>
    </div>
  );
};

export default FAQs;