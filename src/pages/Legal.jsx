import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Cookie, ChevronRight, Lock, Eye, UserCheck, Database, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEOHead from "../components/SEOHead";
const ParticlesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(168, 85, 247,',
    }));

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: i % 3 === 0
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)'
              : i % 3 === 1
                ? 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%)',
            boxShadow: i % 3 === 0
              ? '0 0 20px rgba(6, 182, 212, 0.6)'
              : i % 3 === 1
                ? '0 0 20px rgba(168, 85, 247, 0.6)'
                : '0 0 20px rgba(99, 102, 241, 0.6)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const DataStream = ({ delay, duration, left }) => {
  return (
    <motion.div
      className="fixed w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
      initial={{ height: 0, top: "-10%" }}
      animate={{
        height: ["0%", "30%", "0%"],
        top: ["-10%", "110%"],
      }}
      transition={{
        duration: duration || 4,
        delay: delay || 0,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ left: left || `${Math.random() * 100}%` }}
    />
  );
};

const CircuitLines = () => {
  return (
    <svg className="fixed inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00FFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="circuit-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
          <stop offset="50%" stopColor="#A855F7" stopOpacity="1" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M 0,200 Q 400,100 800,200 T 1600,200"
        stroke="url(#circuit-gradient-1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <motion.path
        d="M 0,400 Q 400,300 800,400 T 1600,400"
        stroke="url(#circuit-gradient-2)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      <motion.path
        d="M 0,600 Q 400,500 800,600 T 1600,600"
        stroke="url(#circuit-gradient-1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </svg>
  );
};

const SectionNav = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
  ];

  return (
    <motion.div
      className="sticky top-20 z-20 bg-[#0B0B0E]/95 backdrop-blur-xl border-b border-cyan-500/20 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium w-full sm:w-auto justify-center overflow-hidden ${activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-400/30 hover:text-cyan-400'
                  }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {activeSection === section.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  animate={activeSection === section.id ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <Icon size={18} />
                </motion.div>
                <span className="whitespace-nowrap relative z-10">{section.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const ContentBlock = ({ title, children, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #00FFFF, #6D28D9)",
        }}
        whileHover={{ scale: 1.02 }}
      />

      <motion.div
        className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/40 p-6 sm:p-8 rounded-xl border border-cyan-500/20 backdrop-blur-xl overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated scan line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          animate={{
            y: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: delay,
          }}
        />

        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50" />

        {title && (
          <motion.div
            className="flex items-start gap-3 mb-4 relative z-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
          >
            {Icon && (
              <motion.div
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 mt-1"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </motion.div>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-white flex-1">{title}</h3>
          </motion.div>
        )}
        <motion.div
          className="text-slate-300 space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PrivacyPolicy = () => (
  <div className="space-y-6 sm:space-y-8">
    <ContentBlock title="Introduction" icon={Eye} delay={0}>
      <p>
        At <strong>Frostrek</strong>, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website and annotation services. By accessing or using our website, you agree to the terms outlined in this policy.
      </p>
      <p className="text-slate-400 text-xs sm:text-sm">
        Effective Date: October 15, 2024
      </p>
    </ContentBlock>

    <ContentBlock title="Information We Collect" icon={Database} delay={0.1}>
      <p>
        <strong className="text-cyan-400">Personal Information:</strong> Name, email address, phone number, and billing or payment details where applicable.
      </p>
      <p>
        <strong className="text-cyan-400">Non-Personal Information:</strong> IP address, browser type and version, device information, geographic location, pages visited, and time spent on the website.
      </p>
      <p>
        <strong className="text-cyan-400">Uploaded Data:</strong> Any data or images uploaded to our platform for annotation purposes are securely stored and used solely to provide the agreed-upon services.
      </p>
    </ContentBlock>

    <ContentBlock title="How We Use Your Information" icon={UserCheck} delay={0.2}>
      <ul className="space-y-2 list-disc list-inside marker:text-cyan-400">
        <li>Provide, manage, and improve our annotation services</li>
        <li>Process transactions and communicate with you</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Ensure compliance with legal and regulatory obligations</li>
        <li>Customize user experience and improve website functionality</li>
      </ul>
    </ContentBlock>

    <ContentBlock title="Legal Basis for Processing" icon={Lock} delay={0.3}>
      <ul className="space-y-2 list-disc list-inside marker:text-cyan-400">
        <li><strong className="text-white">Contractual Obligation:</strong> To fulfill agreements and deliver requested services</li>
        <li><strong className="text-white">Consent:</strong> For specific purposes such as marketing communications</li>
        <li><strong className="text-white">Legitimate Interest:</strong> To improve our website and ensure security</li>
        <li><strong className="text-white">Legal Compliance:</strong> To meet regulatory requirements</li>
      </ul>
    </ContentBlock>

    <ContentBlock title="Data Security & Retention" delay={0.4}>
      <p>
        We use robust security measures including encryption, firewalls, and secure servers to protect your data. While we strive to safeguard your information, no system can be guaranteed to be 100% secure.
      </p>
      <p>
        Personal data is retained only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. Uploaded data is securely deleted once annotation services are completed and no longer required.
      </p>
    </ContentBlock>

    <ContentBlock title="Your Rights" delay={0.5}>
      <ul className="space-y-2 list-disc list-inside marker:text-cyan-400">
        <li><strong className="text-white">Access:</strong> Request access to your personal data</li>
        <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
        <li><strong className="text-white">Deletion:</strong> Request deletion of your data</li>
        <li><strong className="text-white">Restriction / Objection:</strong> Object to or restrict data processing</li>
        <li><strong className="text-white">Portability:</strong> Receive your data in a structured format</li>
        <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time</li>
      </ul>
      <p className="mt-4 text-cyan-400">
        To exercise these rights, contact us at{" "}
        <a
          href="mailto:info@Frostrek.com"
          className="underline hover:text-cyan-300"
        >
          info@Frostrek.com
        </a>
      </p>
    </ContentBlock>

    <ContentBlock title="International Data Transfers" delay={0.6}>
      <p>
        Frostrek is based in India and serves global clients. Your data may be processed in jurisdictions outside your country of residence. We ensure appropriate safeguards are in place to protect your information during such transfers.
      </p>
    </ContentBlock>
  </div>
);

const TermsOfService = () => (
  <div className="space-y-6 sm:space-y-8">
    <ContentBlock title="Agreement to Terms" icon={FileText} delay={0}>
      <p>
        By accessing or using Frostrek’s website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must discontinue use of our services.
      </p>
      <p className="text-slate-400 text-xs sm:text-sm">
        Effective Date: October 15, 2024
      </p>
    </ContentBlock>

    <ContentBlock title="Use of Services" icon={UserCheck} delay={0.1}>
      <p>
        You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations. You must not misuse, disrupt, or attempt to gain unauthorized access to our systems.
      </p>
    </ContentBlock>

    <ContentBlock title="Uploaded Data & Confidentiality" delay={0.2}>
      <p>
        Any data or images you upload for annotation remain your property. We treat all uploaded data as confidential and use it strictly for providing the agreed-upon services.
      </p>
    </ContentBlock>

    <ContentBlock title="Limitation of Liability" delay={0.3}>
      <p>
        Frostrek shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services.
      </p>
    </ContentBlock>

    <ContentBlock title="Governing Law" delay={0.4}>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of India.
      </p>
    </ContentBlock>
  </div>
);

const CookiePolicy = () => (
  <div className="space-y-6 sm:space-y-8">
    <ContentBlock title="Cookie Policy" icon={Cookie} delay={0}>
      <p>
        Our website uses cookies to enhance user experience and analyze website traffic. By using our website, you consent to our use of cookies in accordance with this policy.
      </p>
    </ContentBlock>

    <ContentBlock title="Types of Cookies We Use" delay={0.1}>
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-white mb-2">Essential Cookies</p>
          <p className="text-slate-400">
            Necessary for the website to function properly and cannot be disabled.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Analytics Cookies</p>
          <p className="text-slate-400">
            Help us understand how users interact with our website to improve performance.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Functional Cookies</p>
          <p className="text-slate-400">
            Remember user preferences to provide a more personalized experience.
          </p>
        </div>
      </div>
    </ContentBlock>

    <ContentBlock title="Managing Cookies" delay={0.2}>
      <p>
        You may manage or disable cookies through your browser settings or via our cookie consent banner. Disabling cookies may affect website functionality.
      </p>
    </ContentBlock>

    <ContentBlock title="Updates to This Policy" delay={0.3}>
      <p>
        We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated effective date.
      </p>
    </ContentBlock>
  </div>
);


const LegalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('privacy');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['privacy', 'terms', 'cookies'].includes(hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection('privacy');
    }
  }, [location]);

  const sectionTitles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy'
  };

  const sectionIcons = {
    privacy: Shield,
    terms: FileText,
    cookies: Cookie
  };

  const CurrentIcon = sectionIcons[activeSection];

  return (
    <>
      <SEOHead
        title="Legal Policies | Frostrek"
        description="Privacy policy, terms of service, compliance and legal disclosures."
        canonicalUrl="https://www.frostrek.com/legal"
      />
    <div className="relative min-h-screen bg-[#06060C] text-white overflow-hidden">
      <ParticlesCanvas />
      <FloatingParticles />
      <CircuitLines />

      {/* Data Streams */}
      {[...Array(6)].map((_, i) => (
        <DataStream key={i} delay={i * 0.8} duration={4 + i * 0.5} left={`${15 + i * 15}%`} />
      ))}

      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.12),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.08),transparent_50%)]" />

      <div className="fixed inset-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Hero Section - Fixed */}
      <div className="relative pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 bg-[#06060C]/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: -5 }}
          >
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowLeft size={20} />
            </motion.div>
            <span className="text-sm">Back</span>
          </motion.button>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <Lock size={16} className="relative z-10" />
              <span className="relative z-10">Legal & Privacy Information</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Sparkles size={14} />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                    '0 0 30px rgba(168, 85, 247, 0.4)',
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                />
                <CurrentIcon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 relative z-10" />
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                {sectionTitles[activeSection]}
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your privacy and trust matter to us. Learn how we protect your data and ensure transparency.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <SectionNav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {activeSection === 'privacy' && <PrivacyPolicy />}
            {activeSection === 'terms' && <TermsOfService />}
            {activeSection === 'cookies' && <CookiePolicy />}
          </motion.div>
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div
          className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% auto' }}
          />

          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Questions or Concerns?
          </motion.h2>
          <motion.p
            className="text-slate-300 mb-6 text-sm sm:text-base relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            If you have any questions about our legal policies or data practices, please don't hesitate to reach out.
          </motion.p>
          <motion.a
            href="mailto:info@Frostrek.com"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm sm:text-base relative z-10 overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <Link to="/get-in-touch">
              <span className="relative z-10">Contact Us</span>
            </Link>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ChevronRight size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Decorative Orbs */}
      <motion.div
        className="hidden md:block fixed top-40 right-16 w-32 h-32 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block fixed bottom-40 left-16 w-40 h-40 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hidden lg:block fixed top-1/2 left-10 w-24 h-24 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hidden lg:block fixed top-1/3 right-20 w-28 h-28 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    </>
  );
};

export default LegalPage;