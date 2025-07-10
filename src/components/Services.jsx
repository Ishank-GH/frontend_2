import React, { useLayoutEffect, useRef } from 'react';
import { Monitor, ShoppingCart, RefreshCw, Shield, Search, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Animate Background Elements ---
      gsap.to(".animate-float", {
        y: (i) => (i % 2 === 0 ? -20 : 20),
        x: (i) => (i % 2 === 0 ? 15 : -15),
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".animate-pulse", {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // --- Main Section Animation Timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
      });

      // Animate Title and Subtitle
      tl.from(".service-title-h2, .service-title-p", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Animate Main Service Cards
      tl.from(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Animate Support Packages Section
      const supportTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".support-packages-section",
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      supportTl.from(".support-title-h3, .support-title-p", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      }).from(".support-card", {
        opacity: 0,
        y: 50,
        scale: 0.98,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.4)",
      }, "-=0.4");

      // --- Interactive Card Hover Animations ---
      document.querySelectorAll('.service-card, .support-card').forEach(card => {
        const hoverTimeline = gsap.timeline({ paused: true });
        
        hoverTimeline
          .to(card, { 
            y: -10, 
            scale: 1.03,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            borderColor: card.classList.contains('service-card') ? 'rgba(59, 130, 246, 0.5)' : 'rgba(168, 85, 247, 0.5)',
            duration: 0.4, 
            ease: 'power2.out' 
          })
          .to(card.querySelector('.card-icon-container'), { scale: 1.1, duration: 0.4, ease: 'back.out(1.7)' }, 0)
          .to(card.querySelector('.card-icon'), { scale: 1.2, rotate: '-10deg', duration: 0.4, ease: 'back.out(1.7)' }, 0)
          .to(card.querySelector('.card-glow-overlay'), { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0)
          .to(card.querySelector('.shimmer-effect'), {
              opacity: 1,
              x: '200%',
              duration: 1.5,
              ease: 'power2.out',
            }, 0);


        card.addEventListener('mouseenter', () => hoverTimeline.play());
        card.addEventListener('mouseleave', () => hoverTimeline.reverse());
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Monitor,
      title: 'Starter Lumens',
      perfectFor: 'Small businesses needing a strong foundational online presence.',
      price: '₹15,000',
      delivery: '5-7 Days',
      features: [
        'Modern UI/UX Design',
        'Basic On-Page SEO Setup',
        'Contact & Info Module',
        'Content Integration',
        'Fully Responsive',
        '1 Round of Revisions'
      ],
      keyBenefits: 'Establish your professional online footprint quickly and make a strong first impression.'
    },
    {
      icon: ShoppingCart,
      title: 'Pro Lumens',
      perfectFor: 'Growing businesses needing expanded content & engagement.',
      price: '₹25,000',
      delivery: '10-15 Days',
      features: [
        'All Starter Features',
        'Comprehensive Digital Profile',
        'Content Structuring',
        'Custom Lead Generation',
        'Image Optimization',
        '2 Rounds of Revisions'
      ],
      keyBenefits: 'Enhanced online presence with richer content and efficient lead generation capabilities.'
    },
    {
      icon: RefreshCw,
      title: 'Lumens Launchpad',
      perfectFor: 'Businesses ready for advanced features & active content publishing.',
      price: '₹50,000',
      delivery: '20-30 Days',
      features: [
        'All Pro Features',
        'Robust Digital Platform',
        'Basic CRM Integration',
        'Email Automation Setup',
        'Advanced Analytics',
        '3 Rounds of Revisions'
      ],
      keyBenefits: 'Complete digital solution with dynamic content, lead management, and sustained growth foundation.'
    }
  ];

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
        'All Lumens Connect Features',
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
        'Increased Content Updates',
        'Monthly Performance Report',
        'SEO Health Checks',
        'Features Enhancement'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 relative overflow-hidden min-h-screen bg-black bg-gradient-to-br from-black via-gray-900 to-black">
      {/* === UNIFIED BACKGROUND START === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* === UNIFIED BACKGROUND END === */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-16 sm:mb-20 px-4">
          <div className="relative inline-block">
            <h2 className="service-title-h2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-4 sm:mb-6 leading-tight">
              Our Services
            </h2>
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl rounded-lg opacity-75"></div>
          </div>
          <p className="service-title-p text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
            Comprehensive web solutions designed specifically for local businesses. 
            From concept to launch and beyond, we've got you covered.
          </p>
        </div>
        {/* Main Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-20 sm:mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-colors duration-300 relative overflow-hidden ${
                index === 2 ? 'md:col-span-2 lg:col-span-2 lg:max-w-4xl lg:mx-auto' : ''
              }`}
              style={{
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
                willChange: 'transform, box-shadow, border-color'
              }}
            >
              <div className="card-glow-overlay absolute inset-0 bg-gradient-to-br from-blue-800/20 via-purple-900/20 to-pink-800/20 opacity-0 transition-opacity duration-700 rounded-2xl sm:rounded-3xl"></div>
              
              <div className="card-icon-container relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-2xl shadow-purple-900/50">
                <service.icon className="card-icon h-6 w-6 sm:h-8 sm:w-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-400/50 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors duration-500 leading-tight">
                {service.title}
              </h3>
              <p className="text-blue-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 font-medium leading-relaxed">{service.perfectFor}</p>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-900/80 to-blue-800/80 text-blue-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-700/30">Starting at {service.price}</span>
                <span className="inline-block bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-purple-200 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-700/30">{service.delivery} Delivery</span>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  What's Included:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-gray-300">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 sm:mr-4 mt-2 sm:mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Key Benefits:
                </h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{service.keyBenefits}</p>
              </div>
              
              <div className="border-t border-gray-700/50 pt-4 sm:pt-6 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                  <span className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    {service.price}
                  </span>
                  <a
                    href="#contact"
                    className="get-started-btn bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl shadow-purple-900/50 hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
                  >
                    <span className="relative z-10">Get Started</span>
                  </a>
                </div>
              </div>

              <div className="shimmer-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 -translate-x-full pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Support Packages Section */}
        <div className="mt-20 support-packages-section">
          <div className="text-center mb-16">
            <h3 className="support-title-h3 h-14 text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text mb-1">
              Ongoing Support Packages
            </h3>
            <p className="support-title-p text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Keep your website running smoothly with our comprehensive support plans
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportPackages.map((pkg, idx) => (
              <div key={idx} className="support-card bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 transition-colors duration-300 relative overflow-hidden" style={{boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)', willChange: 'transform, box-shadow, border-color'}}>
                <div className="card-glow-overlay absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-900/20 to-pink-800/20 opacity-0 transition-opacity duration-700 rounded-3xl"></div>
                
                <div className="card-icon-container relative bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-purple-900/50">
                  <pkg.icon className="card-icon h-7 w-7 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 to-blue-400/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">{pkg.title}</h4>
                <p className="text-purple-300 text-sm md:text-base mb-4 font-medium leading-relaxed">{pkg.perfectFor}</p>
                <span className="inline-block bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-purple-200 text-sm font-semibold px-4 py-2 rounded-full border border-purple-700/30 mb-6">{pkg.price}</span>
                
                <div className="mb-4">
                  <h5 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Key Features:
                  </h5>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm md:text-base text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4 mt-2.5 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shimmer-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 -translate-x-full pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}