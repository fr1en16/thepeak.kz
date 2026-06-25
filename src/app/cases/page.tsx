"use client";

import React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { formatTypography } from "@/utils/typography";
import { ArrowLeft } from "lucide-react";
import CasesBentoGrid from "@/components/CasesBentoGrid";

const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "180px 180px",
};

export default function CasesCatalogPage() {
  return (
    <>
      <Navigation />
      <div className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] min-h-screen relative overflow-hidden" style={{ backgroundColor: "#060606", color: "#ffffff" }}>
        {/* Шумовой слой */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-50" style={GRAIN_STYLE} />

        {/* HEADER */}
        <header className="px-[var(--page-margin)] pt-24 pb-12 border-b border-white/10 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono mb-8 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Назад на главную
          </Link>
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter uppercase mb-4">
            {formatTypography("Кейсы")}
          </h1>
          <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-xl">
            Проекты, разработанные нашей командой: от комплексного SMM до масштабного видеопроизводства.
          </p>
        </header>

        {/* СЕТКА ПРОЕКТОВ */}
        <section className="relative px-[var(--page-margin)] py-16 bg-[#060606] border-b border-white/10 z-10">
          <div className="w-full">
            <CasesBentoGrid className="auto-rows-[260px] md:auto-rows-[300px]" />
          </div>
        </section>
      </div>
    </>
  );
}
