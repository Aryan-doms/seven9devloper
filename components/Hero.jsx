'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Hero({ data }) {
  const { video, slides, eyebrow, heading, italic, scroll } = data;
  
  const isSlider = slides && slides.length > 0;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Auto-advance logic with reset capability
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500); // 5.5 seconds per slide allows time to read
  };

  useEffect(() => {
    if (!isSlider) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [isSlider, slides, currentIndex]);

  const paginate = (newDirection) => {
    if (!isSlider) return;
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    setCurrentIndex(newIndex);
    startTimer(); // Reset timer on manual interaction
  };

  const jumpToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    startTimer();
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        opacity: 0 // We crossfade instead of slide out for a smoother look
      };
    }
  };

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1a1a1a] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* --- BACKGROUND LAYER --- */}
      {isSlider ? (
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 1.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ken Burns Zoom Effect */}
            <motion.img
              src={typeof slides[currentIndex].slide_image === 'object' ? slides[currentIndex].slide_image.url : slides[currentIndex].slide_image}
              alt={slides[currentIndex].slide_project || "Seven9 Project"}
              className="w-full h-full object-cover object-center pointer-events-none"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* --- OVERLAYS --- */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 mix-blend-multiply flex pointer-events-none z-10"></div>

      {/* --- DESKTOP HOVER ARROWS --- */}
      {isSlider && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-all duration-500 z-30 bg-black/10 backdrop-blur-sm ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            aria-label="Previous Project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-all duration-500 z-30 bg-black/10 backdrop-blur-sm ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            aria-label="Next Project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      {/* --- TEXT CONTENT LAYER --- */}
      {isSlider ? (
        <div className="relative z-20 text-center px-6 max-w-5xl pointer-events-none flex flex-col items-center justify-center w-full h-full pt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-brand-sand/80 mb-6 md:mb-8 drop-shadow-sm"
          >
            {eyebrow}
          </motion.p>
          
          <div className="h-[220px] md:h-[250px] flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-sand font-serif leading-tight drop-shadow-md px-2"
              >
                {slides[currentIndex].slide_project}<br />
                <span className="italic font-light text-brand-sand/90 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 md:mt-4 block drop-shadow-sm">
                  {slides[currentIndex].slide_tagline}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 7, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
          className="relative z-20 text-center px-4 max-w-5xl pointer-events-none flex flex-col items-center justify-center w-full h-full pt-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase tracking-[0.3em] text-xs text-brand-sand/80 mb-8"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl text-brand-sand font-serif mb-10 leading-tight"
          >
            {heading}<br />
            <span className="italic font-light text-brand-sand/90">{italic}</span>
          </motion.h1>
        </motion.div>
      )}

      {/* --- PROGRESS DASHES (Stories Style) --- */}
      {isSlider && (
        <div className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30 px-6 w-full max-w-sm mx-auto justify-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToSlide(idx)}
              className="flex-1 h-1 md:h-1.5 rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-colors cursor-pointer group"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <motion.div 
                key={`${idx}-${currentIndex === idx ? 'active' : 'inactive'}`}
                className="h-full bg-brand-sand w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentIndex === idx ? 1 : currentIndex > idx ? 1 : 0 }}
                transition={currentIndex === idx ? { duration: 5.5, ease: "linear" } : { duration: 0 }}
              />
            </button>
          ))}
        </div>
      )}

      {/* --- SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-20"
      >
        <span className="uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-brand-sand/70 font-light drop-shadow-md">{scroll}</span>
        {/* Bouncing line on mobile, invisible spacer on desktop */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 md:h-10 bg-brand-sand/50 md:opacity-0"
        />
      </motion.div>
    </section>
  )
}
