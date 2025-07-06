import React, { useEffect, useRef } from 'react';
import { Target, Heart, Shield, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    // Title animation with scrub
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

    // Story section animation with scrub
    gsap.fromTo(storyRef.current,
      { x: -120, opacity: 0, filter: 'blur(8px)' },
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );

    // Mission box animation with scrub
    gsap.fromTo(missionRef.current,
      { x: 120, opacity: 0, scale: 0.8, filter: 'blur(8px)' },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );

    // Values cards stagger animation with scrub and 3D pop
    if (valuesRef.current?.children) {
      gsap.fromTo(
        valuesRef.current.children,
        { y: 120, opacity: 0, scale: 0.7, rotateY: 30, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: {
            each: 0.18,
            from: "top +=300"
          },
          ease: "expo.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 90%",
            end: "bottom 85%",
            scrub: 1,
          },
          onStart: () => {
            // Flicker effect for the first card
            gsap.fromTo(
              valuesRef.current.children[0],
              { boxShadow: '0 0 0px #a78bfa' },
              { boxShadow: '0 0 32px #a78bfa', repeat: 2, yoyo: true, duration: 0.2, delay: 0.2 }
            );
          }
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const values = [
    {
      icon: Target,
      title: 'Local Focus',
      description: 'Deep understanding of Nagpur business landscape and community needs.'
    },
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Genuinely committed to helping local businesses thrive in the digital world.'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Clear communication, honest pricing, and no hidden surprises.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We measure our impact by your growth.'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            About Lumens
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Founded with a mission to bridge the digital gap for local businesses, 
            we're your trusted partner in creating an impactful online presence.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-16">
          <div ref={storyRef}>
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <p className="text-lg text-gray-300 mb-6">
              Lumens was born from a simple observation: many talented local businesses in Nagpur 
              lacked the digital presence they deserved. We saw incredible services, products, and 
              craftsmanship being overlooked simply because these businesses weren't visible online.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              This led to the 
              creation of Lumens – A Web Development Agency dedicated exclusively to empowering 
              local businesses.
            </p>
            <div className="bg-gradient-to-r from-blue-900 to-purple-950 text-white p-6 rounded-lg shadow-lg shadow-purple-900/30">
              <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
              <p className="text-blue-100">
                To democratize digital success by providing World-Class Web Solutions that 
                are accessible, affordable, and tailored specifically for local businesses 
                in Nagpur and surrounding areas.
              </p>
            </div>
          </div>
          
          <div ref={missionRef} className="mt-12 lg:mt-0">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">Why Local Matters</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-300">
                    <strong className="text-white">Community Understanding:</strong> We know the local market, culture, and customer behavior patterns.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-300">
                    <strong className="text-white">Personal Relationships:</strong> Face-to-face meetings and ongoing support when you need it.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-300">
                    <strong className="text-white">Economic Impact:</strong> Supporting local businesses strengthens our entire community.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-blue-800 to-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}