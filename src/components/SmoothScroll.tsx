"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    peakLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const prefersNativeScroll =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersNativeScroll) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      stopInertiaOnNavigate: true,
    });

    window.peakLenis = lenis;

    // Create a ResizeObserver to update Lenis scroll bounds when body height changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    let rafId = 0;

    // Handle scroll events or integration with other libraries if needed
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      cancelAnimationFrame(rafId);

      if (window.peakLenis === lenis) {
        delete window.peakLenis;
      }

      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
