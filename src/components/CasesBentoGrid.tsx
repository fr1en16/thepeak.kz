"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { allCasesData } from "@/data/cases";
import { formatTypography } from "@/utils/typography";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CasesBentoGridProps {
  limit?: number;
  className?: string;
}

const renderCaseLogo = (name: string) => {
  return (
    <span className="font-sans font-extrabold text-[12px] tracking-wider text-white uppercase leading-none select-none">
      {name}
    </span>
  );
};

function LazyCaseVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-black">
      <video
        src={shouldLoad ? src : undefined}
        autoPlay={shouldLoad}
        loop
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center md:hidden">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-black shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur">
          <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}

export default function CasesBentoGrid({ limit, className }: CasesBentoGridProps) {
  const cases = typeof limit === "number" ? allCasesData.slice(0, limit) : allCasesData;

  return (
    <BentoGrid className={className}>
      {cases.map((item) => {
        const isVideo = item.video || item.image?.toLowerCase().endsWith(".mp4");
        const mediaSrc = item.video || item.image;

        return (
          <div
            key={item.href}
            className={item.className}
            data-services={item.services.join(",")}
            data-industry={item.industry}
          >
            <BentoCard
              href={item.href}
              background={
                isVideo && mediaSrc ? (
                  <LazyCaseVideo src={mediaSrc} />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
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
