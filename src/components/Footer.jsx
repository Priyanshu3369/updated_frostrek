import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Mail } from "lucide-react";

const ParticlesCanvas = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    
    let animationId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
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

const SocialIcon = ({ Icon, href, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      className="rounded-full border border-cyan-500/30 p-2 md:p-2.5 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 20px rgba(6,182,212,0.3)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={16} className="md:w-[18px] md:h-[18px]" />
    </motion.a>
  );
};

const FooterLink = ({ children, href, index }) => {
  return (
    <motion.a
      href={href}
      className="text-[#9CA3AF] hover:text-cyan-400 transition-colors duration-300 text-xs md:text-sm"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
      whileHover={{ 
        x: 3,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.a>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" },
    { name: "Partners", href: "/campus" },
  ];

const legalLinks = [
  { name: "Privacy Policy", href: "/legal#privacy" },
  { name: "Terms of Service", href: "/legal#terms" },
  { name: "Cookie Policy", href: "/legal#cookies" },
];


 const socialLinks = [
  { Icon: Linkedin, href: "https://www.linkedin.com/company/Frostrek/about/" },
  { Icon: Mail, href: "mailto:info@Frostrek.com" }
];


  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#0B0B0E] border-t border-white/5">
      {/* Subtle Background */}
      <ParticlesCanvas />
      
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />
        
        {/* Subtle Gradient Blobs */}
        <motion.div 
          className="absolute -top-12 left-1/4 h-32 w-32 md:h-40 md:w-40 rounded-full blur-3xl opacity-20"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/5 h-36 w-36 md:h-44 md:w-44 rounded-full blur-3xl opacity-15"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(109, 40, 217, 0.12) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-12 md:py-8"
        style={{ opacity, y }}
      >
        {/* Main Footer Content */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 mb-6 md:mb-7">
          {/* Company Info */}
          <motion.div
            className="text-center md:text-left lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-2xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 mb-2 md:mb-2.5"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              Frostrek
            </motion.h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mx-auto md:mx-0 max-w-md mb-4 md:mb-4">
              Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2.5 justify-center md:justify-start">
              {socialLinks.map(({ Icon, href }, index) => (
                <SocialIcon key={index} Icon={Icon} href={href} delay={0.2 + index * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Links Container for Mobile */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-2.5 md:mb-3 text-xs md:text-sm uppercase tracking-wider">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                {quickLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} index={index}>
                    {link.name}
                  </FooterLink>
                ))}
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-2.5 md:mb-3 text-xs md:text-sm uppercase tracking-wider">Legal</h3>
              <div className="flex flex-col space-y-2">
                {legalLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} index={index}>
                    {link.name}
                  </FooterLink>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col items-center gap-2.5 text-xs md:text-sm text-slate-500 md:flex-row md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.span 
            className="text-cyan-400/60 text-[10px] md:text-xs uppercase tracking-widest order-2 md:order-1"
            animate={{ 
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Frostrek LLP
          </motion.span>
          
          <p className="order-1 md:order-2">© {new Date().getFullYear()} Frostrek LLP. All Rights Reserved.</p>
        </motion.div>
      </motion.div>

      {/* Subtle Floating Dots */}
      <motion.div
        className="hidden md:block absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-cyan-400/30"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute bottom-32 left-24 w-1.5 h-1.5 rounded-full bg-indigo-400/25"
        animate={{ 
          y: [0, 12, 0],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </footer>
  );
};

export default Footer;