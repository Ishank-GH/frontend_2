import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
      details: '+91 98765 43210',
      subtitle: 'Mon-Sat: 10 AM - 7 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@lumens.agency',
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
    <section ref={sectionRef} id="contact" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12  lg:flex-row gap-12 items-stretch">
         <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your online presence? Let's discuss your project and 
            create something amazing together.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Contact Information */}
          <div ref={contactInfoRef}>
            <div className="bg-gradient-to-br from-blue-900 to-purple-950 rounded-2xl p-8 text-white mb-8 shadow-lg shadow-purple-900/30">
              <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
              <p className="text-blue-100 mb-8">
                We're here to help your business succeed online. Whether you need a new website, 
                want to redesign an existing one, or have questions about our services, 
                we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
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

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Why Contact Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Free consultation and project quote
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Detailed project timeline and roadmap
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Custom solutions for your business needs
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  Transparent pricing with no hidden costs
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="mt-12 lg:mt-0">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              {isSubmitted && (
                <div className="bg-blue-800/30 border border-blue-800/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium">
                      Thanks for your message! We'll get back to you within 24 hours.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white"
                  >
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

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-blue-800 focus:border-blue-800 transition-colors duration-300 text-white placeholder-gray-400"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-800 to-purple-900 text-white px-8 py-4 rounded-lg hover:from-blue-900 hover:to-purple-950 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center shadow-lg shadow-purple-900/30"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message & Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}