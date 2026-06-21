"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const maxFakeProgress = 94;

    const startFakeProgress = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= maxFakeProgress) {
            clearInterval(interval);
            return maxFakeProgress;
          }
          // Increment slower as progress gets higher
          const step = prev > 80 ? 1 : Math.floor(Math.random() * 5) + 2;
          const next = prev + step;
          return next > maxFakeProgress ? maxFakeProgress : next;
        });
      }, 70);
    };

    const finishProgress = () => {
      if (interval) clearInterval(interval);
      
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 300);
            return 100;
          }
          return prev + 3 > 100 ? 100 : prev + 3;
        });
      }, 16);
    };

    startFakeProgress();

    // Check if document is already loaded
    if (document.readyState === "complete") {
      finishProgress();
    } else {
      window.addEventListener("load", finishProgress);
    }

    // Safety timeout: hide after 6 seconds anyway to avoid getting stuck
    const safetyTimeout = setTimeout(() => {
      finishProgress();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener("load", finishProgress);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.8 }}
      className="fixed inset-0 w-full h-screen bg-brand-red z-[9999999] flex items-center justify-center overflow-hidden pointer-events-auto"
    >
      {/* Quiet luxury layout: bottom-right corner counter */}
      <div className="absolute bottom-[clamp(2rem,6vw,4rem)] right-[5%] font-sans font-bold text-white text-[clamp(4.5rem,8vw,10rem)] leading-none tracking-[-0.03em] select-none">
        {progress}
      </div>
    </motion.div>
  );
}
