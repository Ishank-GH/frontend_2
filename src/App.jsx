import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedCursor from './components/AnimatedCursor'

function App() {
  return (
    
    <div className="min-h-screen">
       <AnimatedCursor />
      <main style={{ cursor: 'none' }}>
      <Header />
      <Hero />
      {/* <About /> */}
      <Services />
      <Process />
      <WhyChoose />
      {/* <Portfolio /> */}
      <Contact />
      {/* <Footer /> */}
      </main>
    </div>
  );
}

export default App;