import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, Palette, Code, Rocket, CheckCircle, RefreshCw, ChevronRight, Play, Sparkles } from 'lucide-react';

export default function Process() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!stepRefs.current[activeStep]) return;
    // Animate the newly active step in
    gsap.fromTo(
      stepRefs.current[activeStep],
      { opacity: 0.7, y: 24 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power1.inOut' }
    );
  
  }, [activeStep]);

  const steps = [
    {
      icon: MessageSquare,
      title: 'Discovery & Consultation',
      description: 'We start with a detailed discussion about your business, goals, target audience, and requirements.',
      duration: '1 Day',
      details: [
        'Business analysis and goal setting',
        'Target audience identification',
        'Competitor research',
        'Technical requirements gathering',
        'Timeline and budget finalization'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Palette,
      title: 'Design & Wireframing',
      description: 'Create visual mockups and wireframes that align with your brand and provide excellent user experience.',
      duration: '1-2 Days',
      details: [
        'Brand analysis and style guide creation',
        'Wireframe development',
        'Visual design mockups',
        'Client feedback and revisions',
        'Final design approval'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10'
    },
    {
      icon: Code,
      title: 'Development & Build',
      description: 'Transform designs into a fully functional, responsive website using the latest technologies.',
      duration: '5-6 Days',
      details: [
        'Frontend development',
        'Backend functionality (if required)',
        'Content management system setup',
        'Payment integration (for e-commerce)',
        'SEO optimization'
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: RefreshCw,
      title: 'Review & Refinement',
      description: 'Thorough testing and refinement based on your feedback to ensure everything works perfectly.',
      duration: '1-2 Days',
      details: [
        'Cross-browser testing',
        'Mobile responsiveness testing',
        'Performance optimization',
        'Client review and feedback',
        'Final adjustments and polishing'
      ],
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-500/10 to-yellow-500/10'
    },
    {
      icon: Rocket,
      title: 'Launch & Go Live',
      description: 'Deploy your website to the live server and ensure everything runs smoothly.',
      duration: '1 Day',
      details: [
        'Domain and hosting setup',
        'Website deployment',
        'SSL certificate installation',
        'Google Analytics setup',
        'Search engine submission'
      ],
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-500/10 to-rose-500/10'
    },
    {
      icon: CheckCircle,
      title: 'Support & Maintenance',
      description: 'Ongoing support to keep your website secure, updated, and performing optimally.',
      duration: 'Ongoing',
      details: [
        'Regular security updates',
        'Performance monitoring',
        'Content updates assistance',
        'Technical support',
        'Monthly performance reports'
      ],
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10'
    }
  ];

  return (
    <section ref={sectionRef} id="process" className="py-20 relative overflow-hidden min-h-screen bg-black bg-gradient-to-tl from-gray-900 via-black to-gray-900">
      {/* === UNIFIED BACKGROUND START === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* === UNIFIED BACKGROUND END === */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef} 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Our Process
            </h2>
            <Sparkles className="h-8 w-8 text-purple-400 ml-2 animate-pulse delay-500" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            A proven, transparent process that ensures your website is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto bg-gray-800/50 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Enhanced timeline line */}
          <div className="timeline-line hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-1 origin-top rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-cyan-600/30 rounded-full"></div>
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 rounded-full transition-all duration-1000 shadow-lg"
              style={{ 
                height: `${((activeStep + 1) / steps.length) * 100}%`,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            ></div>
          </div>
          
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={el => stepRefs.current[index] = el}
                className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                } ${
                  isVisible ? '' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  perspective: '1000px',
                }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Enhanced timeline number */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
                  <div className={`relative bg-gradient-to-br ${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-2xl transition-all duration-500 ${
                    index === activeStep ? 'scale-125 shadow-blue-500/50' : 'scale-100'
                  }`}>
                    {index <= activeStep ? (
                      <CheckCircle className="h-8 w-8 animate-pulse" />
                    ) : (
                      <span className="relative z-10">{index + 1}</span>
                    )}
                    
                    {/* Glow effect */}
                    {index === activeStep && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Enhanced content card */}
                <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                  <div className={`relative backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border rounded-2xl p-8 shadow-2xl transition-all duration-500 overflow-hidden group ${
                    index === activeStep 
                      ? 'border-blue-500/50 shadow-blue-500/20 scale-105' 
                      : 'border-gray-700/50 hover:border-gray-600/50 hover:scale-102'
                  }`}>
                    
                    {/* Dynamic background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl transition-opacity duration-500 ${
                      index === activeStep ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`flex items-center mb-6 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <div className={`bg-gradient-to-br ${step.color} w-14 h-14 rounded-xl flex items-center justify-center mr-4 shadow-lg transition-all duration-300 ${
                          index === activeStep ? 'scale-110 shadow-xl' : ''
                        }`}>
                          <step.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                          <span className="text-blue-400 font-semibold text-sm bg-blue-400/10 px-2 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                      
                      {/* Enhanced expandable details */}
                      <div className={`overflow-hidden transition-all duration-700 ${
                        index === activeStep ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                          <ul className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className={`flex items-center text-sm text-gray-300 ${
                                index % 2 === 0 ? 'lg:justify-end' : ''
                              }`}>
                                <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full ${
                                  index % 2 === 0 ? 'lg:order-2 lg:ml-3 mr-3' : 'mr-3'
                                } animate-pulse`}></div>
                                <span className={`${index % 2 === 0 ? 'lg:text-right' : ''} font-medium`}>
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className={`flex items-center justify-between mt-6 ${
                        index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                      }`}>
                        <div className={`flex items-center text-sm font-medium ${
                          index <= activeStep ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            index <= activeStep ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                          }`}></div>
                          {index <= activeStep ? 'Completed' : 'Upcoming'}
                        </div>
                        <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                          index === activeStep ? 'scale-125 text-blue-400' : 'text-gray-400'
                        } ${index % 2 === 0 ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Animated border glow */}
                    {index === activeStep && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse"></div>
                    )}

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none shimmer-bg"></div>
                  </div>
                </div>

                {/* Mobile number badge */}
                <div className="lg:hidden flex items-center mb-4">
                  <div className={`bg-gradient-to-br ${step.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm mr-4 shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

          50% { transform: translateY(-20px); }
        }
        
        .shimmer-bg {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </section>
  );
}