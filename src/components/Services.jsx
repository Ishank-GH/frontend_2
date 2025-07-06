import React, { useEffect, useRef, useState } from 'react';
import { Monitor, ShoppingCart, RefreshCw, Shield, Search, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with magnetic effect
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );

      // Services cards with morphing grid layout
      if (servicesRef.current?.children) {
        gsap.fromTo(
          servicesRef.current.children,
          { 
            y: 120, 
            opacity: 0, 
            scale: 0.7, 
            rotateY: 30, 
            filter: 'blur(10px)',
            transformOrigin: "center bottom"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: {
              each: 0.12,
              from: "start",
              grid: "auto"
            },
            ease: "expo.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 95%",
              end: "top+=200 90%",
              scrub: 1,
            },
            onComplete: () => {
              // Add hover animations after initial load
              Array.from(servicesRef.current.children).forEach((card) => {
                card.addEventListener('mouseenter', () => {
                  gsap.to(card, {
                    y: -15,
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)',
                    duration: 0.4,
                    ease: "power2.out"
                  });
                });
                
                card.addEventListener('mouseleave', () => {
                  gsap.to(card, {
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    boxShadow: '0 0 0px rgba(139, 92, 246, 0)',
                    duration: 0.4,
                    ease: "power2.out"
                  });
                });
              });
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const services = [
    {
      icon: Monitor,
      title: 'Starter Lumens',
      perfectFor: 'Small businesses needing a strong foundational online presence.',
      price: '₹15,000',
      delivery: '5-7 Days',
      features: [
        'Modern UI/UX',
        'Basic On-Page SEO Setup',
        'Essential Information & Contact Module',
        'Client Content Integration',
        'Fully Responsive for all Devices',
        '1 Round of Design Revisions.'
      ],
      keyBenefits: 'Establish your professional online footprint quickly, capture leads effectively, and make a strong first impression.'
    },
    {
      icon: ShoppingCart,
      title: 'Pro Lumens',
      perfectFor: 'Growing businesses needing expanded content & engagement.',
      price: '₹25,000',
      delivery: '10-15 Days',
      features: [
        'All Starter Features included',
        'Comprehensive Digital Profile',
        'Content Structuring',
        'Custom Lead Generation Form',
        'Basic Image Optimization',
        '2 Rounds of Revisions.'
      ],
      keyBenefits: 'Enhance your online presence with richer content and efficient lead generation capabilities.'
    },
    {
      icon: RefreshCw,
      title: 'Lumens Launchpad',
      perfectFor: 'Businesses ready for advanced features & active content publishing.',
      price: '₹50,000',
      delivery: '20-30 Days',
      features: [
        'All Pro Features included',
        'Robust Digital Platform',
        'Basic CRM Integration',
        'Email Automation Setup',
        '3 Rounds of Revisions'
      ],
      keyBenefits: 'Fully equip your business with dynamic content, lead management, and the foundation for sustained digital growth.'
    }
  ];

  // Support Packages Data
  const supportPackages = [
    {
      icon: Shield,
      title: 'Lumens Connect',
      perfectFor: 'Essential support for stable site operation.',
      price: '₹3,000 - ₹5,000/mo',
      features: [
        'Emergency Bug Fixes',
        'Regular Security Scans',
        'Uptime Monitoring',
        'Standard Support Hours',
        'Basic Platform Updates'
      ]
    },
    {
      icon: Search,
      title: 'Lumens Optimize',
      perfectFor: 'Proactive care and minor enhancements for growth.',
      price: '₹6,000 - ₹9,000/mo',
      features: [
        'All Lumens Connect Features.',
        'Faster Response Time',
        'Content Update Allocation',
        'Performance Monitoring',
        'Broken Link Monitoring'
      ]
    },
    {
      icon: Smartphone,
      title: 'Lumens Elevate',
      perfectFor: 'Comprehensive strategic support for continuous improvement.',
      price: '₹10,000+/mo',
      features: [
        'All Lumens Optimize Features',
        'Priority Support & Response',
        'Increased Content Update Allocation',
        'Monthly Performance Report',
        'SEO Health Checks',
        'Minor Feature Enhancements',
        'Annual Strategic Consultation'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive web solutions designed specifically for local businesses. 
            From concept to launch and beyond, we've got you covered.
          </p>
        </div>

        {/* Main Packages Grid */}
        <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 auto-rows-auto mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                index === 0 ? 'lg:row-span-2' : ''
              } ${index === 1 ? 'lg:col-start-2' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Floating icon */}
              <div className="relative bg-gradient-to-br from-blue-800 to-purple-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all duration-300">
                <service.icon className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-blue-300 text-sm mb-2 font-medium">{service.perfectFor}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="inline-block bg-blue-900/60 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">Starting at {service.price}</span>
                <span className="inline-block bg-purple-900/60 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full">{service.delivery} Delivery</span>
              </div>

              {/* What's Included */}
              <div className="mb-4">
                <h4 className="text-base font-semibold text-white mb-2">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-white mb-2">Key Benefits:</h4>
                <p className="text-gray-300 text-sm">{service.keyBenefits}</p>
              </div>

              {/* Footer with price and learn more button */}
              <div className="border-t border-gray-800 pt-6 relative">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {service.price}
                  </span>
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-blue-800 to-purple-900 text-white px-4 py-2 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 text-sm font-semibold shadow-lg shadow-purple-900/30 hover:scale-105"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{
                     background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                     transform: 'translateX(-100%)',
                     animation: 'shimmer 2s infinite'
                   }}>
              </div>
            </div>
          ))}
        </div>

        {/* Support Packages Section */}
        <div className="mt-10">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Ongoing Support Packages</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportPackages.map((pkg, idx) => (
              <div key={idx} className="group bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-500 relative overflow-hidden">
                {/* Icon */}
                <div className="relative bg-gradient-to-br from-blue-800 to-purple-900 w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all duration-300">
                  <pkg.icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{pkg.title}</h4>
                <p className="text-blue-300 text-xs mb-2 font-medium">{pkg.perfectFor}</p>
                <span className="inline-block bg-blue-900/60 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">{pkg.price}</span>
                <div className="mb-2">
                  <h5 className="text-base font-semibold text-white mb-2">Key Features:</h5>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}