import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Palette, Code, Rocket, CheckCircle, RefreshCw, ChevronRight, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Timeline line animation with dynamic progress
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );

      // Process steps with interactive timeline
      if (timelineRef.current?.querySelectorAll('.process-step')) {
        const steps = timelineRef.current.querySelectorAll('.process-step');
        gsap.fromTo(
          steps,
          { 
            y: 120, 
            opacity: 0, 
            scale: 0.7, 
            rotateY: 30, 
            filter: 'blur(10px)',
            transformOrigin: "center"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: {
              each: 0.18,
              from: "start"
            },
            ease: "expo.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 89%",
              end: "top+=410 90%",
              scrub: 1,
            },
            onComplete: () => {
              // Add interactive hover effects
              steps.forEach((step, index) => {
                step.addEventListener('mouseenter', () => {
                  setActiveStep(index);
                  gsap.to(step, {
                    scale: 1.05,
                    z: 20,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                });
                
                step.addEventListener('mouseleave', () => {
                  gsap.to(step, {
                    scale: 1,
                    z: 0,
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
      color: 'from-blue-500 to-blue-600'
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
      color: 'from-purple-500 to-purple-600'
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
      color: 'from-green-500 to-green-600'
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
      color: 'from-orange-500 to-orange-600'
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
      color: 'from-red-500 to-red-600'
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
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section ref={sectionRef} id="process" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.1) 50%, transparent 60%)`,
          backgroundSize: '200px 200px',
          animation: 'slide 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A proven, transparent process that ensures your website is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
          
        </div>

        <div ref={timelineRef} className="relative">
          {/* Dynamic timeline line with progress */}
          <div className="timeline-line hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-blue-800 via-purple-800 to-blue-800 origin-top rounded-full">
            {/* Progress indicator */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full transition-all duration-1000"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-8 items-center transition-all duration-500 ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                } ${index === activeStep ? 'scale-105' : ''}`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline number with glow effect */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                  <div className={`bg-gradient-to-br ${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500 ${
                    index === activeStep ? 'scale-125 shadow-2xl' : ''
                  }`}>
                    {index <= activeStep ? (
                      <CheckCircle className="h-8 w-8" />
                    ) : (
                      index + 1
                    )}
                  </div>
                </div>

                {/* Content card with enhanced styling */}
                <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                  <div className={`bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500 relative overflow-hidden ${
                    index === activeStep ? 'border-blue-500/50 shadow-blue-500/20' : 'hover:border-gray-700'
                  }`}>
                    {/* Gradient overlay for active step */}
                    {index === activeStep && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 rounded-2xl`}></div>
                    )}
                    
                    <div className={`flex items-center mb-4 relative z-10 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className={`bg-gradient-to-br ${step.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4 shadow-lg transition-all duration-300 ${
                        index === activeStep ? 'scale-110 shadow-xl' : ''
                      }`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-blue-400 font-medium text-sm">{step.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 relative z-10">{step.description}</p>
                    
                    {/* Expandable details */}
                    <div className={`overflow-hidden transition-all duration-500 relative z-10 ${
                      index === activeStep ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-2 mb-4">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className={`flex items-center text-sm text-gray-300 ${
                            index % 2 === 0 ? 'lg:justify-end' : ''
                          }`}>
                            <div className={`w-1.5 h-1.5 bg-blue-400 rounded-full ${
                              index % 2 === 0 ? 'lg:order-2 lg:ml-3 mr-3' : 'mr-3'
                            }`}></div>
                            <span className={index % 2 === 0 ? 'lg:text-right' : ''}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mt-4 relative z-10">
                      <div className={`text-sm text-gray-400 ${index % 2 === 0 ? 'lg:order-2' : ''}`}>
                        {index <= activeStep ? 'Completed' : 'Upcoming'}
                      </div>
                      <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                        index === activeStep ? 'scale-125 text-blue-400' : ''
                      } ${index % 2 === 0 ? 'lg:order-1 rotate-180' : ''}`} />
                    </div>

                    {/* Shimmer effect for active step */}
                    {index === activeStep && (
                      <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
                           style={{
                             background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                             transform: 'translateX(-100%)',
                             animation: 'shimmer 2s infinite'
                           }}>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile number badge */}
                <div className="lg:hidden flex items-center mb-4">
                  <div className={`bg-gradient-to-br ${step.color} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4`}>
                    {index + 1}
                  </div>
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
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

