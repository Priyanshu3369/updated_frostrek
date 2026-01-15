import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Users, Briefcase, X, MapPin, Calendar, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import IndustryPartnersSection  from './industry.jsx';

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

// Partner institutions data
const partners = [
  {
  id: 'itm',
  name: 'ITM University Gwalior',
  logo: '/itm.png',
  location: 'Gwalior, Madhya Pradesh',
  established: '2011',
  about: 'ITM University Gwalior is a multidisciplinary university known for its strong academic reputation, innovative teaching-learning practices, and vibrant campus life. Nestled amidst lush greenery, the university provides a peaceful and inspiring environment that fosters intellectual growth, creativity, and professional excellence. With a focus on research, innovation, and industry readiness, ITM University prepares students to thrive in a rapidly evolving global landscape.',
  stats: [
    { label: 'University Type', value: 'Multidisciplinary' },
    { label: 'Campus', value: 'Green & Residential' },
    { label: 'Academic Focus', value: 'Industry-Oriented' }
  ],
  gallery: [
    { url: '/itm-1.jpeg', caption: 'AI/ML Workshop Session at ITM University Gwalior' },
    { url: '/itm-2.jpeg', caption: 'Hands-on Technical Training in Computer Labs' },
    { url: '/itm-3.jpeg', caption: 'Student Project Presentation and Evaluation' },
    { url: '/itm-4.jpeg', caption: 'Expert Mentor Interaction and Career Guidance Session' }
  ],
  collaboration: {
    duration: 'Since 2023',
    programs: [
      'AI & Machine Learning Fundamentals',
      'Data Science & Analytics Bootcamp',
      'Live Industry-Aligned Projects',
      'Technical Skill Development Programs',
      'Career Guidance & Placement Readiness Workshops'
    ],
    impact: 'Through our partnership with ITM University Gwalior, Frostrek has successfully trained over 120 students in cutting-edge AI and Machine Learning technologies. The collaboration emphasizes industry-aligned learning, enabling students to gain practical exposure, build real-world projects, and enhance their employability. Many participants have leveraged this training to secure internships and placement opportunities in leading technology-driven organizations.',
    approach: [
      'Structured hands-on training sessions',
      'Real-world project-based learning',
      'Industry mentor-led guidance and reviews',
      'Continuous assessment and performance feedback',
      'Career orientation and placement preparation support'
    ]
  }
},
  {
    id: 'rjit',
    name: 'Rustamji Institute of Technology',
    logo: '/rjit.png',
    location: 'Gwalior, Madhya Pradesh',
    established: '1996',
    about: 'Rustamji Institute of Technology (RJIT), Gwalior, is a premier engineering institution committed to delivering quality technical education. With a strong focus on industry collaboration and practical learning, RJIT prepares students to excel in rapidly evolving technology domains through innovative pedagogy and professional mentorship.',
    stats: [
      { label: 'Students Engaged', value: 'Final Year' },
      { label: 'Focus Areas', value: 'AI & Data' },
      { label: 'Training Mode', value: 'Hands-on' }
    ],
    gallery: [
      { url: '/campus-4.jpg', caption: 'Participants of the Frostrek training program with faculty members at RJIT, Gwalior' },
      { url: '/campus-6.jpg', caption: 'Industry-oriented training session in progress' },
      { url: '/campus-1.jpg', caption: 'Students working on real-world AI projects' },
      { url: '/campus-5.jpg', caption: 'Collaborative learning under professional mentorship' },
      { url: '/campus-7.jpg', caption: 'Practical problem-solving and project development' }
    ],
    collaboration: {
      duration: 'Ongoing 2024-25',
      programs: [
        'AI & Machine Learning Fundamentals',
        'Data Analytics & Engineering',
        'Product Development & Engineering',
        'Cloud Solutions & Automation',
        'Real-World Project Implementation'
      ],
      impact: 'The ongoing training program at RJIT focuses on preparing final-year students for real-world projects through practical, industry-oriented activities. Students engage in authentic scenarios under professional mentorship, strengthening their practical understanding, enhancing problem-solving abilities, and building strong industry readiness. The program effectively bridges the gap between classroom concepts and real-time applications in AI, data, and product engineering environments.',
      approach: [
        'Hands-on, practical learning sessions',
        'Real-world project assignments under mentorship',
        'Industry-oriented problem-solving activities',
        'Application of concepts to authentic scenarios',
        'Post-training project opportunities'
      ]
    }
  }
];

// Stats data
const stats = [
  { icon: GraduationCap, value: '200+', label: 'Students Trained' },
  { icon: Users, value: '2', label: 'Partner Institutions' },
  { icon: Briefcase, value: '15+', label: 'Live Projects' },
];

// Animated Background Components
const FloatingOrbs = () => {
  const orbs = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
    size: Math.random() * 80 + 40,
    color: i % 3 === 0 ? 'rgba(6,182,212,' : i % 3 === 1 ? 'rgba(99,102,241,' : 'rgba(168,85,247,',
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}${0.15 + Math.random() * 0.1}), transparent)`,
          }}
          initial={{ left: `${orb.x}%`, top: `${orb.y}%`, opacity: 0 }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedMesh = () => {
  return (
    <div className="fixed inset-0 opacity-[0.06] pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.2) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(99,102,241,0.2) 1.5px, transparent 1.5px),
            linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
        }}
        animate={{
          backgroundPosition: [
            '0px 0px, 0px 0px, 0px 0px, 0px 0px',
            '80px 80px, 80px 80px, 20px 20px, 20px 20px',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

const GlowingLines = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full"
          style={{
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(6,182,212,0.3)' : 'rgba(168,85,247,0.3)'
              }, transparent)`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Campus = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campusImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedPartner) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPartner]);

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

  const openPartnerModal = (partner) => {
    setSelectedPartner(partner);
    setGalleryIndex(0);
  };

  const closePartnerModal = () => {
    setSelectedPartner(null);
    setGalleryIndex(0);
  };

  const nextGalleryImage = () => {
    if (selectedPartner) {
      setGalleryIndex((prev) => (prev + 1) % selectedPartner.gallery.length);
    }
  };

  const prevGalleryImage = () => {
    if (selectedPartner) {
      setGalleryIndex((prev) => (prev - 1 + selectedPartner.gallery.length) % selectedPartner.gallery.length);
    }
  };

  return (
    <section className="relative px-4 sm:px-6 pt-6 pb-12 sm:pb-16 md:pb-20 bg-[#0B0B0E] text-slate-50 overflow-hidden">
      {/* Animated Background Layers */}
      <FloatingOrbs />
      <AnimatedMesh />
      <GlowingLines />

      {/* Dynamic gradient overlay */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(6,182,212,0.15) 0%, transparent 60%),
              radial-gradient(circle at 80% 60%, rgba(99,102,241,0.12) 0%, transparent 60%),
              radial-gradient(circle at 40% 80%, rgba(168,85,247,0.1) 0%, transparent 60%)
            `,
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Interactive mouse follower */}
      <motion.div
        className="fixed w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] pointer-events-none rounded-full blur-3xl opacity-10 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.6), rgba(168,85,247,0.4), transparent)',
          x: mousePos.x * 5,
          y: mousePos.y * 5,
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Diagonal light streaks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full"
            style={{
              left: `${20 + i * 25}%`,
              background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? 'rgba(6,182,212,0.4)' : 'rgba(99,102,241,0.4)'
                }, transparent)`,
              transform: 'skewX(-15deg)',
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
        <IndustryPartnersSection />
      <div className="max-w-7xl mx-auto relative z-10">
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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

        {/* Call to Action */}
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
            onClick={() => navigate("/get-in-touch")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                 bg-gradient-to-r from-cyan-500 to-indigo-500
                 text-white text-sm sm:text-base font-semibold 
                 hover:shadow-lg hover:shadow-cyan-500/50
                 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Partner With Us
          </button>
        </motion.div>

        {/* Campus Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 sm:mt-20 md:mt-24"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 
                             bg-clip-text text-transparent">
                Campus Partners
              </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300/80 max-w-2xl mx-auto px-4">
              Our trusted academic partnerships driving excellence in technical education
            </p>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden 
                         bg-white/[0.04] backdrop-blur-xl border border-white/5
                         hover:border-cyan-500/30 transition-all duration-500"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 
                             transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Location badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 
                                px-3 py-2 rounded-full bg-black/60 backdrop-blur-xl shadow-lg shadow-black/50 
                                border border-cyan-400/40">
                    <MapPin size={14} className="text-cyan-400" />
                    <span className="text-xs text-white font-semibold">{partner.location}</span>
                  </div>

                  {/* Partner Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {partner.name}
                    </h4>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar size={14} />
                      <span className="text-sm">Established {partner.established}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-sm text-slate-300/80 mb-4 line-clamp-3">
                    {partner.about}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {partner.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 rounded-xl bg-white/[0.03]
                                              border border-white/5">
                        <div className="text-lg font-bold text-cyan-300">{stat.value}</div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => openPartnerModal(partner)}
                    className="w-full px-6 py-3 rounded-full 
                             bg-gradient-to-r from-cyan-500/10 to-indigo-500/10
                             border border-cyan-500/30
                             text-cyan-300 text-sm font-semibold 
                             hover:from-cyan-500/20 hover:to-indigo-500/20
                             hover:border-cyan-500/50
                             transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Partner Detail Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closePartnerModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto
                       bg-[#0B0B0E] rounded-3xl border border-white/10
                       scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePartnerModal}
                className="sticky top-4 left-full ml-4 z-10 w-10 h-10 rounded-full
                         bg-white/10 backdrop-blur-md border border-white/20
                         flex items-center justify-center text-white
                         hover:bg-white/20 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden
                                border-2 border-cyan-500/30 flex-shrink-0">
                    <img
                      src={selectedPartner.logo}
                      alt={selectedPartner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {selectedPartner.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-cyan-400" />
                        {selectedPartner.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-cyan-400" />
                        Est. {selectedPartner.established}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-cyan-400" />
                        Partner {selectedPartner.collaboration.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-cyan-300 mb-3">About the Institution</h4>
                  <p className="text-slate-300/80 leading-relaxed">
                    {selectedPartner.about}
                  </p>
                </div>

                {/* Photo Gallery */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4">Photo Gallery</h4>
                  <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] 
                                border border-white/5 p-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={galleryIndex}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <img
                            src={selectedPartner.gallery[galleryIndex].url}
                            alt={selectedPartner.gallery[galleryIndex].caption}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Gallery Navigation */}
                      <button
                        onClick={prevGalleryImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 
                                 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md 
                                 border border-white/20 flex items-center justify-center
                                 text-white hover:bg-white/20 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={nextGalleryImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 
                                 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md 
                                 border border-white/20 flex items-center justify-center
                                 text-white hover:bg-white/20 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm">
                          {selectedPartner.gallery[galleryIndex].caption}
                        </p>
                      </div>
                    </div>

                    {/* Gallery Indicators */}
                    <div className="flex items-center justify-center gap-2 mt-3 pb-1">
                      {selectedPartner.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGalleryIndex(idx)}
                          className={`transition-all duration-300 rounded-full
                            ${idx === galleryIndex
                              ? 'w-8 h-2 bg-cyan-400'
                              : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* How Frostrek Works */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-cyan-300">
                    How Frostrek Works with {selectedPartner.name}
                  </h4>

                  {/* Programs Offered */}
                  <div>
                    <h5 className="text-md font-medium text-white mb-3">Programs Offered</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedPartner.collaboration.programs.map((program, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl
                                   bg-white/[0.03] border border-white/5"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{program}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div>
                    <h5 className="text-md font-medium text-white mb-3">Our Impact</h5>
                    <p className="text-slate-300/80 leading-relaxed p-4 rounded-xl
                                bg-white/[0.03] border border-white/5">
                      {selectedPartner.collaboration.impact}
                    </p>
                  </div>

                  {/* Our Approach */}
                  <div>
                    <h5 className="text-md font-medium text-white mb-3">Our Approach</h5>
                    <div className="space-y-2">
                      {selectedPartner.collaboration.approach.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl
                                   bg-white/[0.03] border border-white/5
                                   hover:border-cyan-500/30 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 
                                        flex items-center justify-center flex-shrink-0">
                            <span className="text-cyan-400 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-sm text-slate-300 pt-0.5">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Campus;