import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/72d274ae-598c-4a3e-ae08-ff367afbf369/chat';

export default function FrostyChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there! 👋', sender: 'bot', timestamp: new Date() },
    { id: 2, text: "I'm Frosty, your AI assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 100);
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

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          chatInput: userMessage.text
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.output || data.response || data.text || data.message || 'Sorry, I couldn\'t process that. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998"
          />

          {/* Chatbot Panel */}
          <div
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] z-9999 flex flex-col pt-16 md:pt-20"
          >
            <div className="h-full flex flex-col bg-linear-to-b from-[#0a0a12] via-[#0B0B0E] to-[#060609] border-l border-cyan-500/20 shadow-[0_0_60px_rgba(0,255,255,0.1)] rounded-tl-2xl">
              
              {/* Header */}
              <div className="relative px-4 py-3 border-b border-cyan-500/20 bg-linear-to-r from-cyan-500/10 via-[#0B0B0E] to-purple-500/10 shrink-0 rounded-tl-2xl">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar with animated ring */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full opacity-60 blur-sm" 
                           style={{ animation: "spin 3s linear infinite" }} />
                      <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-purple-600 p-0.5">
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

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-br-sm shadow-[0_4px_20px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 text-slate-200 border border-white/10 rounded-bl-sm backdrop-blur-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="shrink-0 px-4 py-3 border-t border-cyan-500/20 bg-gradient-to-r from-[#0a0a12]/80 to-[#0B0B0E]/80 backdrop-blur-sm">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question..."
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="shrink-0 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 font-medium text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:shadow-none"
                  >
                    <svg 
                      className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
                
                {/* Powered by text */}
                <p className="text-center text-[10px] text-slate-500 mt-2">
                  Powered by Frostrek AI
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
