import React, { useLayoutEffect, useRef } from 'react';
import { MapPin, DollarSign, Users, MessageCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChoose() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Title Animation ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.why-choose-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }).from('.why-choose-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6').from('.sparkle-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(2)',
      }, '-=0.5');

      // --- Cards Staggered Reveal Animation ---
      gsap.from('.reason-card', {
        scrollTrigger: {
          trigger: '.reasons-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        rotationX: -10,
        transformOrigin: 'top center',
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });

      // --- Interactive Card Hover Animations ---
      document.querySelectorAll('.reason-card').forEach(card => {
        const icon = card.querySelector('.reason-icon');
        const statBadge = card.querySelector('.stat-badge');
        const bgGradient = card.querySelector('.bg-gradient-hover');

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(card, { 
            y: -12, 
            scale: 1.05,
            boxShadow: '0px 30px 60px -15px rgba(0,0,0,0.3)', 
            duration: 0.4, 
            ease: 'power2.out' 
          })
          .to(bgGradient, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to(icon, { 
            scale: 1.15, 
            rotate: '12deg', 
            y: -5,
            duration: 0.4, 
            ease: 'back.out(2)' 
          }, 0)
          .to(statBadge, {
            scale: 1.05,
            boxShadow: '0px 10px 20px -5px rgba(0,0,0,0.2)',
            duration: 0.4,
            ease: 'power2.out'
          }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons = [
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep understanding of Nagpur market dynamics, customer behavior, and local business challenges.',
      stat: '5+ Years Local Experience',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Transparent, competitive pricing with no hidden costs. Great value for money without compromising quality.',
      stat: '30% More Affordable',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Users,
      title: 'Custom Solutions',
      description: 'No cookie-cutter templates. Every website is uniquely designed and developed for your specific needs.',
      stat: '100% Custom Designs',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-500/10 to-violet-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'Regular updates, clear timelines, and transparent communication throughout the entire project.',
      stat: '24-48hr Response Time',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-500/10 to-amber-500/10'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Efficient project management ensures your website is delivered on time without sacrificing quality.',
      stat: '1-2 Weeks Delivery',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/10 to-pink-500/10'
    },
    {
      icon: Sparkles,
      title: 'Modern Tech Stack',
      description: 'Utilizing the latest technologies like React, Next.js, and GSAP for fast, scalable, and beautiful websites.',
      stat: 'Future-Proof Tech',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-500/10 to-blue-500/10'
    }
  ];

  return (
    <section ref={sectionRef} id="why-choose" className="py-20 relative overflow-hidden min-h-screen bg-black bg-gradient-to-br from-black via-gray-900 to-black">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="why-choose-title flex items-center justify-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Why Choose Lumens?
            </h2>
          </div>
          <p className="why-choose-subtitle text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not just another web development agency. We're your local digital partners 
            committed to your success.
          </p>
        </div>

        <div className="reasons-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="reason-card group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-8 cursor-pointer overflow-hidden"
              style={{ willChange: 'transform, box-shadow' }}
            >
              <div className={`bg-gradient-hover absolute inset-0 bg-gradient-to-br ${reason.bgColor} rounded-2xl opacity-0`}></div>
              
              <div className="relative z-10">
                <div className={`reason-icon bg-gradient-to-br ${reason.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <reason.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-100 mb-4">{reason.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{reason.description}</p>
                
                <div className={`stat-badge inline-flex items-center bg-gray-800/50 text-white px-4 py-2 rounded-full text-sm font-semibold border border-gray-700`}>
                  <span className="mr-2">{reason.stat}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
