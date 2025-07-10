// src/components/AnimatedCursor.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // GSAP's quickTo is highly performant for this kind of animation
    const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const moveHandler = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const hoverEnterHandler = () => gsap.to(follower, { scale: 2.5, duration: 0.3 });
    const hoverLeaveHandler = () => gsap.to(follower, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", moveHandler);

    // Add hover effect to all interactive elements
    document.querySelectorAll('a, button, [data-interactive]').forEach(el => {
      el.addEventListener('mouseenter', hoverEnterHandler);
      el.addEventListener('mouseleave', hoverLeaveHandler);
    });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      document.querySelectorAll('a, button, [data-interactive]').forEach(el => {
        el.removeEventListener('mouseenter', hoverEnterHandler);
        el.removeEventListener('mouseleave', hoverLeaveHandler);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-white rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border-2 border-white rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
    </>
  );
};

export default AnimatedCursor;