import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);

  // Hide navbar on scroll down, show on scroll up 
   useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 0) {
        gsap.to(headerRef.current, { y: '-130%', duration: 1.1, ease: 'easeInOut' });
      } else {
        gsap.to(headerRef.current, { y: '0%', duration: 1.1, ease: 'easeInOut' });
      }
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  
  const menuItems = [
    { href: '#services', label: 'Services' },
    { href: '#why-choose', label: 'Why Choose Us' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
       className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-2xl bg-black/50 backdrop-blur-lg border border-white/10 shadow-lg"
    >
      <div className="flex justify-between items-center py-3 px-4 sm:px-6">
        <a href="#" className="flex items-center space-x-2 flex-shrink-0">
         
          <img src="/Lumens.png" alt="Lumens Logo" className="h-11 bg-cover" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group text-sm font-semibold tracking-wide"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/40"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
       <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-200 hover:text-white transition-colors duration-300 z-10"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

     
       <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <nav className="flex flex-col items-center space-y-4 pt-2 pb-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-200 text-lg font-medium hover:text-white transition-colors px-4 py-2"
              onClick={handleLinkClick} // Close menu on click
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 mt-4 rounded-lg font-semibold text-lg"
            onClick={handleLinkClick} // Close menu on click
          >
            Get Quote
          </a>
        </nav>
      </div>
    </header>
  );
}