import { motion } from 'framer-motion';
import { Building2, Users, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Industry partners data
const industryPartners = [
  {
    id: 1,
    name: 'Tech Corp',
    logo: '/partner-1.png', // Replace with actual logo path
    industry: 'Technology',
    partnership: 'AI Solutions',
  },
  {
    id: 2,
    name: 'Innovation Labs',
    logo: '/partner-2.png', // Replace with actual logo path
    industry: 'Research & Development',
    partnership: 'ML Research',
  },
  {
    id: 3,
    name: 'Data Systems Inc',
    logo: '/partner-3.png', // Replace with actual logo path
    industry: 'Data Analytics',
    partnership: 'Big Data',
  },
  {
    id: 4,
    name: 'Cloud Solutions',
    logo: '/partner-4.png', // Replace with actual logo path
    industry: 'Cloud Computing',
    partnership: 'Infrastructure',
  },
  {
    id: 5,
    name: 'AI Ventures',
    logo: '/partner-5.png', // Replace with actual logo path
    industry: 'Artificial Intelligence',
    partnership: 'Deep Learning',
  },
  {
    id: 6,
    name: 'Digital Innovations',
    logo: '/partner-6.png', // Replace with actual logo path
    industry: 'Digital Transformation',
    partnership: 'Automation',
  },
];

const partnerStats = [
  { icon: Building2, value: '20+', label: 'Industry Partners' },
  { icon: Users, value: '500+', label: 'Collaborative Projects' },
  { icon: Target, value: '95%', label: 'Success Rate' },
  { icon: TrendingUp, value: '3x', label: 'Growth Impact' },
];

const IndustryPartnersSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-16 sm:mt-20 md:mt-24 mb-16 sm:mb-20 md:mb-24"
    >
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 
                         bg-clip-text text-transparent">
            Industry Partners
          </span>
        </h3>
        <p className="text-sm sm:text-base text-slate-300/80 max-w-2xl mx-auto px-4">
          Collaborating with leading organizations to drive innovation and deliver 
          cutting-edge AI solutions
        </p>
      </div>

      {/* Partner Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto"
      >
        {partnerStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl 
                     bg-white/[0.03] backdrop-blur-sm border border-white/5
                     hover:border-cyan-500/30 transition-all duration-300"
          >
            <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 text-cyan-400" />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 leading-tight">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Partners Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden 
                 bg-white/[0.04] backdrop-blur-xl border border-white/5 p-6 sm:p-8 md:p-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {industryPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="group relative"
            >
              <div className="relative aspect-square rounded-xl sm:rounded-2xl 
                           bg-white/[0.06] backdrop-blur-sm border border-white/10
                           hover:border-cyan-500/40 transition-all duration-300
                           overflow-hidden p-4 sm:p-6 flex items-center justify-center">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-indigo-500/0
                             group-hover:from-cyan-500/10 group-hover:to-indigo-500/10
                             transition-all duration-500" />
                
                {/* Logo placeholder - Replace with actual logos */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br 
                               from-cyan-500/20 to-indigo-500/20 flex items-center justify-center
                               border border-cyan-500/30">
                    <span className="text-lg sm:text-xl font-bold text-cyan-300">
                      {partner.name.substring(0, 2)}
                    </span>
                  </div>
                  {/* Replace the above div with:
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100
                             transition-opacity duration-300"
                  />
                  */}
                </div>

                {/* Hover overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent
                             opacity-0 group-hover:opacity-100 transition-all duration-300
                             flex flex-col items-center justify-end p-3 sm:p-4">
                  <p className="text-white text-xs sm:text-sm font-semibold text-center mb-1">
                    {partner.name}
                  </p>
                  <p className="text-cyan-300 text-[10px] sm:text-xs text-center">
                    {partner.partnership}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                     from-cyan-500/50 via-indigo-500/50 to-purple-500/50" />
      </motion.div>

      {/* Partnership CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mt-8 sm:mt-10 px-4"
      >
        <p className="text-sm sm:text-base text-slate-300/80 mb-4 sm:mb-6">
          Join our ecosystem of industry leaders and innovation partners
        </p>
        <button
          onClick={() => navigate('/bepartner')}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                   bg-gradient-to-r from-cyan-500/10 to-indigo-500/10
                   border border-cyan-500/30
                   text-cyan-300 text-sm sm:text-base font-semibold 
                   hover:from-cyan-500/20 hover:to-indigo-500/20
                   hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/30
                   transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Become a Partner
        </button>
      </motion.div>
    </motion.div>
  );
};

export default IndustryPartnersSection;