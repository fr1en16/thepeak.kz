'use client';
import { useEffect, useState } from 'react';

export default function GridGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'g') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] h-screen w-screen swiss-grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`h-full w-full border-y bg-red-500/5 ${
            i === 6
              ? 'border-l-blue-500 border-l-[3px] border-r border-red-500/20'
              : 'border-x border-red-500/20'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_23px,rgba(255,0,0,0.1)_24px)] bg-[size:100%_24px]" />
    </div>

  );
}
