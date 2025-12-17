import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Zap, Users, Target, Eye, CheckCircle, Sparkles, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 4,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(6,182,212,${0.4 + Math.random() * 0.4}), transparent)`,
          }}
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [-30, -120, -30],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.8, 0],
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

const LiquidCard = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative overflow-hidden h-full rounded-2xl">
        {/* Animated glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.15), transparent 40%)`,
          }}
        />

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.2), transparent 40%)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle inner border */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-cyan-400/30 transition-colors duration-500" />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Bottom highlight line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-transparent"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-400 to-transparent"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ParallaxLayer = ({ children, speed = 0.5, direction = "vertical" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]),
    { stiffness: 100, damping: 30 }
  );

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <motion.div ref={ref} style={direction === "vertical" ? { y } : { x }}>
      {children}
    </motion.div>
  );
};

const RevealSection = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction], scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
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
    "Seamless integration and optimization"
  ];

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen overflow-hidden" ref={containerRef}>
      <FloatingParticles />

      {/* Enhanced Progress Bar with glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
          animate={{
            boxShadow: [
              '0 0 20px rgba(6,182,212,0.5)',
              '0 0 40px rgba(109,40,217,0.5)',
              '0 0 20px rgba(6,182,212,0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Enhanced mouse follower with multiple layers */}
      <motion.div
        className="fixed w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] pointer-events-none rounded-full blur-3xl opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.5), rgba(109,40,217,0.3), transparent)',
          x: useSpring(mousePos.x * 4, { stiffness: 50, damping: 20 }),
          y: useSpring(mousePos.y * 4, { stiffness: 50, damping: 20 }),
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-[0.08] pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.15)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.2),transparent_50%)]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <ParallaxLayer speed={0.3}>
            <motion.div className="text-center mb-8 sm:mb-12">
              <motion.div
                className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-cyan-500/40 bg-white/5 px-4 sm:px-5 py-2 text-xs sm:text-sm uppercase tracking-widest text-cyan-200 backdrop-blur-lg mb-6 sm:mb-8 relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(6,182,212,0.8)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.4)"
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity } }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-300" />
                </motion.div>
                <span className="relative z-10">About</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 leading-tight px-2"
                style={{
                  x: useSpring(mousePos.x * 0.5, { stiffness: 50, damping: 20 })
                }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Revealing the essence
                </motion.span>{" "}
                of our successful business
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-slate-300/80 font-light mb-6 sm:mb-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Revolutionizing AI Solutions with Expert Training and Talent Matching
              </motion.p>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-10 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                We are a cutting-edge AI company specializing in training advanced AI models through Reinforcement Learning from Human Feedback (RLHF). Founded with a vision to redefine AI development, we empower organizations by transforming their AI models into smarter, more reliable systems.
              </motion.p>

              <motion.button
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 50px rgba(6,182,212,0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => navigate('/services')} // <-- navigate on click
                aria-label="Discover services"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,0.3) inset',
                      '0 0 40px rgba(255,255,255,0.5) inset',
                      '0 0 20px rgba(255,255,255,0.3) inset',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">Discover services</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>

            </motion.div>
          </ParallaxLayer>
        </div>
      </section>

      {/* Services Grid - Mobile Responsive */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated mesh background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6,182,212,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(109,40,217,0.15) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <RevealSection>
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <motion.div
                className="inline-flex items-center gap-2 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <motion.span
                  className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold"
                  animate={{
                    letterSpacing: ['0.25em', '0.35em', '0.25em'],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  What We Do
                </motion.span>
                <motion.div
                  className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Empowering
                </motion.span>{" "}
                your AI journey
              </motion.h2>

              <motion.p
                className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Discover our comprehensive suite of AI solutions designed to transform your business
              </motion.p>
            </div>
          </RevealSection>

          {/* Services Cards - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-white/5 overflow-hidden cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${index === 0 ? 'rgba(6,182,212,0.1)' :
                        index === 1 ? 'rgba(99,102,241,0.1)' :
                          index === 2 ? 'rgba(168,85,247,0.1)' :
                            'rgba(20,184,166,0.1)'
                        }, transparent 70%)`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Border glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${index === 0 ? 'rgba(6,182,212,0.3)' :
                        index === 1 ? 'rgba(99,102,241,0.3)' :
                          index === 2 ? 'rgba(168,85,247,0.3)' :
                            'rgba(20,184,166,0.3)'
                        } 0%, transparent 50%)`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Number badge */}
                  <motion.div
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-cyan-400"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <motion.span
                      animate={{
                        textShadow: [
                          '0 0 5px rgba(6,182,212,0.5)',
                          '0 0 20px rgba(6,182,212,0.8)',
                          '0 0 5px rgba(6,182,212,0.5)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {index + 1}
                    </motion.span>
                  </motion.div>

                  {/* Icon with multiple animation layers */}
                  <motion.div
                    className="relative mb-4 sm:mb-6 inline-block"
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Outer rotating ring */}
                    <motion.div
                      className="absolute inset-0 -m-2 sm:-m-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-full h-full rounded-full border-2 border-dashed border-cyan-400/20" />
                    </motion.div>

                    {/* Pulsing background */}
                    <motion.div
                      className="absolute inset-0 -m-1 sm:-m-2 rounded-full bg-cyan-400/10"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Icon container */}
                    <motion.div
                      className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 backdrop-blur-sm"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white"
                      whileHover={{ x: 5 }}
                    >
                      {service.title}
                    </motion.h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3 sm:mb-4">
                      {service.desc}
                    </p>

                    {/* Animated underline */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings with Parallax */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer speed={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                { title: "RLHF Expertise", desc: "Empower your AI systems with 200+ trained RLHF specialists." },
                { title: "AI Talent Matching", desc: "Connect with industry-leading AI professionals." },
                { title: "Custom AI Development", desc: "Design AI models tailored to your business needs." },
                { title: "AI Strategy & Integration", desc: "Seamlessly integrate AI into your workflows." }
              ].map((offering, index) => (
                <RevealSection key={index} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                  <div className="p-6 sm:p-8 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5">
                    <motion.h3
                      className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ scale: 1.1 }}
                      >
                        {offering.title}
                      </motion.span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{offering.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </ParallaxLayer>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15),transparent_70%)]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Enhanced orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                background: `radial-gradient(circle, rgba(6,182,212,${0.6 - i * 0.05}), transparent)`
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              transformTemplate={({ rotate }) =>
                `translateX(${Math.cos(i * 45 * Math.PI / 180) * (window.innerWidth < 640 ? 90 : 120)}px) 
                 translateY(${Math.sin(i * 45 * Math.PI / 180) * (window.innerWidth < 640 ? 90 : 120)}px) 
                 rotate(${rotate})`
              }
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <RevealSection>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 px-4"
              style={{
                x: useSpring(mousePos.x * 0.5, { stiffness: 50, damping: 20 })
              }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                The future is now
              </motion.span>
              , let's make it better together
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              At Frostrek AI, we believe in innovation and collaboration. From training AI models to building custom solutions, our experts guide you at every step.
            </motion.p>
          </RevealSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12 text-center px-4">
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Features and Benefits
              </motion.span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-20">
            {features.map((feature, index) => (
              <RevealSection key={index} delay={index * 0.08} direction={index % 2 === 0 ? "left" : "right"}>
                <motion.div
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white/[0.04] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/5 relative overflow-hidden group"
                  whileHover={{
                    x: 8,
                    scale: 1.02,
                    borderColor: "rgba(6,182,212,0.4)",
                    boxShadow: "0 10px 40px rgba(6,182,212,0.2)"
                  }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Progress bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1.2, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute right-0 top-0 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(6,182,212,0.5)',
                          '0 0 20px rgba(6,182,212,0.8)',
                          '0 0 10px rgba(6,182,212,0.5)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <motion.div
                    className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-cyan-400/10 flex-shrink-0 mt-0.5 sm:mt-1 relative"
                    whileHover={{ rotate: 360, scale: 1.4 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-400/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 relative z-10" />
                  </motion.div>
                  <p className="text-sm sm:text-base text-slate-400 relative z-10">{feature}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { icon: Target, title: "Our Mission", desc: "To create transformative AI solutions and empower organizations by merging technology with human expertise.", gradient: "from-cyan-500/10" },
              { icon: Eye, title: "Our Vision", desc: "To be the global leader in AI model training and talent empowerment, fostering innovation and success.", gradient: "from-indigo-500/10" }
            ].map((item, index) => (
              <RevealSection key={index} delay={index * 0.15} direction={index === 0 ? "left" : "right"}>
                <LiquidCard className={`p-6 sm:p-8 md:p-10 bg-gradient-to-br ${item.gradient} to-transparent rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden`}>
                  {/* Animated corner decoration */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.div
                    className="relative z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      className="relative inline-block p-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-3 sm:mb-4 relative z-10" />
                    </motion.div>
                  </motion.div>
                  <div className="relative z-10 px-3 py-2">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-5">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                </LiquidCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Enhanced Effects */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Rotating gradient background */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.3) 60deg, transparent 120deg, rgba(109,40,217,0.3) 180deg, transparent 240deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/20 rounded-full"
              style={{
                width: i * (window.innerWidth < 640 ? 100 : 150),
                height: i * (window.innerWidth < 640 ? 100 : 150),
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealSection>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 px-4"
              style={{
                x: useSpring(mousePos.x * 0.3, { stiffness: 50, damping: 20 })
              }}
            >
              Interested? Come talk to us!
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-slate-400 mb-8 sm:mb-10 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Whether you're looking to enhance your AI models or explore new opportunities, we're here to help.
            </motion.p>

            <motion.button
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 shadow-lg relative overflow-hidden group"
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 25px 60px rgba(6,182,212,0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {/* Animated shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              {/* Pulsing border */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-white/40"
                animate={{
                  scale: [1, 1.3, 1.5],
                  opacity: [1, 0.5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Rotating glow */}
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.3) inset',
                    '0 0 40px rgba(255,255,255,0.5) inset',
                    '0 0 20px rgba(255,255,255,0.3) inset',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <span className="relative z-10">Get in touch</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.button>

            <motion.div
              className="mt-8 sm:mt-12 flex justify-center gap-4 sm:gap-8 flex-wrap px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(6,182,212,0.3)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.2)"
                }}
              >
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full relative"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-xs sm:text-sm text-slate-400">Available 24/7</span>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(6,182,212,0.3)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.2)"
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                </motion.div>
                <span className="text-xs sm:text-sm text-slate-400">Real-time Support</span>
              </motion.div>
            </motion.div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default About;