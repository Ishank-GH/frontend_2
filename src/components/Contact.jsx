import React, { useState, useRef, useLayoutEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef(null);

  // This effect handles all the animations and is unchanged from your original code.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        }
      });

      tl.from('.contact-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      }).from('.contact-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');

      tl.from('.contact-info-col', {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6').from('.contact-form-col', {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: 'power3.out'
      }, '<');

      gsap.from('.contact-info-item', {
        scrollTrigger: {
          trigger: '.contact-info-col',
          start: 'top 70%',
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.from('.form-field', {
        scrollTrigger: {
          trigger: '.contact-form-col',
          start: 'top 70%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // This is the new, robust handleSubmit function for the Netlify setup.
  const handleSubmit = async (e) => {
    // 1. Prevent the page from reloading on form submission
    e.preventDefault();
    // 2. Set the loading state for the button
    setIsSubmitting(true);
  
    // 3. Define the API endpoint URL we set up in netlify.toml
     const proxyUrl = '/.netlify/functions/contact';
  
    try {
      // 4. Send the form data to the Netlify function using axios
      const response = await axios.post(proxyUrl, { formData });
      
      // 5. Handle a successful response from our API
      if (response.data && response.data.success) {
        toast.success("Thanks! We'll be in touch soon.", { position: "top-center" });
        // Clear the form fields
        setFormData({ name: '', email: '', phone: '', businessType: '', message: '' });
      } else {
        // Handle cases where the API returns an error message (e.g., validation)
        const errorMsg = response.data?.message || "Oops! Something went wrong.";
        toast.error(errorMsg, { position: "top-center" });
      }
    } catch (error) {
      // 6. Handle network errors or server crashes (e.g., 404, 500)
      const errorMsg = error.response?.data?.message || "Submission failed. Please try again.";
      toast.error(errorMsg, { position: "top-center" });
    } finally {
      // 7. ALWAYS set the loading state back to false, no matter what happens
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 77768 82468',
      subtitle: 'Mon-Sat: 10 AM - 7 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'lumens.agency.in@gmail.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Nagpur, Maharashtra',
      subtitle: 'Serving all of Nagpur'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Sat: 10 AM - 7 PM',
      subtitle: 'Sunday: By appointment'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden min-h-screen flex items-center bg-black bg-gradient-to-tl from-gray-900 via-black to-gray-900">
      {/* Background elements are unchanged */}
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

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 relative z-10">
         <div className="text-center mb-16">
          <h2 className="contact-title text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="contact-subtitle text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your online presence? Let's discuss your project and 
            create something amazing together.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="contact-info-col">
            <div className="bg-gradient-to-br from-blue-900 to-purple-950 rounded-2xl p-8 text-white mb-8 shadow-lg shadow-purple-900/30">
              <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
              <p className="text-blue-100 mb-8">
                We're here to help your business succeed online. Whether you need a new website, 
                want to redesign an existing one, or have questions about our services, 
                we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item flex items-start">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mr-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                      <p className="text-blue-100 font-medium">{info.details}</p>
                      <p className="text-blue-200 text-sm">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-col mt-12 lg:mt-0">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className='form-field'>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400" placeholder="Your full name" />
                  </div>
                  <div className='form-field'>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className='form-field'>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400" placeholder="your.email@example.com" />
                </div>

                <div className='form-field'>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">Business Type</label>
                  <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white">
                    <option value="">Select your business type</option>
                    <option value="retail">Retail Store</option>
                    <option value="restaurant">Restaurant/Food Service</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="professional">Professional Services</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className='form-field'>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                  <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400" placeholder="Tell us about your project..."></textarea>
                </div>

                <div className='form-field'>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-800 to-purple-900 text-white px-8 py-4 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg shadow-purple-900/30">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message & Get Free Quote
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </section>
  );
}