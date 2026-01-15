import { motion } from 'framer-motion';
import { Building2, Users, Target, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';

const industryPartners = [
  {
    id: 1,
    name: 'Tech Corp',
    partnership: 'AI Solutions',
    description: 'Leading provider of enterprise AI solutions',
    color: '#06b6d4',
  },
  {
    id: 2,
    name: 'Innovation Labs',
    partnership: 'ML Research',
    description: 'Pioneering machine learning research',
    color: '#8b5cf6',
  },
  {
    id: 3,
    name: 'Data Systems Inc',
    partnership: 'Big Data',
    description: 'Advanced data analytics platform',
    color: '#ec4899',
  },
  {
    id: 4,
    name: 'Cloud Solutions',
    partnership: 'Infrastructure',
    description: 'Cloud-native infrastructure services',
    color: '#14b8a6',
  },
  {
    id: 5,
    name: 'AI Ventures',
    partnership: 'Deep Learning',
    description: 'Next-gen deep learning frameworks',
    color: '#6366f1',
  },
  {
    id: 6,
    name: 'Digital Innovations',
    partnership: 'Automation',
    description: 'Intelligent automation solutions',
    color: '#0ea5e9',
  },
];

const partnerStats = [
  { icon: Building2, value: '20+', label: 'Industry Partners' },
  { icon: Users, value: '500+', label: 'Collaborative Projects' },
  { icon: Target, value: '95%', label: 'Success Rate' },
  { icon: TrendingUp, value: '3x', label: 'Growth Impact' },
];

const IndustryPartnersSection = () => {
  const handlePartnerClick = () => {
    window.location.href = '/bepartner';
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-cyan-500/10 border border-cyan-500/30 mb-5 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm text-cyan-300 font-medium">Trusted Partnerships</span>
          </motion.div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 px-2">
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 
                           bg-clip-text text-transparent">
              Industry Partners
            </span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto px-2">
            Collaborating with leading organizations to drive innovation and deliver cutting-edge AI solutions
          </p>
        </motion.div>

        {/* Partner Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16"
        >
          {partnerStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/10
                           hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300">
                <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 
                             bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 leading-tight">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid - Enhanced Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-10 sm:mb-12">
          {industryPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] backdrop-blur-xl 
                           border border-white/10 hover:border-white/20
                           transition-all duration-500 overflow-hidden">
                
                {/* Gradient Overlay on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${partner.color}15, transparent 70%)`
                  }}
                />

                {/* Top Accent Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: partner.color }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon/Logo */}
                  <div className="mb-5 sm:mb-6">
                    <div 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl flex items-center justify-center
                               border-2 group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        borderColor: partner.color,
                        backgroundColor: `${partner.color}10`
                      }}
                    >
                      <span 
                        className="text-xl sm:text-2xl md:text-3xl font-bold"
                        style={{ color: partner.color }}
                      >
                        {partner.name.substring(0, 2)}
                      </span>
                    </div>
                  </div>

                  {/* Partner Name */}
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-50 mb-3 group-hover:text-white transition-colors">
                    {partner.name}
                  </h4>

                  {/* Partnership Type */}
                  <div className="mb-4">
                    <span 
                      className="inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
                      style={{ 
                        backgroundColor: `${partner.color}20`,
                        color: partner.color
                      }}
                    >
                      {partner.partnership}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 
                             transition-opacity duration-500 pointer-events-none"
                     style={{
                       background: `radial-gradient(circle at bottom right, ${partner.color}, transparent 70%)`
                     }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 
                   rounded-2xl sm:rounded-3xl border border-white/10 p-8 sm:p-10 md:p-12"
        >
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-4 sm:mb-5">
            Ready to Partner With Us?
          </h4>
          <p className="text-base sm:text-lg text-slate-300/80 mb-7 sm:mb-9 max-w-2xl mx-auto">
            Join our ecosystem of industry leaders and innovation partners to shape the future of AI together
          </p>
          
          <button
            onClick={handlePartnerClick}
            className="group inline-flex items-center justify-center gap-3 
                     px-8 sm:px-10 md:px-12 py-4 sm:py-5 
                     rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500
                     text-white font-semibold text-base sm:text-lg
                     hover:shadow-2xl hover:shadow-cyan-500/50
                     transition-all duration-300 hover:scale-105 active:scale-95
                     w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
          >
            <span>Become a Partner</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default IndustryPartnersSection;