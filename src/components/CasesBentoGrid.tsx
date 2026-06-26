"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { allCasesData } from "@/data/cases";
import type { CaseItem } from "@/data/cases";
import { cn } from "@/lib/utils";
import { formatTypography } from "@/utils/typography";
import { useEffect, useRef, useState } from "react";

interface CasesBentoGridProps {
  limit?: number;
  className?: string;
  cases?: CaseItem[];
  preserveSpans?: boolean;
}

const renderCaseLogo = (name: string) => {
  return (
    <span className="font-sans font-extrabold text-[12px] tracking-wider text-white uppercase leading-none select-none">
      {name}
    </span>
  );
};

function LazyCaseVideo({ alt, poster, src }: { alt: string; poster?: string; src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
        setShouldPlay(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { rootMargin: "120px 0px", threshold: [0, 0.2] },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad) {
      return;
    }

    video.muted = true;
    video.playsInline = true;

    if (!shouldPlay) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [shouldLoad, shouldPlay]);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-black">
      {poster && (
        <img
          src={poster}
          alt={alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover opacity-85 transition-[opacity,transform] duration-300 ease-out group-hover:scale-105",
            isPlaying && "opacity-0",
          )}
          loading="lazy"
          decoding="async"
        />
      )}
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        autoPlay={shouldPlay}
        loop
        muted
        playsInline
        preload="none"
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-105",
          poster && !isPlaying ? "opacity-0" : "opacity-85",
        )}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default function CasesBentoGrid({
  limit,
  className,
  cases: casesProp,
  preserveSpans = true,
}: CasesBentoGridProps) {
  const sourceCases = casesProp ?? allCasesData;
  const cases = typeof limit === "number" ? sourceCases.slice(0, limit) : sourceCases;

  return (
    <BentoGrid className={className}>
      {cases.map((item, index) => {
        const isVideo = item.video || item.image?.toLowerCase().endsWith(".mp4");
        const mediaSrc = item.video || item.image;
        const imageLoading = index < 3 ? "eager" : "lazy";

        return (
          <div
            key={item.href}
            className={preserveSpans ? item.className : "col-span-1"}
            data-services={item.services.join(",")}
            data-industry={item.industry}
          >
            <BentoCard
              href={item.href}
              background={
                isVideo && mediaSrc ? (
                  <LazyCaseVideo alt={item.name} poster={item.poster} src={mediaSrc} />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={imageLoading}
                    fetchPriority={index < 3 ? "low" : "auto"}
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full bg-black" />
                )
              }
              logo={renderCaseLogo(item.name)}
              type={item.type}
              text={formatTypography(item.text)}
            />
          </div>
        );
      })}
    </BentoGrid>
  );
}
