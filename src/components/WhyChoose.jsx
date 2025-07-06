import React, { useEffect, useRef } from 'react';
import { MapPin, DollarSign, Users, MessageCircle, Award, Clock, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChoose() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const reasonsRef = useRef(null);
  // const testimonialsRef = useRef(null);
  // const [activeTestimonial, setActiveTestimonial] = useState(0);

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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hexagonal grid layout animation
      if (reasonsRef.current?.children) {
        gsap.fromTo(
          reasonsRef.current.children,
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
              from: "top",
              grid: [3, 2]
            },
            ease: "expo.out",
            scrollTrigger: {
              trigger: reasonsRef.current,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
           
            },
            onComplete: () => {
              // Add interactive hover effects
              Array.from(reasonsRef.current.children).forEach((card) => {
                card.addEventListener('mouseenter', () => {
                  gsap.to(card, {
                    scale: 1.1,
                    rotateY: 10,
                    z: 50,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
                    duration: 0.4,
                    ease: "power2.out"
                  });
                });
                
                card.addEventListener('mouseleave', () => {
                  gsap.to(card, {
                    scale: 1,
                    rotateY: 0,
                    z: 0,
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

      // Testimonials carousel animation
      // gsap.fromTo(testimonialsRef.current,
      //   { y: 120, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
      //   {
      //     y: 0,
      //     opacity: 1,
      //     scale: 1,
      //     filter: 'blur(0px)',
      //     duration: 1.3,
      //     ease: "power4.out",
      //     scrollTrigger: {
      //       trigger: testimonialsRef.current,
      //       start: "top 85%",
      //       end: "bottom 20%",
      //       toggleActions: "play none none reverse"
      //     }
      //   }
      // );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [testimonials.length]);

  const reasons = [
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Deep understanding of Nagpur market dynamics, customer behavior, and local business challenges.',
      stat: '5+ Years Local Experience',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Transparent, competitive pricing with no hidden costs. Great value for money without compromising quality.',
      stat: '30% More Affordable',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Custom Solutions',
      description: 'No cookie-cutter templates. Every website is uniquely designed and developed for your specific needs.',
      stat: '100% Custom Designs',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'Regular updates, clear timelines, and transparent communication throughout the entire project.',
      stat: '24-48hr Response Time',
      color: 'from-orange-500 to-orange-600'
    },
    // {
    //   icon: Award,
    //   title: 'Proven Results',
    //   description: 'Track record of successful projects with measurable improvements in online presence and lead generation.',
    //   stat: '98% Client Satisfaction',
    //   color: 'from-yellow-500 to-yellow-600'
    // },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Efficient project management ensures your website is delivered on time without sacrificing quality.',
      stat: '1-2 Weeks Delivery',
      color: 'from-red-500 to-red-600'
    }
  ];

  // const testimonials = [
  //   {
  //     name: 'Rajesh Sharma',
  //     business: 'Sharma Electronics',
  //     location: 'Sitabuldi, Nagpur',
  //     quote: 'Lumens transformed our online presence completely. Sales increased by 40% within 3 months of launching our new website.',
  //     rating: 5,
  //     image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  //   },
  //   {
  //     name: 'Priya Deshmukh',
  //     business: 'Deshmukh Fashion Boutique',
  //     location: 'Dharampeth, Nagpur',
  //     quote: 'Professional, affordable, and truly understood our vision. The e-commerce site they built has revolutionized our business.',
  //     rating: 5,
  //     image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  //   },
  //   {
  //     name: 'Amit Patil',
  //     business: 'Patil Catering Services',
  //     location: 'Hanuman Nagar, Nagpur',
  //     quote: 'Excellent communication and support. They delivered exactly what we needed, on time and within budget.',
  //     rating: 5,
  //     image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  //   }
  // ];

  return (
    <section ref={sectionRef} id="why-choose" className="py-20 bg-black relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.3) 60deg, transparent 120deg)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Lumens?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another web development agency. We're your local digital partners 
            committed to your success.
          </p>
        </div>

        {/* Hexagonal grid layout for reasons */}
        <div ref={reasonsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" style={{ perspective: '1000px' }}>
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                clipPath: (index === 0 || index === 2 || index === 4) ? 'none' : (index % 2 === 0 ? 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)' : 'none')
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
              
              {/* Floating icon with color */}
              <div className={`bg-gradient-to-br ${reason.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                <reason.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                {reason.description}
              </p>
              
              {/* Animated stat badge */}
              <div className={`bg-gradient-to-r ${reason.color} bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block group-hover:scale-105 transition-transform duration-300`}>
                {reason.stat}
              </div>

              {/* Hover shimmer effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{
                     background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                     transform: 'translateX(-100%)',
                     animation: 'shimmer 2s infinite'
                   }}>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive testimonials carousel */}
        {/* <div ref={testimonialsRef} className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What Our Clients Say
          </h3> */}
          
          {/* Testimonial content */}
          {/* <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < activeTestimonial 
                      ? 'opacity-0 transform -translate-x-full' 
                      : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 h-full"> */}
                  {/* Profile image */}
                  {/* <div className="flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                  </div> */}
                  
                  {/* Testimonial content */}
                  {/* <div className="flex-1 text-center md:text-left"> */}
                    {/* Stars */}
                    {/* <div className="flex justify-center md:justify-start items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div> */}
                    
                    {/* Quote */}
                    {/* <blockquote className="text-xl text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote> */}
                    
                    {/* Author info */}
                    {/* <div>
                      <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                      <div className="text-blue-400 font-medium">{testimonial.business}</div>
                      <div className="text-gray-400 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          
          {/* Navigation dots */}
          {/* <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div> */}
          
          {/* Progress bar */}
          {/* <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
               style={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }}>
          </div> */}
        {/* </div> */}
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
