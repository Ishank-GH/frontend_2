import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedCursor from './components/AnimatedCursor';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <AnimatedCursor />
        <Header />
        <main style={{ cursor: 'none' }}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Process />
                <WhyChoose />
                {/* <Portfolio /> */}
              </>
            } />
            <Route path="/contact" element={<Contact />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;