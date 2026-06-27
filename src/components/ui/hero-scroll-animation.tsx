"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import React, {
  forwardRef,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";

interface AnimatedSectionProps {
  animate: boolean;
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
}

interface HeroScrollAnimationProps {
  cover: React.ReactNode;
  second: React.ReactNode;
}

const LARGE_SCREEN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribeToMotionPreference(onChange: () => void) {
  const mediaQuery = window.matchMedia(LARGE_SCREEN_QUERY);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia(LARGE_SCREEN_QUERY).matches;
}

function useLargeScreenMotion() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, () => false);
}

function CoverSection({
  animate,
  children,
  scrollYProgress,
}: AnimatedSectionProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      data-hero-scroll-section="cover"
      style={animate ? { scale, rotate } : undefined}
      className="relative z-0 origin-center lg:sticky lg:top-0 lg:min-h-screen lg:will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function SecondSection({ animate, children, scrollYProgress }: AnimatedSectionProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div
      data-hero-scroll-section="second"
      style={animate ? { scale, rotate } : undefined}
      className="relative z-10 origin-top lg:will-change-transform"
    >
      {children}
    </motion.div>
  );
}

const HeroScrollAnimation = forwardRef<HTMLDivElement, HeroScrollAnimationProps>(
  ({ cover, second }, forwardedRef) => {
    const container = useRef<HTMLDivElement>(null);
    const shouldAnimate = useLargeScreenMotion();
    const setContainerRef = useCallback(
      (node: HTMLDivElement | null) => {
        container.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start start", "start -100vh"],
    });

    return (
      <div
        ref={setContainerRef}
        className="relative isolate col-span-12 w-full bg-[#06060e] [perspective:1200px] before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[#06060e] before:content-['']"
      >
        <CoverSection animate={shouldAnimate} scrollYProgress={scrollYProgress}>
          {cover}
        </CoverSection>
        <SecondSection animate={shouldAnimate} scrollYProgress={scrollYProgress}>
          {second}
        </SecondSection>
      </div>
    );
  },
);

HeroScrollAnimation.displayName = "HeroScrollAnimation";

export default HeroScrollAnimation;
