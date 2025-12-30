import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

// Campus training images data
const campusImages = [
  {
    url: '/campus-1.jpg',
    title: 'AI Training Workshop at RJIT',
    description: 'Students engaging in hands-on AI/ML training sessions',
  },
  {
    url: '/campus-2.jpg',
    title: 'Live Project Implementation',
    description: 'Real-world project development with industry mentors',
  },
  {
    url: '/campus-3.jpg',
    title: 'ITM University Lab Session',
    description: 'Industry-assisted computer lab in action',
  },
  {
    url: '/campus-4.jpg',
    title: 'Student Collaboration',
    description: 'Team-based learning and problem solving',
  },
  {
    url: '/campus-5.jpg',
    title: 'Technical Mentorship',
    description: 'One-on-one guidance from industry experts',
  },
];

// Stats data
const stats = [
  { icon: GraduationCap, value: '200+', label: 'Students Trained' },
  { icon: Users, value: '2', label: 'Partner Institutions' },
  { icon: Briefcase, value: '15+', label: 'Live Projects' },
];

const Campus = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();
  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campusImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % campusImages.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + campusImages.length) % campusImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-[#0B0B0E] text-slate-50 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(109,40,217,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4 px-2">
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 
                           bg-clip-text text-transparent">
              Campus Training Programs
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto px-4">
            Bridging the gap between academia and industry through hands-on training,
            live projects, and real-world AI implementation
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] backdrop-blur-sm
                         border border-white/5"
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

        {/* Image Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-xl
                     border border-white/5 p-1 sm:p-2"
        >
          {/* Main Image Container */}
          <div
            className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img
                  src={campusImages[currentIndex].url}
                  alt={campusImages[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Navigation Arrows - Hidden on very small screens, visible on SM+ */}
            <button
              onClick={goToPrevious}
              className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 
                       w-10 h-10 md:w-12 md:h-12 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20
                       items-center justify-center text-white
                       hover:bg-white/20 transition-all duration-300
                       hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 
                       w-10 h-10 md:w-12 md:h-12 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20
                       items-center justify-center text-white
                       hover:bg-white/20 transition-all duration-300
                       hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Caption Overlay - Responsive text sizes */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <motion.h3
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-2 
                         line-clamp-2"
              >
                {campusImages[currentIndex].title}
              </motion.h3>
              <motion.p
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2"
              >
                {campusImages[currentIndex].description}
              </motion.p>
            </div>

            {/* Swipe Hint for Mobile (shows briefly on first load) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       pointer-events-none"
            >
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <ChevronLeft size={16} />
                <span>Swipe</span>
                <ChevronRight size={16} />
              </div>
            </motion.div>
          </div>

          {/* Thumbnail Indicators - Smaller on mobile */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 px-2 sm:px-4 pb-2">
            {campusImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full
                  ${index === currentIndex
                    ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-cyan-400'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action - Responsive button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8 sm:mt-10 md:mt-12 px-4"
        >
          <p className="text-sm sm:text-base text-slate-300/80 mb-4 sm:mb-6">
            Interested in bringing industry-aligned AI training to your institution?
          </p>
          <button 
            onClick={() => navigate('/get-in-touch')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                           bg-gradient-to-r from-cyan-500 to-indigo-500
                           text-white text-sm sm:text-base font-semibold 
                           hover:shadow-lg hover:shadow-cyan-500/50
                           transition-all duration-300 hover:scale-105 active:scale-95">
            Partner With Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Campus;