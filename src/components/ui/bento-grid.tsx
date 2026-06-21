import { ReactNode, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[280px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  background,
  logo,
  type,
  text,
  href,
  tiltFactor = 12,
  perspective = 1000,
  transitionDuration = 0.2,
  hoverScale = 1.03,
  glareEffect = true,
  glareIntensity = 0.4,
  glareSize = 70,
}: {
  className?: string;
  background: ReactNode;
  logo: ReactNode;
  type: string;
  text: string;
  href?: string;
  tiltFactor?: number;
  perspective?: number;
  transitionDuration?: number;
  hoverScale?: number;
  glareEffect?: boolean;
  glareIntensity?: number;
  glareSize?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || !isHovered) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
      setMousePosition({ x, y });
      const tiltX = -(y / 50) * tiltFactor;
      const tiltY = (x / 50) * tiltFactor;
      setTiltValues({ x: tiltX, y: tiltY });
    },
    [isHovered, tiltFactor]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltValues({ x: 0, y: 0 });
  }, []);

  const glareX = mousePosition.x / 2 + 50;
  const glareY = mousePosition.y / 2 + 50;

  const cardContent = (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative w-full h-full select-none cursor-pointer",
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{ scale: isHovered ? hoverScale : 1 }}
      transition={{ duration: transitionDuration, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden border border-brand-gray/10 bg-black rounded-none"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
          boxShadow: isHovered
            ? "0 20px 40px -10px rgba(0, 0, 0, 0.4)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: transitionDuration, ease: "easeOut" }}
      >
        {/* Background container */}
        <div className="absolute inset-0 z-0">
          {background}
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 z-10 transition-opacity duration-300 group-hover:from-black/55 group-hover:to-black/90" />
        </div>

        {/* Top row */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4">
          <div className="mix-blend-difference select-none pointer-events-none">
            {logo}
          </div>
          <span className="text-[10px] font-sans font-semibold text-white uppercase tracking-wide select-none mix-blend-difference pointer-events-none">
            {type}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6 flex flex-col justify-end">
          <p className="font-sans font-normal text-[13px] leading-relaxed text-white select-none mix-blend-difference pointer-events-none">
            {text}
          </p>
        </div>

        {/* Glare effect */}
        {glareEffect && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareIntensity}) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: transitionDuration }}
          />
        )}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
