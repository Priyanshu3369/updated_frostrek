import emailjs from "emailjs-com";
import { useState, useRef, useEffect } from "react";
import { Mail, MessageSquare, Phone, Send, CheckCircle2, AlertCircle, Zap, Shield, Cpu } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const contactHighlights = [
  { text: "Tailored discovery sessions to align on goals", icon: Zap },
  { text: "End-to-end implementation with measurable milestones", icon: CheckCircle2 },
  { text: "Dedicated AI specialists for ongoing optimisation", icon: Shield },
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email us",
    detail: "info@frostrek.com",
    href: "mailto:info@frostrek.com",
    color: "from-cyan-500 to-blue-500"
  },
];

const AnimatedGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * 100 + "%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FormField = ({ label, name, type = "text", placeholder, required, rows, error, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleChange = (e) => {
    onChange(e);
    setFilled(e.target.value.length > 0);
  };

  const FieldComponent = type === "textarea" ? "textarea" : "input";

  return (
    <motion.label
      className="flex flex-col gap-3 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80"
        animate={{ color: focused ? "#06B6D4" : "#22D3EE80" }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </motion.span>

      <motion.div
        className="relative"
        animate={{
          boxShadow: focused
            ? "0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)"
            : "0 0 0px rgba(6, 182, 212, 0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <FieldComponent
          type={type}
          name={name}
          required={required}
          rows={rows}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          className={`w-full rounded-xl border-2 bg-[#08080c]/80 px-4 py-3 text-base font-normal text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:outline-none ${
            focused
              ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              : error
              ? "border-red-500/50"
              : "border-white/10 hover:border-white/20"
          }`}
          placeholder={placeholder}
        />

        {/* Status indicator */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {error ? (
            <AlertCircle size={20} className="text-red-500" />
          ) : filled && !error ? (
            <CheckCircle2 size={20} className="text-cyan-400" />
          ) : null}
        </motion.div>
      </motion.div>

      {error && (
        <motion.span
          className="text-xs text-red-400 flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={14} />
          {error}
        </motion.span>
      )}
    </motion.label>
  );
};

const FloatingContactCard = ({ method, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = method.icon;

  return (
    <motion.a
      href={method.href}
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow background */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          backgroundImage: `linear-gradient(135deg, rgb(6, 182, 212), rgb(6, 182, 212))`,
        }}
        animate={{
          background: isHovered
            ? `linear-gradient(135deg, ${method.color.split(" ")[1].split("-")[0]}, ${method.color.split(" ")[2]})`
            : "linear-gradient(135deg, rgb(6, 182, 212), rgb(6, 182, 212))",
        }}
      />

      <div className={`relative flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 ${
        isHovered ? "border-cyan-400/60 bg-cyan-500/5" : "hover:border-white/20"
      }`}>
        <motion.div
          className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${method.color} p-0.5`}
          animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-full w-full rounded-xl bg-slate-950/80 flex items-center justify-center">
            <Icon size={24} className="text-cyan-300" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-cyan-300 transition-colors">
            {method.label}
          </span>
          <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
            {method.detail}
          </span>
        </div>

        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Send size={16} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </motion.a>
  );
};

const HighlightItem = ({ item, index }) => {
  const ItemIcon = item.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/5">
        <motion.div
          className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0 mt-1"
          animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <ItemIcon size={20} className="text-white" />
        </motion.div>
        <span className="text-sm font-normal leading-relaxed text-slate-300/90 group-hover:text-slate-100 transition-colors">
          {item.text}
        </span>
      </div>
    </motion.div>
  );
};

const Collaborate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setLoading(true);
  setFormErrors({});

  const templateParams = {
    full_name: formData.name,
    email: formData.email,
    company: formData.company || "N/A",
    message: formData.message,
    time: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  try {
    await emailjs.send(
      "service_vau3fva",
      "template_1bg6qob",
      templateParams,
      "yVNB9iZBs_EfVfoY7"
    );

    setStatus("submitted");
    setFormData({ name: "", email: "", company: "", message: "" });
  } catch (error) {
    console.error("Email send failed:", error);
    alert("Failed to send message. Please try again.");
  } finally {
    setLoading(false);
    setTimeout(() => setStatus("idle"), 5000);
  }
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section className="relative min-h-screen py-20 md:py-32 font-sans overflow-hidden bg-[#0B0B0E]">
      <AnimatedGridBackground />

      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-96 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-96 bottom-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Cpu size={16} className="text-cyan-300" />
            </motion.div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Get in Touch
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build the next generation
            </span>
            <br />
            <span className="text-slate-100">of intelligence with Frostrek</span>
          </h1>

          <p className="text-lg text-slate-300/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            Share your challenges and we'll co-design a roadmap that balances technical depth with
            measurable impact. Our team blends strategy, engineering, and enablement.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Left Section */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Highlights Box */}
            <motion.div
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-slate-950/60 p-8 backdrop-blur-xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.3), transparent 50%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-6">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {contactHighlights.map((highlight, index) => (
                    <HighlightItem key={index} item={highlight} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactMethods.map((method, index) => (
                <FloatingContactCard key={method.label} method={method} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-slate-950/60 p-8 md:p-10 backdrop-blur-xl overflow-hidden relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Form glow effect on submit */}
            <AnimatePresence>
              {status === "submitted" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10">
              {/* Form Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-slate-50 mb-2">Tell us about your project</h3>
                <p className="text-sm font-normal text-slate-400">
                  We'll respond within one business day with next steps and a suggested time to connect.
                </p>
              </motion.div>

              {/* Form Fields */}
              <div className="space-y-5 mb-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full name"
                    name="name"
                    placeholder="Alex Rivera"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formErrors.name}
                  />
                  <FormField
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>

                <FormField
                  label="Company / organisation"
                  name="company"
                  placeholder="Frostrek Labs"
                  value={formData.company}
                  onChange={handleInputChange}
                />

                <FormField
                  label="How can we help?"
                  name="message"
                  type="textarea"
                  rows={5}
                  placeholder="Share a bit about your initiative, timeline, or KPIs."
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  error={formErrors.message}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                >
                  <Send size={18} />
                </motion.div>
                <span>
                  {loading
                    ? "Sending..."
                    : status === "submitted"
                    ? "Message Sent! ✓"
                    : "Send Message"}
                </span>
              </motion.button>

              {/* Success Message */}
              <AnimatePresence>
                {status === "submitted" && (
                  <motion.div
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Thanks for reaching out! Our team will respond shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Collaborate;