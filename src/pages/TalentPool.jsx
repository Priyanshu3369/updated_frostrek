import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Brain,
  Code,
  Database,
  Cpu,
  Zap,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

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
            const nextY3d =
              Math.sin((x + 1) * 0.3 + z * 0.3 + rotationY * 2) * 20;
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

// Slide In Animation
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

const TalentPool = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Machine Learning",
    "Data Science",
    "AI Engineering",
    "Research",
    "Full Stack",
    "RLHF Specialists",
  ];

  const talentProfiles = [
    {
      name: "Senior ML Engineer",
      category: "Machine Learning",
      experience: "8+ years",
      skills: ["PyTorch", "TensorFlow", "MLOps", "Computer Vision"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.9,
      projects: 45,
      description: "Expert in designing and deploying large-scale ML systems with focus on computer vision and NLP applications.",
    },
    {
      name: "AI Research Scientist",
      category: "Research",
      experience: "6+ years",
      skills: ["Deep Learning", "Reinforcement Learning", "Publications", "Math"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 5.0,
      projects: 32,
      description: "PhD in AI with multiple publications in top-tier conferences. Specializes in novel algorithm development.",
    },
    {
      name: "Data Scientist",
      category: "Data Science",
      experience: "5+ years",
      skills: ["Python", "R", "SQL", "Statistical Modeling", "A/B Testing"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.8,
      projects: 58,
      description: "Data-driven professional with expertise in building predictive models and delivering actionable insights.",
    },
    {
      name: "RLHF Specialist",
      category: "RLHF Specialists",
      experience: "4+ years",
      skills: ["RLHF", "LLM Training", "Human Feedback", "Evaluation"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.9,
      projects: 28,
      description: "Specialized in training and fine-tuning large language models using reinforcement learning from human feedback.",
    },
    {
      name: "Full Stack AI Developer",
      category: "Full Stack",
      experience: "7+ years",
      skills: ["React", "Node.js", "Python", "AI Integration", "Cloud"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.7,
      projects: 62,
      description: "End-to-end developer skilled in building production-ready AI-powered applications and platforms.",
    },
    {
      name: "Computer Vision Engineer",
      category: "AI Engineering",
      experience: "6+ years",
      skills: ["OpenCV", "YOLO", "Image Processing", "3D Vision"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.8,
      projects: 41,
      description: "Specialist in developing advanced computer vision systems for object detection, tracking, and recognition.",
    },
    {
      name: "NLP Engineer",
      category: "AI Engineering",
      experience: "5+ years",
      skills: ["Transformers", "BERT", "GPT", "Text Analysis", "LLMs"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.9,
      projects: 37,
      description: "Expert in natural language processing with focus on transformer models and large language model applications.",
    },
    {
      name: "MLOps Engineer",
      category: "Machine Learning",
      experience: "6+ years",
      skills: ["Kubernetes", "Docker", "CI/CD", "Model Deployment", "Monitoring"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.8,
      projects: 54,
      description: "Infrastructure specialist focused on ML model deployment, monitoring, and maintaining production systems.",
    },
    {
      name: "AI Product Manager",
      category: "Research",
      experience: "8+ years",
      skills: ["Product Strategy", "AI/ML", "Roadmapping", "Stakeholder Management"],
      availability: "Available",
      rate: "Competitive",
      location: "Remote",
      rating: 4.9,
      projects: 43,
      description: "Strategic leader with deep technical understanding, bridging AI capabilities with business objectives.",
    },
  ];

  const filteredTalent = talentProfiles.filter(profile => {
    const matchesCategory = selectedCategory === "All" || profile.category === selectedCategory;
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "AI Professionals", value: "500+", icon: Users },
    { label: "Successful Projects", value: "1000+", icon: Briefcase },
    { label: "Average Rating", value: "4.8/5", icon: Star },
    { label: "Countries", value: "25+", icon: Globe },
  ];

  const expertiseAreas = [
    { name: "Machine Learning", icon: Brain, count: "120+" },
    { name: "Deep Learning", icon: Cpu, count: "95+" },
    { name: "Data Science", icon: Database, count: "150+" },
    { name: "Full Stack Dev", icon: Code, count: "85+" },
    { name: "RLHF", icon: Zap, count: "45+" },
    { name: "Research", icon: GraduationCap, count: "60+" },
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
              Talent Pool
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Elite AI Talent
              </span>
              <br />
              <span className="text-slate-50">Ready to Deploy</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Access our curated network of world-class AI professionals, data scientists, ML engineers, and RLHF specialists. Each talent is pre-vetted, experienced, and ready to accelerate your AI initiatives.
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <SlideIn direction="up" delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(6, 182, 212, 0.3)",
                    backgroundColor: "rgba(6, 182, 212, 0.05)",
                  }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SlideIn direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Areas of Expertise
              </span>
            </h2>
          </SlideIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {expertiseAreas.map((area, index) => (
              <SlideIn key={index} direction="up" delay={index * 0.1}>
                <motion.div
                  className="p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 text-center"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    borderColor: "rgba(6, 182, 212, 0.3)",
                    backgroundColor: "rgba(6, 182, 212, 0.05)",
                  }}
                >
                  <area.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-50 mb-2">{area.name}</h3>
                  <p className="text-sm text-cyan-300">{area.count} Experts</p>
                </motion.div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SlideIn direction="up">
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/5 p-8">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by role, skills, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#0B0B0E]"
                        : "bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Talent Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalent.map((profile, index) => (
              <SlideIn key={index} direction="up" delay={index * 0.05}>
                <ParallaxSection speed={0.1}>
                  <motion.div
                    className="group h-full p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 transition-all duration-300"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(6, 182, 212, 0.3)",
                      backgroundColor: "rgba(6, 182, 212, 0.05)",
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-50 mb-1">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-cyan-300">{profile.category}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-cyan-400/10 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">
                          {profile.rating}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {profile.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-indigo-400/10 text-indigo-300 text-xs rounded-full border border-indigo-400/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{profile.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{profile.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">{profile.availability}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#0B0B0E] rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Profile
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </ParallaxSection>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Talent Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.12),transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideIn direction="up">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Our Talent
              </span>
            </h2>
          </SlideIn>

          <SlideIn direction="up" delay={0.2}>
            <p className="text-lg text-slate-300/80 text-center max-w-3xl mx-auto mb-12">
              Every professional in our talent pool is carefully vetted to ensure they meet the highest standards of expertise, reliability, and professionalism.
            </p>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pre-Vetted Excellence",
                description: "All talent undergoes rigorous technical assessments and background verification to ensure top-tier quality.",
                icon: Award,
              },
              {
                title: "Proven Track Record",
                description: "Average 5+ years of experience with demonstrated success in real-world AI projects and deployments.",
                icon: CheckCircle,
              },
              {
                title: "Rapid Deployment",
                description: "Get matched with the perfect talent within 48 hours and start your project within a week.",
                icon: Zap,
              },
            ].map((item, index) => (
              <SlideIn key={index} direction="up" delay={0.3 + index * 0.1}>
                <motion.div
                  className="p-8 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5"
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(109, 40, 217, 0.3)",
                    backgroundColor: "rgba(109, 40, 217, 0.05)",
                  }}
                >
                  <item.icon className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </SlideIn>
            ))}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Dream AI Team?
              </span>
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
              Connect with our talent acquisition team to discuss your requirements and get matched with the perfect AI professionals for your project.
            </motion.p>
          </SlideIn>

          <SlideIn direction="up" delay={0.4}>
            <motion.button
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(13,148,136,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
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
  );
};

export default TalentPool;