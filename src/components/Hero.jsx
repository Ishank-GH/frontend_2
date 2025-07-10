import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ArrowRight, Code, Zap, Smartphone, ChevronDown } from 'lucide-react';

// 1. Custom Hook for Performant Mouse Tracking (Unchanged)

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  return mousePosition;
};


// 2. Sub-Component: Interactive Background Effects\

const BackgroundFX = () => {
  const mousePosition = useMousePosition();
  const parallaxFactor = 30;

  const calcTransform = (factor) => {
    if (typeof window === 'undefined') return {};
    const x = (mousePosition.x - window.innerWidth / 2) / parallaxFactor * factor;
    const y = (mousePosition.y - window.innerHeight / 2) / parallaxFactor * factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div 
        className="absolute inset-0 transition-all duration-300" 
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }} 
      />
      <div className="absolute top-20 right-20 w-96 h-96 opacity-10 transition-transform duration-500" style={calcTransform(1)}>
        <div className="w-full h-full border border-slate-700 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute inset-8 border border-slate-600 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="absolute inset-8 border border-slate-500 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-5 transition-transform duration-500" style={calcTransform(-1)}>
        <div className="absolute left-1/4 top-0 w-px h-full bg-slate-400" />
        <div className="absolute left-2/4 top-0 w-px h-full bg-slate-400" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-slate-400" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-slate-400" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-slate-400" />
      </div>
    </div>
  );
};



// 3. The Main Hero Component (Modified)

const Hero = ({ 
  badgeText = "Your Local Digital Partner",
  headlineLines = ["Your Local Business,", "Brilliantly Online."],
  headlineCta = "We Build Websites That Win Customers.",
  subtitle = "We specialize in crafting stunning, high-performance websites for local businesses. Our affordable, results-driven solutions are designed to attract more local customers and put your brand on the map.",
  primaryButtonText = "Get a Free Quote",
  onPrimaryClick,

  animationDelay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const features = useMemo(() => [
    { icon: Code, text: 'Custom Web Design', description: 'Unique designs that fit your brand' },
    { icon: Zap, text: 'Lightning Fast', description: 'Optimized for speed and conversions' },
    { icon: Smartphone, text: 'Mobile-First Design', description: 'Looks great on all devices, from phones to desktops' }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <section 
      className="min-h-screen relative overflow-hidden bg-black bg-gradient-to-tl from-gray-900 via-black to-gray-900"
      role="banner"
      aria-label="Hero section"
    >
      <BackgroundFX />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-28 sm:px-6 lg:px-8 text-white">
        <div className="text-center max-w-6xl mx-auto">
          
          <h1 
            className={`text-6xl sm:text-7xl lg:text-8xl font-light mb-8 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-white font-thin tracking-tight">{headlineLines[0]}</span>
            <span className="block text-gray-300 font-normal tracking-wide relative">
              <span className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {headlineLines[1]}
                <span 
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400/60 via-purple-500/60 to-pink-500/60 opacity-70 transition-all ease-in-out duration-1000 ${
                    isVisible ? 'w-full delay-500' : 'w-0'
                  }`} 
                />
              </span>
            </span>
            <span className="block text-gray-400 font-extralight tracking-widest mt-2">{headlineCta}</span>
          </h1>
          
          
          <div 
            className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-xl mb-8 transition-all duration-1000 delay-400 hover:border-gray-700 hover:bg-gray-800/50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300 tracking-wide">{badgeText}</span>
          </div>

          <p 
            className={`text-lg sm:text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {subtitle}
          </p>

          <div 
            className={`flex flex-wrap justify-center gap-12 sm:gap-16 mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-4 text-gray-300 group" title={feature.description}>
                <div className="relative">
                  <feature.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
                </div>
                <span className="text-base font-medium tracking-wide">{feature.text}</span>
              </div>
            ))}
          </div>

          
          <div 
            className={`flex justify-center items-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <button 
              onClick={onPrimaryClick}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg shadow-purple-900/50"
            >
              <div className="relative flex items-center gap-3">
                <span className="tracking-wide">{primaryButtonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            
          </div>
        </div>


      </div>
    </section>
  );
};

export default Hero;