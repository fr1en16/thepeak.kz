"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Glitchy404 } from "@/components/ui/glitchy-404-1";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";
import { Button01 } from "@/components/ui/nextjsshop-button";
import { formatTypography } from "@/utils/typography";
import CasesBentoGrid from "@/components/CasesBentoGrid";
import { allCasesData } from "@/data/cases";

export default function NotFound() {
  return (
    <>
      <Navigation />
      
      <div 
        className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] relative bg-[#060606] text-white"
      >
        {/* ── 404 HERO SECTION ── */}
        <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 border-b border-white/10">
          <HeroWave />
          
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto space-y-8">
            <div className="w-full">
              <Glitchy404 color="#fff" />
            </div>
            
            <h1 className="text-xl md:text-2xl font-sans font-bold tracking-widest uppercase">
              {formatTypography("Страница не найдена")}
            </h1>
            
            <p className="text-white/60 font-sans text-sm max-w-md leading-relaxed">
              {formatTypography("Похоже, вы забрели не туда. Страница, которую вы ищете, не существует или была перемещена.")}
            </p>

            <div className="pt-4">
              <Link href="/">
                <Button01 text="На главную" variant="dark" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CASES GRID SECTION ── */}
        <section className="relative px-[var(--page-margin)] py-20 z-10">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tighter uppercase mb-4">
              {formatTypography("Наши проекты")}
            </h2>
            <p className="text-white/60 font-mono text-xs uppercase tracking-widest">
              {formatTypography("Пока вы здесь, посмотрите наши кейсы:")}
            </p>
          </div>
          
          <div className="w-full">
            <CasesBentoGrid cases={allCasesData} />
          </div>
        </section>
      </div>
    </>
  );
}
