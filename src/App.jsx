import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import FrostyChatbot from "./components/FrostyChatbot";

import Hero from "./sections/Hero";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";
import Collaborate from "./sections/Collaborate";

import AboutPage from "./pages/About";
import FAQPage from "./pages/FAQs";
import ServicePage from "./pages/Services";
import NewPage from "./pages/NewPage";
import GetInTouch from "./pages/GetInTouch";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import LegalPage from "./pages/Legal";
import Campus from "./pages/Campus";
import TalentPool from "./pages/TalentPool";
import SEOHead from "./components/SEOHead";
import NotFound from "./pages/NotFound";

const Home = () => {
  return (
    <>
      <SEOHead
        title="Frostrek | Enterprise AI & Agentic Automation Solutions"
        description="Frostrek is an ISO certified enterprise AI company delivering agentic AI systems, GenAI solutions, automation platforms, and scalable software for global businesses."
        canonicalUrl="https://www.frostrek.com/"
      />
    <div className="bg-[#0B0B0E] text-[#FFFFFF] min-h-screen scroll-smooth">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <FAQs />
      <Collaborate />
    </div>
    </>
  );
};

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="bg-[#0B0B0E] min-h-screen">
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/get-in-touch" element={<GetInTouch />} />
        <Route path="/bepartner" element={<NewPage />} />
        <Route path="/talent" element={<TalentPool />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {/* Sticky Chatbot Button */}
      <AnimatePresence>
        {!isChatbotOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsChatbotOpen(true)}
            className="fixed bottom-6 right-6 z-[9997] group cursor-pointer"
            aria-label="Open chatbot"
          >
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60 blur-xl animate-pulse" />
            
            {/* Main button */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-[2px] shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 group-hover:scale-110">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B0B0E] to-[#1a1a2e] flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
            </div>

            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B0B0E] shadow-lg animate-bounce">
              1
            </span>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-white/20">
              Chat with Frosty
              <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white/10 border-r border-b border-white/20 transform rotate-45" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Component */}
      <FrostyChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default App;
