import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Globe,
  Send,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead";
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

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FormInput = ({
  icon: Icon,
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative">
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          animate={{
            color: isFocused ? "rgb(34, 211, 238)" : "rgb(148, 163, 184)",
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-4 py-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all duration-300"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required={required}
          whileFocus={{ scale: 1.01 }}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const FormTextarea = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  required = true,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative">
        <motion.div
          className="absolute left-4 top-4 text-slate-400"
          animate={{
            color: isFocused ? "rgb(34, 211, 238)" : "rgb(148, 163, 184)",
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <motion.textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className="w-full pl-12 pr-4 py-4 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
          placeholder={`Enter your ${label.toLowerCase()}`}
          required={required}
          whileFocus={{ scale: 1.01 }}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const location = useLocation();

  const EMAILJS_SERVICE_ID = "service_jpnwy19";
  const EMAILJS_TEMPLATE_ID = "template_ikfra7o";
  const EMAILJS_PUBLIC_KEY = "apFcBI5oOTyIcDQu4";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Load EmailJS script dynamically
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Initialize EmailJS
      window.emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters matching your email template
      const templateParams = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || "Not provided",
        website: formData.website || "Not provided",
        message: formData.message,
        time: new Date().toLocaleString(),
      };

      // Send email
      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("✅ Email sent successfully:", response);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("❌ Email send error:", error);
      setIsSubmitting(false);
      setSubmitError(
        error.text || "Failed to send message. Please try again or contact us directly at info@Frostrek.com"
      );
    }
  };
  useEffect(() => {
    if (location.state?.serviceTitle) {
      setFormData(prev => ({
        ...prev,
        message: `Hi, I'm interested in ${location.state.serviceTitle}. `
      }));
    }
  }, [location.state]);
  return (
    <>
      <SEOHead
        title="Contact Frostrek | Book a Demo"
        description="Contact Frostrek for AI, automation, and enterprise technology solutions."
        canonicalUrl="https://www.frostrek.com/contact"
      />
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen overflow-hidden">
      <FloatingGrid />
      <FloatingParticles />

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
              contact us
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
                Let's Start a Conversation
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ready to transform your AI initiatives? Fill out the form below
              and our team will get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Setup Instructions */}
      {(EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID_HERE" ||
        EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID_HERE" ||
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE") && (
          <section className="relative px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-amber-500/10 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-300 mb-2">
                      Setup Required
                    </h3>
                    <p className="text-slate-300 text-sm mb-3">
                      To enable email sending, you need to configure EmailJS:
                    </p>
                    <ol className="text-slate-300 text-sm space-y-2 list-decimal list-inside">
                      <li>Create a free account at <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">emailjs.com</a></li>
                      <li>Create an email service (Gmail, Outlook, etc.)</li>
                      <li>Create an email template with these variables: first_name, last_name, email, phone, company, website, message, time</li>
                      <li>Replace the credentials in the code (lines 264-266) with your Service ID, Template ID, and Public Key</li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

      {/* Form Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="bg-white/[0.02] backdrop-blur-xl rounded-[32px] border border-white/10 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {isSubmitted ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 1.5, repeat: Infinity },
                    rotate: { duration: 2, ease: "easeInOut" },
                  }}
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Thank You!
                </h2>
                <p className="text-lg text-slate-300/80 mb-8">
                  Your message has been received. We'll get back to you shortly!
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <div>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormInput
                    icon={User}
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={errors.first_name}
                  />
                  <FormInput
                    icon={User}
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormInput
                    icon={Mail}
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <FormInput
                    icon={Phone}
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormInput
                    icon={Building}
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required={false}
                  />
                  <FormInput
                    icon={Globe}
                    label="Website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required={false}
                  />
                </div>

                <div className="mb-8">
                  <FormTextarea
                    icon={MessageSquare}
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-5 text-lg font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={
                    !isSubmitting
                      ? {
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 20px 40px rgba(13,148,136,0.4)",
                      }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  )}
                </motion.button>

                <motion.p
                  className="text-center text-sm text-slate-400 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  By submitting this form, you agree to our privacy policy and
                  terms of service.
                </motion.p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email Us",
                info: "info@Frostrek.com",
                delay: 0,
                link: "mailto:info@Frostrek.com",
              },
              {
                icon: Phone,
                title: "Call Us (IN)",
                info: "+91 6399999955",
                delay: 0.1,
              },
              {
                icon: Phone,
                title: "WhatsApp (US)",
                info: "+1 757 472 2491",
                delay: 0.1,
                link: "https://wa.me/17574722491",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 text-center transition-all duration-300 cursor-pointer block"
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-full mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">
                  {item.info}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Office Addresses */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Our Offices
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "India Office",
                info: "422, Suncity Success Tower, Golf Course Ext. Road, Sector - 65, Gurugram, Haryana, 122002",
                delay: 0.2,
                mapLink: "https://www.google.com/maps/search/?api=1&query=422+Suncity+Success+Tower+Golf+Course+Ext+Road+Sector+65+Gurugram+Haryana+122002",
              },
              {
                icon: Building,
                title: "USA Office",
                info: "701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States",
                delay: 0.3,
                mapLink: "https://www.google.com/maps/search/?api=1&query=701+Tillery+Street+Unit+12-3227+Austin+Texas+78702+United+States",
              },
              {
                icon: Building,
                title: "UK Office",
                info: "24-26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU",
                delay: 0.4,
                mapLink: "https://www.google.com/maps/search/?api=1&query=24-26+Arcadia+Avenue+Fin009+8701+London+United+Kingdom+N3+2JU",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 text-center transition-all duration-300 cursor-pointer block"
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  borderColor: "rgba(6, 182, 212, 0.3)",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 rounded-full mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed">
                  {item.info}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactForm;