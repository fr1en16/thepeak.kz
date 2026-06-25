"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

export interface TimelineContentProps {
  as?: string;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: any;
  className?: string;
  children: React.ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
}) => {
  // Check if parent container is in view
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 });

  // Get the motion component dynamically
  const MotionComponent = (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
    >
      {children}
    </MotionComponent>
  );
};

export default TimelineContent;
