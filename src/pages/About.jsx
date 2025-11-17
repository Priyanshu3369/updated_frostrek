import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Users, Target, Eye, CheckCircle, Sparkles, Activity } from 'lucide-react';
import { Link } from "react-router-dom";

// Floating particles background
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Elegant professional card animation
const LiquidCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <div className="relative overflow-hidden h-full rounded-2xl">
        {/* Subtle inner border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"
          whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Horizontal line that expands on hover */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-white/20"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Parallax layer
const ParallaxLayer = ({ children, speed = 0.5 }) => {
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

// Animated section reveal
const RevealSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { icon: Zap, title: "AI Model Training", desc: "Leverage our 200+ RLHF experts to train and enhance your AI models.", color: "cyan" },
    { icon: Users, title: "Talent Solutions", desc: "Connect with top AI talent aligned with leading organizations.", color: "indigo" },
    { icon: Target, title: "Custom AI Solutions", desc: "Tailored AI strategies for your unique business challenges.", color: "purple" },
    { icon: Eye, title: "AI Integration", desc: "Seamless integration of AI technologies into your operations.", color: "teal" }
  ];

  const features = [
    "Cutting-edge AI model training tailored to your goals",
    "Expertise in RLHF ensures precise model alignment",
    "Access to a pool of top-tier AI talent",
    "Seamless integration and optimization",
    "Dedicated support for scalability"
  ];

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen overflow-hidden" ref={containerRef}>
      <FloatingParticles />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Mouse follower gradient */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none rounded-full blur-3xl opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4), transparent)',
          x: mousePos.x * 3,
          y: mousePos.y * 3,
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"
          animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.15),transparent_50%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ParallaxLayer speed={0.3}>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-sm uppercase tracking-widest text-cyan-200 backdrop-blur-lg mb-8"
                whileHover={{ scale: 1.05, borderColor: "rgba(6,182,212,0.6)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                </motion.div>
                About
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
                style={{ x: mousePos.x }}
              >
                <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                  Revealing the essence
                </span>{" "}
                of our successful business
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300/80 font-light mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Revolutionizing AI Solutions with Expert Training and Talent Matching
              </motion.p>

              <motion.p
                className="text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                We are a cutting-edge AI company specializing in training advanced AI models through Reinforcement Learning from Human Feedback (RLHF). Founded with a vision to redefine AI development, we empower organizations by transforming their AI models into smarter, more reliable systems.
              </motion.p>

              <motion.button
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-4 text-base font-semibold text-slate-900 shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(6,182,212,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">Discover services</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </ParallaxLayer>
        </div>
      </section>

      {/* Services Grid with Enhanced Effects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.08),transparent_70%)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <motion.span
                className="text-xs uppercase tracking-widest text-cyan-400 font-semibold"
                animate={{ letterSpacing: ['0.2em', '0.3em', '0.2em'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                What We Do
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-semibold mt-4 mb-4">
                Empowering your AI journey
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <RevealSection key={index} delay={index * 0.1}>
                <LiquidCard className="p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 h-full">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 mb-5"
                    whileHover={{ rotate: 45, scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
                </LiquidCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings with Parallax */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer speed={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "RLHF Expertise", desc: "Empower your AI systems with 200+ trained RLHF specialists." },
                { title: "AI Talent Matching", desc: "Connect with industry-leading AI professionals." },
                { title: "Custom AI Development", desc: "Design AI models tailored to your business needs." },
                { title: "AI Strategy & Integration", desc: "Seamlessly integrate AI into your workflows." }
              ].map((offering, index) => (
                <RevealSection key={index} delay={index * 0.1}>
                  <LiquidCard className="p-8 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5">
                    <motion.h3
                      className="text-2xl font-semibold mb-4 flex items-center gap-3"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      {offering.title}
                      <motion.div
                        whileHover={{ x: 5, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                      </motion.div>
                    </motion.h3>
                    <p className="text-slate-400 leading-relaxed">{offering.desc}</p>
                  </LiquidCard>
                </RevealSection>
              ))}
            </div>
          </ParallaxLayer>
        </div>
      </section>

      {/* Mission Statement with Particles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.12),transparent_70%)]" />

        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
              style={{ left: '50%', top: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              transformTemplate={({ rotate }) =>
                `translateX(${Math.cos(i * 60 * Math.PI / 180) * 100}px) 
                 translateY(${Math.sin(i * 60 * Math.PI / 180) * 100}px) 
                 rotate(${rotate})`
              }
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-semibold mb-8">
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                The future is now
              </span>
              , let's make it better together
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto">
              At Frostrek AI, we believe in innovation and collaboration. From training AI models to building custom solutions, our experts guide you at every step.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Features with Progress Bars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl font-semibold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Features and Benefits
              </span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {features.map((feature, index) => (
              <RevealSection key={index} delay={index * 0.05}>
                <motion.div
                  className="flex items-start gap-4 p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 relative overflow-hidden group"
                  whileHover={{
                    x: 8,
                    borderColor: "rgba(6,182,212,0.3)",
                    boxShadow: "0 10px 30px rgba(6,182,212,0.15)"
                  }}
                >
                  {/* Progress bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-indigo-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1 }}
                  />

                  <motion.div
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 flex-shrink-0 mt-1"
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                  <p className="text-slate-400">{feature}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Our Mission", desc: "To create transformative AI solutions and empower organizations by merging technology with human expertise.", gradient: "from-cyan-500/10" },
              { icon: Eye, title: "Our Vision", desc: "To be the global leader in AI model training and talent empowerment, fostering innovation and success.", gradient: "from-indigo-500/10" }
            ].map((item, index) => (
              <RevealSection key={index} delay={index * 0.1}>
                <LiquidCard className={`p-10 bg-gradient-to-br ${item.gradient} to-transparent rounded-2xl border border-white/10 backdrop-blur-xl`}>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <item.icon className="w-12 h-12 text-cyan-400 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </LiquidCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Radar Effect */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.1) 60deg, transparent 120deg)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">
              Interested? Come talk to us!
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              Whether you're looking to enhance your AI models or explore new opportunities, we're here to help.
            </p>
            <Link to="/get-in-touch">
              <motion.button
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-slate-900 shadow-lg relative"
                whileHover={{ scale: 1.1, y: -5, boxShadow: "0 25px 50px rgba(6,182,212,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Get in touch
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>


            <motion.div className="mt-12 flex justify-center gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <motion.div className="w-2 h-2 bg-emerald-400 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-sm text-slate-400">Available 24/7</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-sm text-slate-400">Real-time Support</span>
              </motion.div>
            </motion.div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default About;