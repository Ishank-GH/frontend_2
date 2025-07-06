import React, { useEffect, useRef } from 'react';
import { Lightbulb, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  

  const services = [
    'Website Design & Development',
    'E-commerce Solutions',
    'Website Redesign',
    'Maintenance & Support',
    'SEO Optimization',
    'Mobile-First Design'
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-choose' },
    { name: 'Our Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer ref={footerRef} className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-800 to-purple-900 p-2 rounded-lg shadow-lg shadow-purple-900/30">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Lumens</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering local businesses in Nagpur with modern, effective websites. We create 
                digital solutions that help SMEs thrive in the competitive online landscape.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>hello@lumens.agency</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>Nagpur, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
              <ul className="space-y-2 text-gray-300">
                {services.map((service, index) => (
                  <li key={index} className="hover:text-blue-400 transition-colors duration-300">
                    <a href="#services" className="text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                {quickLinks.map((link, index) => (
                  <li key={index} className="hover:text-blue-400 transition-colors duration-300">
                    <a href={link.href} className="text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Lumens Web Development Agency. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for local businesses in Nagpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}