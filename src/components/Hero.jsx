import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Spline background, not blocking scroll */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <Spline
          scene="https://prod.spline.design/OPYMbgkTpeSC0ADs/scene.splinecode"
          style={{ width: '100%', height: '134vh', minHeight: '600px' }}
        />
      </div>
      {/* Content overlay */}
    </section>
  );
}