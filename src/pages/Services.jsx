import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Users, Zap, Wrench, Database, Tag, Code, Eye, Brain, CheckCircle, Sparkles } from 'lucide-react';
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

// Parallax Container
const ParallaxSection = ({ children, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

// Side Slide In Animation
const SlideIn = ({ children, direction = "left", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// 3D Rotating Icon
const RotatingIcon = ({ Icon, className, speed = 10 }) => {
  return (
    <motion.div
      className={className}
      animate={{ rotateY: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      whileHover={{ scale: 1.2, rotateX: 15 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Icon />
    </motion.div>
  );
};

const Services = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const coreValues = [
    { title: "Trust", icon: <CheckCircle className="w-8 h-8" /> },
    { title: "Innovation", icon: <Zap className="w-8 h-8" /> },
    { title: "Collaboration", icon: <Users className="w-8 h-8" /> }
  ];

  const mainServices = [
    {
      number: "01",
      title: "AI Talent Sourcing and Deployment",
      description: "Source and deploy the best AI professionals, aligning expertise with your project's specific requirements, needs, and goals."
    },
    {
      number: "02",
      title: "AI Model Training and Optimization",
      description: "Enhance your AI model's performance through expert training, optimization, and real-world impact, ensuring accurate and efficient results."
    },
    {
      number: "03",
      title: "Customized AI Development Solutions",
      description: "Tailor AI systems to your business needs, providing scalable, reliable, and efficient solutions for your most complex challenges."
    }
  ];

  const customServices = [
    { name: "Data Annotation", icon: <Tag className="w-6 h-6" /> },
    { name: "Data Labeling", icon: <Database className="w-6 h-6" /> },
    { name: "Model Evals", icon: <CheckCircle className="w-6 h-6" /> },
    { name: "Code Gen Models", icon: <Code className="w-6 h-6" /> },
    { name: "Vision Modeling", icon: <Eye className="w-6 h-6" /> },
    { name: "LLM Assess", icon: <Brain className="w-6 h-6" /> }
  ];

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen overflow-hidden">
      <FloatingGrid />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg mb-8"
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
              services
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Customized solutions
              </span>
            </motion.h1>
          </motion.div>

          <SlideIn direction="up" delay={0.5}>
            <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-lg text-slate-300/80 leading-relaxed text-center">
                At Frostrek AI, we believe that every organization has unique needs when it comes to building and optimizing AI systems. That's why we specialize in delivering customized solutions designed to align seamlessly with your goals. Whether you're at the beginning of your AI journey or looking to refine existing systems, we're here to help. Our services range from sourcing top AI talent to conducting over 5000+ training sessions, ensuring that your models are not only innovative but also tailored to real-world demands.
              </p>
              <p className="text-lg text-slate-300/80 leading-relaxed text-center">
                With a focus on Reinforcement Learning from Human Feedback (RLHF), we bring human expertise into AI training, empowering your systems to perform efficiently while staying adaptable in a rapidly changing landscape. Let us help you harness the power of AI to drive measurable success and bring your vision to life. Explore our services to see how we can transform your ideas into exceptional outcomes.
              </p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,205,255,0.08),transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <ParallaxSection speed={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-cyan-400/30 backdrop-blur-xl"
                    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 10 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <RotatingIcon Icon={() => <Users className="w-20 h-20 text-cyan-400" />} speed={15} />
                  </motion.div>
                  <motion.div
                    className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-400/30 backdrop-blur-xl"
                    whileHover={{ scale: 1.05, rotateY: -10, rotateX: 10 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <RotatingIcon Icon={() => <Zap className="w-20 h-20 text-indigo-400" />} speed={12} />
                  </motion.div>
                </div>
              </ParallaxSection>
            </SlideIn>

            <SlideIn direction="right" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-50">
                We work as a family and you are part of it
              </h2>
              <p className="text-slate-300/80 mb-6 text-lg">We are committed to:</p>
              <div className="space-y-4 mb-8">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-white/[0.04] backdrop-blur-xl rounded-xl border border-white/5 transition-all duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{
                      scale: 1.03,
                      x: 5,
                      borderColor: "rgba(6, 182, 212, 0.3)",
                      backgroundColor: "rgba(6, 182, 212, 0.05)",
                    }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {value.icon}
                    </motion.div>
                    <span className="text-xl font-semibold text-slate-50">{value.title}</span>
                  </motion.div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {mainServices.map((service, index) => (
              <SlideIn
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <ParallaxSection speed={index % 2 === 0 ? 0.2 : -0.2}>
                  <motion.div
                    className="group relative p-8 md:p-10 bg-white/[0.04] backdrop-blur-xl rounded-[28px] border border-white/5 transition-all duration-300"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(6, 182, 212, 0.3)",
                      backgroundColor: "rgba(6, 182, 212, 0.05)",
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                    }}
                  >
                    <div className="flex items-start gap-6 md:gap-8">
                      <motion.div
                        className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent opacity-40"
                        whileHover={{ scale: 1.1, opacity: 0.6, rotateY: 15 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {service.number}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-50">{service.title}</h3>
                        <p className="text-slate-300/80 text-lg leading-relaxed mb-6">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </ParallaxSection>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.12),transparent_70%)]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <SlideIn direction="up">
            <motion.h2
              className="text-3xl md:text-5xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Custom and Bespoke
              </span>{" "}
              AI Solutions
            </motion.h2>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <motion.p
              className="text-lg text-slate-300/80 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Frostrek AI offers tailored AI services designed to meet your specific business needs. From model creation to optimization, we ensure your AI solutions align with your goals.
            </motion.p>
          </SlideIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {customServices.map((service, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  borderColor: "rgba(109, 40, 217, 0.3)",
                  backgroundColor: "rgba(109, 40, 217, 0.05)",
                  rotateY: 5
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="mb-4 text-indigo-400 group-hover:text-indigo-300 transition-colors flex justify-center"
                  whileHover={{ rotateY: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-semibold text-sm text-slate-50">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Services Banner */}
      <section className="py-8 overflow-hidden bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-2xl font-bold text-slate-400/60 mx-8">SERVICES</span>
              <motion.span
                className="text-2xl text-cyan-400 mx-2"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                ★
              </motion.span>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Service 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <ParallaxSection speed={0.3}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    AI Talent Sourcing and Deployment
                  </h3>
                  <p className="text-slate-300/80 text-lg leading-relaxed">
                    Finding the right talent is critical to the success of your AI initiatives. At Frostrek AI, we specialize in sourcing top-tier AI experts, including engineers, data scientists, and RLHF specialists, who are ready to integrate seamlessly into your team. Whether you need short-term support or long-term partnerships, we ensure that every professional we provide aligns with your project's needs and culture.
                  </p>
                </div>
              </ParallaxSection>
            </SlideIn>
            <SlideIn direction="right" delay={0.2}>
              <ParallaxSection speed={-0.3}>
                <motion.div
                  className="aspect-video rounded-[28px] bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-cyan-400/30 backdrop-blur-xl"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RotatingIcon Icon={() => <Users className="w-32 h-32 text-cyan-400" />} speed={20} />
                </motion.div>
              </ParallaxSection>
            </SlideIn>
          </div>

          {/* Service 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left" delay={0.2}>
              <ParallaxSection speed={0.3}>
                <motion.div
                  className="aspect-video rounded-[28px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-400/30 backdrop-blur-xl"
                  whileHover={{ scale: 1.05, rotateY: -10 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RotatingIcon Icon={() => <Zap className="w-32 h-32 text-indigo-400" />} speed={18} />
                </motion.div>
              </ParallaxSection>
            </SlideIn>
            <SlideIn direction="right">
              <ParallaxSection speed={-0.3}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    AI Model Training and Optimization
                  </h3>
                  <p className="text-slate-300/80 text-lg leading-relaxed">
                    With over 5000+ training sessions conducted, our expertise in Reinforcement Learning from Human Feedback (RLHF) ensures your AI models are more accurate, efficient, and responsive. From training models to understand nuanced user behavior to optimizing existing systems for peak performance, we ensure your AI evolves effectively and stays ahead in a competitive market.
                  </p>
                </div>
              </ParallaxSection>
            </SlideIn>
          </div>

          {/* Service 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <ParallaxSection speed={0.3}>
                <div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r from-purple-300 to-cyan-400 bg-clip-text text-transparent">
                    Customized AI Development Solutions
                  </h3>
                  <p className="text-slate-300/80 text-lg leading-relaxed">
                    Every business has unique requirements, and we understand the importance of personalized solutions. Our team collaborates with you to design and develop AI systems tailored specifically to your objectives. From ideation to implementation, we focus on delivering solutions that are scalable, reliable, and capable of solving your most complex challenges.
                  </p>
                </div>
              </ParallaxSection>
            </SlideIn>
            <SlideIn direction="right" delay={0.2}>
              <ParallaxSection speed={-0.3}>
                <motion.div
                  className="aspect-video rounded-[28px] bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-400/30 backdrop-blur-xl"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RotatingIcon Icon={() => <Wrench className="w-32 h-32 text-purple-400" />} speed={16} />
                </motion.div>
              </ParallaxSection>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.16),transparent_70%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SlideIn direction="up">
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
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <motion.p
              className="text-lg text-slate-300/80 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Whether you're looking to enhance your AI models or explore new opportunities, we're here to help. Let's discuss how we can collaborate and drive success together.
            </motion.p>
          </SlideIn>

          <SlideIn direction="up" delay={0.4}>
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

          </SlideIn>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Services;