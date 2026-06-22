"use client";

import React from "react";
import { Button01 } from "@/components/ui/nextjsshop-button";
import StatsBlock from "./StatsBlock";
import { formatTypography } from "@/utils/typography";

export default function HeroDuplicate() {
  const logoIds = [2, 12, 20, 21, 24, 38, 39, 40, 41, 44];
  // Duplicate logos for infinite loop
  const marqueeItems = [...logoIds, ...logoIds, ...logoIds, ...logoIds];

  const contentRef = React.useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = React.useState(0);

  React.useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCardHeight(entry.target.clientHeight);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="col-span-12 relative w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] overflow-hidden min-h-screen flex flex-col justify-between pt-[clamp(4rem,8vw,6rem)] pb-0 border-b border-brand-gray/10 select-none" id="hero-alternative">
      {/* 1. Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/bg.webm"
            type="video/webm"
          />
          <source
            src="https://dl.dropboxusercontent.com/s/tnj9qkfpdp5va13nb8f12/bg06.webm?rlkey=32ilxa7ag218eb08qkyni9qt2&st=8vhy8z75&dl=0"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Top Content Row */}
      <div className="swiss-grid w-full relative flex-grow flex items-center">
        <div className="col-span-12 text-left">
          <h1 className="font-headline font-semibold text-white text-[clamp(1.6rem,3.07vw,2.77rem)] leading-[0.92] tracking-[-0.02em] mb-8 md:mb-12">
            {/* Mobile: 4 lines; Desktop: 2 lines */}
            <span className="inverttext block md:hidden">{"Маркетинг,"}</span>
            <span className="inverttext block md:hidden">{"который работает"}</span>
            <span className="inverttext block md:hidden">{"от идеи до готового"}</span>
            <span className="inverttext block md:hidden">{"результата"}</span>
            <span className="inverttext hidden md:block">{"Маркетинг, который работает"}</span>
            <span className="inverttext hidden md:block">{"от идеи до результата"}</span>
          </h1>
          <p className="description-text text-white/80 mb-8 md:mb-[4.5rem]">
            <span className="inverttext">{formatTypography("Приходите к нам с задачей «сделать не как у всех».")}</span> <br />
            <span className="inverttext">{formatTypography("Мы создаём маркетинг, который становится референсом для других.")}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Button01
              href="#contacts"
              text={formatTypography("оставить заявку")}
              variant="light"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Background card container */}
      <div 
        className="absolute bottom-0 left-0 w-full z-0 border-t border-brand-gray/10 pointer-events-none"
        style={{
          height: cardHeight,
          backgroundColor: "rgba(232, 239, 242, 0.85)",
        }}
      />

      {/* Bottom Container: Logos + Stats Block */}
      <div ref={contentRef} className="w-full relative flex flex-col z-10 mt-auto">
        {/* Bottom Slider Row — hidden on mobile to save space */}
        <div className="swiss-grid w-full hidden sm:grid" style={{ height: '84px' }}>
          <div className="col-span-12 flex flex-row items-center h-full gap-6">
            <div className="max-w-[200px] border-r border-white/10 pr-8 flex-shrink-0 self-stretch flex items-center">
              <p className="font-headline font-bold text-white/70 uppercase text-[16px] leading-[1.2] m-0 tracking-wider text-left">
                Нам доверяют лучшие
              </p>
            </div>
            <div 
              className="relative flex-grow overflow-hidden h-full flex items-center" 
              style={{ 
                maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)', 
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' 
              }}
            >
              <div 
                className="flex items-center gap-12 w-max"
                style={{
                  animation: 'marquee-scroll-horizontal 80s linear infinite',
                }}
              >
                {marqueeItems.map((id, index) => (
                  <div key={index} className="flex-shrink-0 h-[58px] flex items-center justify-center">
                    <img
                      src={`/logo/clot-${id}.webp`}
                      alt="Partner Logo"
                      className="h-full w-auto object-contain hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                      width={125}
                      height={58}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full border-t border-brand-gray/10" />

        {/* Integrated Stats Block */}
        <StatsBlock />
      </div>
    </section>
  );
}
