import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  FileText,
  Database,
  Wrench,
  Brain,
  Package,
  Tags,
  Target,
  Languages,
  Database as DataIcon,
  CheckCircle,
  Users,
  Zap,
  Settings,
  Globe,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";

// 3D Floating Grid Background
const FloatingGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// Parallax Container
const ParallaxSection = ({ children, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
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
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Continuous Horizontal Scroll
const ContinuousScroll = ({ items }) => {
  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-cyan-500/30"
          >
            <span className="text-cyan-300 font-medium whitespace-nowrap">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const NewPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsSmallScreen(mediaQuery.matches);
    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const ambientParticles = useMemo(() => {
    const count = isSmallScreen ? 12 : 18;
    return Array.from({ length: count }, (_, index) => ({
      id: `particle-${index}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }, [isSmallScreen]);
  const handleHireNow = (serviceTitle) => {
    navigate('/get-in-touch', { state: { serviceTitle } });
  };
  const services = [
    {
      icon: Tags,
      title: "Data Annotation & Data Labeling",
      description: "Comprehensive data annotation services for training advanced AI models with precise, high-quality labeled datasets across multiple data types and formats.",
      offerings: [
        "Image annotation (bounding boxes, polygons, segmentation)",
        "Video annotation (object tracking, frame-level labeling)",
        "Text annotation (NER, intent classification, sentiment tagging)",
        "Audio annotation",
        "OCR & document annotation",
        "Multimodal annotation (text + image + video)"
      ]
    },
    {
      icon: Target,
      title: "AI Post-Training Services",
      description: "Advanced post-training services to fine-tune, evaluate, and optimize AI models for production deployment with human-in-the-loop expertise.",
      offerings: [
        "RLHF (Reinforcement Learning from Human Feedback)",
        "SFT (Supervised Fine-Tuning)",
        "Model evaluation & response ranking",
        "Prompt evaluation, writing & optimization",
        "Safety, bias, and toxicity evaluation"
      ]
    },
    {
      icon: Languages,
      title: "Transcription & Translation",
      description: "Professional transcription and translation services with multilingual support and quality assurance for audio, video, and document content.",
      offerings: [
        "Audio & video transcription",
        "Multilingual transcription (including Indian languages)",
        "Translation and localization",
        "Quality-checked transcription pipelines"
      ]
    },
    {
      icon: DataIcon,
      title: "Data Collection Services",
      description: "End-to-end data collection services with controlled workflows and real-world data capture at scale for training robust AI models.",
      offerings: [
        "Image & video data collection (mobile/iPhone-based projects)",
        "Handwritten data collection (OCR datasets)",
        "Speech and audio data collection",
        "Real-world data capture at scale",
        "Controlled contributor workflows (non-freelance model)"
      ]
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance & Validation",
      description: "Rigorous quality assurance framework with multi-layer validation, consistency audits, and SLA-driven benchmarks for superior data quality.",
      offerings: [
        "Multi-layer QA framework (Annotator → QA → Lead → PM)",
        "Dataset validation & accuracy checks",
        "Rework reduction and consistency audits",
        "SLA-driven quality benchmarks",
        "Daily and weekly quality reporting"
      ]
    },
    {
      icon: Users,
      title: "Managed AI Workforce Solutions",
      description: "Scalable, dedicated AI workforce teams with rapid deployment capabilities and long-term support for enterprise AI projects.",
      offerings: [
        "Dedicated annotator and QA teams",
        "Rapid scale-up and scale-down support",
        "Shift-based or MWF workforce models",
        "Long-term or project-based deployments",
        "Replacement and continuity management"
      ]
    },
    {
      icon: Zap,
      title: "Ad-hoc & Urgent Delivery Support",
      description: "Fast-track project execution with surge capacity support for tight deadlines and high-volume tasks requiring immediate attention.",
      offerings: [
        "Short-timeline project execution",
        "Surge capacity for peak workloads",
        "High-volume tasks with tight deadlines",
        "Reliable alternative to freelance crowdsourcing"
      ]
    },
    {
      icon: Settings,
      title: "Tools & Platform Experience",
      description: "Extensive experience with industry-standard annotation tools, LLM platforms, and enterprise workflow systems for seamless integration.",
      offerings: [
        "CVAT and similar annotation tools",
        "LLM evaluation platforms",
        "Client-specific proprietary tools",
        "Workflow alignment with enterprise platforms"
      ]
    },
    {
      icon: Globe,
      title: "Industries & Use Cases Supported",
      description: "Serving diverse industries with specialized AI solutions tailored to specific use cases and domain requirements.",
      offerings: [
        "Generative AI & LLMs",
        "Computer Vision",
        "OCR & document intelligence",
        "AI safety & compliance",
        "Multimodal AI research"
      ]
    },
    {
      icon: Brain,
      title: "AI Development Solutions",
      description: "State-of-the-art AI solutions that empower businesses to automate processes, make data-driven decisions, and enhance overall performance.",
      techs: ["TensorFlow", "PyTorch", "Scikit-learn", "spaCy", "OpenAI", "OpenCV", "Meta", "pandas", "NumPy", "Selenium", "Streamlit"],
      offerings: [
        "Machine Learning Solutions",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Predictive Analytics"
      ]
    },
    {
      icon: Package,
      title: "Product Development & Innovation",
      description: "Turn your vision into reality with end-to-end product development from concept to launch and ongoing support.",
      techs: ["Apache Spark", "Django", "Firebase", "LangChain", "MongoDB", "MySQL", "OpenAI", "PostgreSQL", "PyTorch", "Rails", "TensorFlow"],
      offerings: [
        "Ideation & Design",
        "MVP & Prototyping",
        "Full Product Lifecycle",
        "Product Optimization"
      ]
    },
    {
      icon: Code2,
      title: "Website Development Services",
      description: "Building responsive, high-performance websites optimized for speed, user engagement, and conversion.",
      techs: ["Next.js", "Angular.js", "Vue.js", "TypeScript", "Express.js", "Node.js", "Python", "Shopify", "Webflow", "Framer", "AWS"],
      offerings: [
        "Custom Website Development",
        "E-commerce Solutions",
        "Content Management Systems (CMS)",
        "SEO-Optimized Websites"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Application Development",
      description: "Custom mobile applications for iOS and Android with seamless user experiences and advanced features.",
      techs: ["Swift", "Android", "Kotlin", "Firebase", "React Native", "Flutter", "Dart", "GraphQL", "Node.js"],
      offerings: [
        "iOS App Development",
        "Android App Development",
        "Cross-Platform Development",
        "App Maintenance & Support"
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Design Services",
      description: "Creating visually stunning and user-friendly interfaces that deliver exceptional user experiences.",
      techs: ["Figma", "Adobe Illustrator", "Sketch", "Adobe XD", "InVision"],
      offerings: [
        "User Research",
        "Wireframing & Prototyping",
        "UI/UX Strategy",
        "Responsive Design"
      ]
    },
    {
      icon: FileText,
      title: "CMS Development Services",
      description: "Custom CMS solutions that empower teams to manage and organize website content with ease.",
      techs: ["Prismic", "WordPress", "Wix", "Contentful", "Sanity", "Webflow", "Shopify", "Ghost", "Netlify CMS"],
      offerings: [
        "Custom CMS Development",
        "CMS Integration",
        "Content Migration",
        "Ongoing Support"
      ]
    },
    {
      icon: Database,
      title: "Python Development Services",
      description: "Robust, scalable Python applications for web development, automation, data analysis, and machine learning.",
      techs: ["Python", "Django", "Flask", "FastAPI", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Selenium"],
      offerings: [
        "Web Development",
        "Data Science & Analytics",
        "Automation Solutions",
        "Machine Learning Development"
      ]
    },
    {
      icon: Wrench,
      title: "Web Builder Development Services",
      description: "Custom web builder solutions with intuitive drag-and-drop interfaces and powerful backend support.",
      techs: ["Webflow", "Squarespace", "Shopify", "Framer", "Wix", "Weebly", "WordPress"],
      offerings: [
        "Custom Web Builder Solutions",
        "E-commerce Web Builders",
        "Website Maintenance & Support",
        "User Training"
      ]
    }
  ];

  const trustReasons = [
    {
      icon: "💬",
      title: "Flexible & Adaptive Development",
      description: "We use agile methodologies to ensure fast, iterative development, enabling us to adapt quickly to your changing needs."
    },
    {
      icon: "🎧",
      title: "Unmatched Support Excellence",
      description: "Our team offers exceptional, ongoing support to ensure your website performs flawlessly, no matter the challenge."
    },
    {
      icon: "🔍",
      title: "Focused & Dedicated Development",
      description: "With a dedicated team of experts, we focus solely on delivering high-quality solutions tailored to your business."
    },
    {
      icon: "💡",
      title: "Business-Centric Web Solutions",
      description: "We prioritize your needs, ensuring our services align with your goals and deliver the best results for your business."
    }
  ];

  const differentiators = [
    { icon: Users, text: "200+ trained, controlled, and accountable resources" },
    { icon: TrendingUp, text: "Structured hierarchy with Quality Leads" },
    { icon: Shield, text: "Experience with frontier-level AI projects" },
    { icon: Target, text: "High accuracy, fast turnaround, predictable delivery" },
    { icon: CheckCircle, text: "No dependency on unmanaged freelancers" }
  ];

  const techStack = ["React", "Next.js", "Node.js", "Python", "TensorFlow", "PyTorch", "AWS", "MongoDB", "PostgreSQL", "Docker"];

  return (
    <>
      <SEOHead
        title="Be Partner | Frostrek"
        description="Explore Frostrek's latest offerings and updates."
        canonicalUrl="https://www.frostrek.com/bepartner"
      />
    <div className="w-full overflow-x-hidden bg-[#0B0B0E] text-[#F8FAFC]">
      <FloatingGrid />

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

        {ambientParticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            {ambientParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute block h-[2px] w-[2px] rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: ["0%", "-10%", "0%"] }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center"
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
              Digital Solutions
            </motion.div>

            <motion.h1
              className="mt-8 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                End-to-End Digital Solutions
              </span>
              <br />
              for Your Business
            </motion.h1>

            <motion.p
              className="mt-8 max-w-3xl text-base font-normal leading-relaxed text-slate-300/80 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Specializing in secure, innovative, and high-performing websites tailored to your business needs, integrating the latest web technologies and AI solutions. Delivering web development that combines expertise, creativity, and cutting-edge technology.
            </motion.p>

            <motion.button
              className="group relative mt-12 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)]"
              initial={{ opacity: 0, y: 20, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(13,148,136,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 flex items-center gap-2" onClick={() => handleHireNow('End-to-End Digital Solutions')}>
                Hire Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Continuous Scroll */}
      <section className="relative w-full py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
        <ContinuousScroll items={techStack} />
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative w-full py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,205,255,0.08),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <SlideIn direction="up">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFFFF] mb-4">
                Why We Are Your{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                  Trusted Partner
                </span>
              </h2>
              <p className="text-lg text-[#94A3B8] max-w-2xl">
                From innovative designs to AI-powered solutions, we deliver excellence at every step.
              </p>
            </motion.div>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustReasons.map((reason, idx) => (
              <SlideIn key={idx} direction={idx % 2 === 0 ? "left" : "right"} delay={idx * 0.1}>
                <ParallaxSection speed={idx % 2 === 0 ? 0.2 : -0.2}>
                  <motion.div
                    className="group relative p-8 rounded-xl bg-white/[0.04] border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm h-full"
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      borderColor: "rgba(6, 182, 212, 0.4)",
                      backgroundColor: "rgba(6, 182, 212, 0.05)",
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      className="text-5xl mb-6"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {reason.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#F8FAFC] mb-4">{reason.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{reason.description}</p>
                  </motion.div>
                </ParallaxSection>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES FROSTREK DIFFERENT */}
      <section className="relative w-full py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.12),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <SlideIn direction="up">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFFFF] mb-4">
                What Makes{" "}
                <span className="bg-gradient-to-r from-purple-300 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                  Frostrek Different
                </span>
              </h2>
              <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto">
                Proven expertise, dedicated teams, and unmatched quality standards
              </p>
            </motion.div>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, idx) => (
              <SlideIn key={idx} direction={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right"} delay={idx * 0.1}>
                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 15px 30px rgba(6, 182, 212, 0.2)",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <p className="text-sm text-[#E2E8F0] leading-relaxed flex-1">{item.text}</p>
                </motion.div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTIONS */}
      {services.map((service, serviceIdx) => (
        <section key={serviceIdx} className="relative w-full py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.06),transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl px-6 md:px-10">
            <SlideIn direction={serviceIdx % 2 === 0 ? "left" : "right"}>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                      {service.title}
                    </span>
                  </h2>
                </div>
                <p className="text-base text-[#94A3B8] max-w-5xl leading-relaxed mb-8">
                  {service.description}
                </p>

                {service.techs && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {service.techs.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-md hover:bg-cyan-500/20 transition-colors duration-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            </SlideIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {service.offerings.map((offering, idx) => (
                <SlideIn
                  key={idx}
                  direction={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right"}
                  delay={idx * 0.1}
                >
                  <ParallaxSection speed={idx % 2 === 0 ? 0.1 : -0.1}>
                    <motion.div
                      className="group p-6 rounded-xl bg-white/[0.04] border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 h-full"
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        borderColor: "rgba(96, 165, 250, 0.4)",
                        backgroundColor: "rgba(96, 165, 250, 0.05)",
                        boxShadow: "0 15px 30px rgba(96, 165, 250, 0.1)",
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"
                          whileHover={{ scale: 2 }}
                        />
                        <p className="text-sm text-[#E2E8F0] leading-relaxed">{offering}</p>
                      </div>
                    </motion.div>
                  </ParallaxSection>
                </SlideIn>
              ))}
            </div>

            <SlideIn direction="up" delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center"
              >
                <motion.button
                  onClick={() => handleHireNow(service.title)}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] mx-auto"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    rotateX: 5,
                    boxShadow: "0 20px 40px rgba(13,148,136,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Hire Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                  <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </motion.button>
              </motion.div>
            </SlideIn>
          </div>
        </section>
      ))}

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
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Ready to Transform
              </span>{" "}
              Your Business?
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
              Let's discuss how we can help you achieve your digital goals with cutting-edge technology and innovative solutions.
            </motion.p>
          </SlideIn>

          <SlideIn direction="up" delay={0.4}>
            <motion.button
              onClick={() => handleHireNow('Transform Your Business')}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] mx-auto"
              initial={{ opacity: 0, y: 20, z: -50 }}
              whileInView={{ opacity: 1, y: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(13,148,136,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.button>
          </SlideIn>
        </div>
      </section>
    </div>
    </>
  );
};

export default NewPage;