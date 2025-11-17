import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Zap, Search, Filter, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services does Frostrek LLP offer?",
    answer:
      "Frostrek LLP specializes in AI automation, data analytics, NLP, computer vision, and AI system integration across industries. We provide end-to-end solutions from consulting to implementation, ensuring your business stays at the forefront of AI innovation.",
    icon: "🤖",
    category: "Services",
    helpful: 0
  },
  {
    question: "Do you provide custom AI model development?",
    answer:
      "Yes, we build and train custom AI models tailored to your business needs, ensuring optimal performance and scalability. Our team uses state-of-the-art techniques including deep learning, reinforcement learning, and transfer learning to create models that solve your specific challenges.",
    icon: "⚡",
    category: "Solutions",
    helpful: 0
  },
  {
    question: "Can Frostrek integrate AI into existing systems?",
    answer:
      "Absolutely. Our integration experts ensure that AI solutions blend seamlessly into your current workflows and platforms. We handle API development, data pipeline creation, and system architecture to minimize disruption while maximizing value.",
    icon: "🔗",
    category: "Integration",
    helpful: 0
  },
  {
    question: "How do I collaborate with Frostrek?",
    answer:
      "You can reach out through our collaboration form or schedule a consultation with our AI strategy team. We offer tailored discovery sessions, POC development, and ongoing partnership to ensure alignment with your business objectives.",
    icon: "🚀",
    category: "Getting Started",
    helpful: 0
  },
  {
    question: "What is your pricing model?",
    answer:
      "Our pricing is flexible and scales with your project needs. We offer hourly consulting, fixed-price projects, and retainer-based partnerships. Contact our team for a custom quote based on your specific requirements.",
    icon: "💰",
    category: "Services",
    helpful: 0
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. Simple integrations can take 2-4 weeks, while comprehensive AI solutions may take 3-6 months. We'll provide detailed timelines during the discovery phase.",
    icon: "⏱️",
    category: "Getting Started",
    helpful: 0
  },
];

// Animated Grid Background
const AnimatedGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
};

// Particle Field
const ParticleField = () => {
  return (
    <>
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle, onHelpful }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = (e) => {
    e.stopPropagation();
    setIsHelpful(!isHelpful);
    onHelpful(index, !isHelpful);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative group font-sans"
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, #00FFFF, #6D28D9, #14B8A6, #00FFFF)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div
        className={`relative bg-gradient-to-br from-[#0D0D10] via-[#0B0B0E] to-[#0B0B0E] rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-sm cursor-pointer ${
          isOpen
            ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
            : "border-cyan-500/20 hover:border-cyan-400/50"
        }`}
        onClick={onToggle}
      >
        {/* Scan Line */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              exit={{ y: "200%" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        {/* Digital Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 3px),
                repeating-linear-gradient(90deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 3px)
              `,
            }}
          />
        </div>

        {/* Corner Accents */}
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />

        {/* Question Button */}
        <div className="relative w-full flex items-center justify-between px-6 py-5 text-left group z-10">
          <div className="flex items-center gap-4 flex-1">
            {/* Icon with Pulse */}
            <motion.div
              className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-cyan-400/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-2xl relative z-10">{faq.icon}</span>
            </motion.div>

            <div className="flex-1">
              {/* Question Text */}
              <span className="text-base md:text-lg font-semibold text-[#FFFFFF] group-hover:text-cyan-400 transition-colors duration-300 block">
                {faq.question}
              </span>
              {/* Category Badge */}
              <motion.span
                className="text-xs font-semibold uppercase tracking-wider text-cyan-400/60 group-hover:text-cyan-400 transition-colors mt-1 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {faq.category}
              </motion.span>
            </div>
          </div>

          {/* Animated Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative flex-shrink-0 ml-4"
          >
            <motion.div
              className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-md"
              animate={{
                scale: isOpen ? [1, 1.5, 1] : 1,
                opacity: isOpen ? [0.5, 0, 0.5] : 0,
              }}
              transition={{ duration: 1, repeat: isOpen ? Infinity : 0 }}
            />
            <ChevronDown
              size={24}
              className={`relative transition-colors duration-300 ${
                isOpen ? "text-cyan-400" : "text-[#9CA3AF]"
              }`}
            />
          </motion.div>
        </div>

        {/* Answer Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Divider Line */}
              <motion.div
                className="mx-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Answer Content */}
              <motion.div
                className="px-6 pb-6 pt-4 relative"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Quote Mark */}
                <motion.div
                  className="absolute left-4 top-2 text-5xl text-cyan-400/10 font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "
                </motion.div>

                <p className="text-[#D1D5DB] text-sm font-normal leading-relaxed pl-8">
                  {faq.answer}
                </p>

                {/* Footer with actions */}
                <motion.div
                  className="flex items-center justify-between mt-6 pt-4 border-t border-cyan-400/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      AI_Verified
                    </span>
                  </div>

                  {/* Helpful Button */}
                  <motion.button
                    onClick={handleHelpful}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-300 ${
                      isHelpful
                        ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-400/30 hover:text-cyan-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsUp size={14} />
                    <span className="text-xs font-semibold">Helpful</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Tech Line */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Search and Filter Component
const SearchAndFilter = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, categories }) => {
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-12 space-y-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" size={20} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cyan-500/30 bg-[#08080c]/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(activeCategory === category ? "" : category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? "bg-cyan-400/20 border border-cyan-400 text-cyan-300"
                : "bg-white/5 border border-white/10 text-slate-400 hover:border-cyan-400/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [faqItems, setFaqItems] = useState(faqs);

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleHelpful = (index, isHelpful) => {
    setFaqItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, helpful: isHelpful ? item.helpful + 1 : item.helpful - 1 } : item
      )
    );
  };

  // Filter FAQs
  const filteredFaqs = faqItems.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative min-h-screen py-20 md:py-32 font-sans overflow-hidden bg-[#0B0B0E]">
      <AnimatedGridBackground />

      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-96 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-96 bottom-20 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {mounted && <ParticleField />}

      {/* Animated Spotlight */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 md:px-16">
        {/* Title Section */}
        <motion.div className="mb-4 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
            <Sparkles className="text-cyan-400" size={20} />
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 relative">
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Knowledge Base
            </motion.span>
          </h2>

          <motion.p
            className="text-[#D1D5DB] text-base md:text-lg font-semibold uppercase tracking-widest mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ Frequently Asked Questions ]
          </motion.p>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-6 max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </motion.div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />

        {/* FAQ List */}
        <div className="relative z-10 w-full max-w-4xl space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === faqs.indexOf(faq)}
                  onToggle={() => toggleFAQ(faqs.indexOf(faq))}
                  onHelpful={handleHelpful}
                />
              ))
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-slate-400 text-lg">No FAQs found. Try adjusting your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result Count */}
        {filteredFaqs.length > 0 && (
          <motion.p
            className="text-sm text-cyan-400/60 font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Showing {filteredFaqs.length} of {faqs.length} questions
          </motion.p>
        )}
      </div>

      {/* Bottom Gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
};

export default FAQs;