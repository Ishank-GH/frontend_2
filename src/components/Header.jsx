import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  // timeoutId removed

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 0) {
        // Animate navbar out (up)
        gsap.to(headerRef.current, {
          y: '-130%',
          duration: 0.5,
          ease: 'power3.inOut',
        });
        setShowNavbar(false);
      } else {
        // Animate navbar in (down)
        gsap.to(headerRef.current, {
          y: '0%',
          duration: 0.5,
          ease: 'power3.inOut',
        });
        setShowNavbar(true);
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
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

// No header, logo, or nav animation


  const menuItems = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#why-choose', label: 'Why Choose Us' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={"fixed top-[10px] left-1/2 -translate-x-1/2 z-50 w-[70vw] rounded-full bg-black shadow-lg px-4 sm:px-6 lg:px-8"}
      style={{ paddingTop: 5 }}
    >
      <div className="flex justify-between items-center py-1">
        <div ref={logoRef} className="flex items-center space-x-2">
          <img src="../public/Lumens_Logo.png" alt="" className="h-20 bg-cover" />
        </div>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group text-lg"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-800 to-purple-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-800 to-purple-900 text-white px-6 py-3 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/30"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 transition-colors duration-300"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 rounded-b-2xl">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-800 to-purple-900 text-white px-6 py-2 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}