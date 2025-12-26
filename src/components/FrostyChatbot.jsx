import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What services does Frostrek offer?",
    answer: "Frostrek specializes in cutting-edge technology solutions including AI Development, Web & Mobile Applications, Cloud Solutions, UI/UX Design, and Digital Transformation services. We help businesses leverage technology to achieve their goals."
  },
  {
    question: "How can I get started with Frostrek?",
    answer: "Getting started is easy! Simply click on 'Get In Touch' or visit our contact page. Our team will schedule a free consultation to understand your requirements and propose tailored solutions for your business."
  },
  {
    question: "What makes Frostrek different?",
    answer: "We combine innovation with reliability. Our team of experts uses the latest technologies while ensuring robust, scalable solutions. We focus on long-term partnerships, providing ongoing support and continuous improvement for all our projects."
  },
  {
    question: "What is your project timeline?",
    answer: "Project timelines vary based on complexity and scope. A typical web application takes 4-8 weeks, while larger enterprise solutions may take 3-6 months. We provide detailed timelines during our initial consultation after understanding your requirements."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Absolutely! We offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance optimization, and feature enhancements. Our support team is available 24/7 for critical issues."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with modern tech stacks including React, Next.js, Node.js, Python, AI/ML frameworks, Post training of Models, LLM's, Cloud platforms (AWS, Azure, GCP), and more. We choose the best technology based on your project requirements and scalability needs."
  }
];

const quickReplies = [
  "What services do you offer?",
  "How can I get started?",
  "What makes you different?",
  "Project timeline?",
  "Do you provide support?",
  "Technologies you use?"
];

export default function FrostyChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm Frosty, your AI assistant. 👋 How can I help you today? Feel free to ask me anything about Frostrek's services!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const findBestMatch = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const keywordMap = [
      { keywords: ["service", "offer", "provide", "do you do", "what do you"], index: 0 },
      { keywords: ["start", "begin", "contact", "get in touch", "reach", "hire"], index: 1 },
      { keywords: ["different", "unique", "special", "why choose", "why Frostrek", "better"], index: 2 },
      { keywords: ["time", "timeline", "duration", "how long", "deadline", "delivery"], index: 3 },
      { keywords: ["support", "maintenance", "help", "after", "ongoing", "24/7"], index: 4 },
      { keywords: ["tech", "technology", "stack", "framework", "language", "tools", "react", "node", "python"], index: 5 }
    ];

    for (const item of keywordMap) {
      if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return faqData[item.index].answer;
      }
    }

    return "I appreciate your question! For more specific information, I'd recommend reaching out to our team directly through the 'Get In Touch' page. They'll be happy to provide detailed answers tailored to your needs. Is there anything else I can help you with?";
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        text: findBestMatch(text),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Chatbot Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] z-[9999] flex flex-col pt-16 md:pt-20"
          >

            <div className="h-full flex flex-col bg-gradient-to-b from-[#0a0a12] via-[#0B0B0E] to-[#060609] border-l border-cyan-500/20 shadow-[0_0_60px_rgba(0,255,255,0.1)] rounded-tl-2xl">
              
              {/* Header */}
              <div className="relative px-4 py-3 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-[#0B0B0E] to-purple-500/10 flex-shrink-0 rounded-tl-2xl">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar with animated ring */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60 blur-sm" 
                           style={{ animation: "spin 3s linear infinite" }} />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0B0B0E] flex items-center justify-center">
                          <span className="text-base">🤖</span>
                        </div>
                      </div>
                      {/* Online indicator */}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0B0E] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold text-sm tracking-wide">Frosty</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[11px] text-emerald-400/90">Online • AI Assistant</span>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 transition-all duration-200"
                    aria-label="Close chatbot"
                  >
                    <svg className="w-5 h-5 text-slate-400 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent min-h-0">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      {message.type === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[1.5px] flex-shrink-0">
                          <div className="w-full h-full rounded-full bg-[#0B0B0E] flex items-center justify-center">
                            <span className="text-xs">🤖</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Message bubble */}
                      <div
                        className={`
                          px-4 py-3 rounded-2xl text-sm leading-relaxed
                          ${message.type === "user"
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-br-md shadow-[0_4px_20px_rgba(6,182,212,0.3)]"
                            : "bg-white/[0.07] text-slate-200 border border-white/10 rounded-bl-md backdrop-blur-sm"
                          }
                        `}
                      >
                        {message.text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[1.5px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-[#0B0B0E] flex items-center justify-center">
                        <span className="text-xs">🤖</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-3 py-2 border-t border-white/5 flex-shrink-0">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5 font-medium">Quick Questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-2.5 py-1 text-[11px] rounded-full bg-white/5 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-cyan-500/20 bg-[#0a0a12] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 transition-all duration-200"
                  />
                  
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-center text-[9px] text-slate-600 mt-2">
                  Powered by <span className="text-cyan-500/80">Frostrek AI</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
