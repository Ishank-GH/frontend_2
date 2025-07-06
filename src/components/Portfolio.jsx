import React, { useEffect, useRef } from 'react';
import { ExternalLink, Eye, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);

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

    // Projects cards: staggered, 3D pop, rotate, and color flicker with scrub
    if (projectsRef.current?.children) {
      gsap.fromTo(
        projectsRef.current.children,
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
            from: "center"
          },
          ease: "expo.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 1,
          },
          onStart: () => {
            // Flicker effect for the first card
            gsap.fromTo(
              projectsRef.current.children[0],
              { boxShadow: '0 0 0px #a78bfa' },
              { boxShadow: '0 0 32px #a78bfa', repeat: 2, yoyo: true, duration: 0.2, delay: 0.2 }
            );
          }
        }
      );
    }

    // CTA animation with scrub
    gsap.fromTo(ctaRef.current,
      { y: 80, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const projects = [
    {
      title: 'Coming Soon',
      category: 'Local Business Showcase',
      description: 'We\'re currently working on some amazing projects for local businesses in Nagpur. Check back soon to see our latest work!',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Web Design', 'Local Business', 'E-commerce'],
      status: 'In Development'
    },
    {
      title: 'Portfolio Coming Soon',
      category: 'Restaurant Website',
      description: 'Beautiful restaurant website with online ordering system currently being developed for a popular Nagpur restaurant.',
      image: 'https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Restaurant', 'Online Ordering', 'Mobile-First'],
      status: 'Design Phase'
    },
    {
      title: 'More Projects Soon',
      category: 'Retail Store',
      description: 'E-commerce solution for a local retail chain with inventory management and customer portal features.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['E-commerce', 'Inventory Management', 'Customer Portal'],
      status: 'Development'
    }
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            While we're building our portfolio with exciting new projects, we're committed to 
            showcasing real results for local businesses in Nagpur.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="group bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-800 to-purple-900 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg shadow-purple-900/30">
                  {project.status}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-blue-400 font-medium text-sm mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    2024
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center">
                    <span className="mr-1">Updates Soon</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Your Project Could Be Here Next
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're actively working with local businesses to create outstanding web solutions. 
            As we complete these projects, we'll showcase the results right here.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-300">Projects in Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction Goal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">2024</div>
              <div className="text-gray-300">Launch Year</div>
            </div>
          </div>
          
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-800 to-purple-900 text-white px-8 py-3 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 font-semibold inline-block transform hover:scale-105 shadow-lg shadow-purple-900/30"
          >
            Be Our Next Success Story
          </a>
        </div>
      </div>
    </section>
  );
}