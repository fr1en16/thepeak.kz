"use client";

import React from "react";
import { Button01 } from "@/components/ui/nextjsshop-button";
import PartnerMarquee from "./PartnerMarquee";
import SplineChart from "./SplineChart";
import RingChart from "./RingChart";
import SphereChart from "./SphereChart";

export default function Hero() {
  return (
    <section className="col-span-12 grid grid-cols-12 gap-[var(--grid-gap)] pt-[clamp(5rem,7vw,7rem)] pb-[clamp(1.5rem,3vw,3.5rem)] relative min-h-screen w-full">
      
      {/* 1. Full-Bleed Fluid Video Background (Layered at bottom, breaks out of grid margins) */}
      <div className="absolute top-0 left-0 w-[calc(100%+2*var(--page-margin))] h-full overflow-hidden -ml-[var(--page-margin)]">
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

      {/* 2. Left Column: Headline and CTA - spans columns 1-6 (ends at 50% line) */}
      <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-start text-left relative self-center">
        <h1 className="font-headline font-black text-white text-[clamp(1.15rem,3.2vw,2.88rem)] leading-[1.1] tracking-[-0.02em] uppercase mb-[clamp(1rem,2vw,2rem)]">
          <span className="block md:whitespace-nowrap lg:whitespace-nowrap">Маркетинг,</span>
          <span className="block md:whitespace-nowrap lg:whitespace-nowrap">который работает от идеи</span>
          <span className="block md:whitespace-nowrap lg:whitespace-nowrap">до готового результата</span>
        </h1>
        
        <p className="font-sans font-medium text-white/80 text-[clamp(0.875rem,1.2vw,1.25rem)] leading-relaxed mb-[clamp(1.5rem,3vw,2.5rem)]">
          Приходите к нам с задачей «сделать не как у всех». Мы создаём маркетинг, который становится референсом для других.
        </p>

        {/* CTA Button */}
        <Button01
          href="#contacts"
          text="оставить заявку"
          className="w-[200px]"
        />
      </div>

      {/* 3. Right Column: Marquee Logos Widget - spans columns 8-12 */}
      <div className="col-span-12 lg:col-start-8 lg:col-span-5 relative flex items-center justify-center min-h-[clamp(8rem,15vw,25rem)] self-center">
        <PartnerMarquee />
      </div>


      {/* 4. Bottom Row: Proportional Adaptive Grid of 3D Stats Cards - spans columns 1-12 */}
      <div className="col-span-12 grid grid-cols-12 gap-[var(--grid-gap)] mt-auto relative">


        
        {/* Card 1: 83% Retention Ring Chart - spans 4 columns */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative flex flex-row items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-[clamp(1rem,1.5vw,1.75rem)] rounded-none hover:bg-white/15 transition-all duration-300 min-h-[clamp(8rem,10vw,12rem)] shadow-sm">
          {/* 3D Canvas Box */}
          <div className="w-[clamp(5rem,7vw,7.5rem)] aspect-square flex-shrink-0 relative overflow-hidden">
            <RingChart />
          </div>
          {/* Stat Info */}
          <div className="flex flex-col justify-center text-left">
            <div className="font-headline font-black text-brand-red text-[clamp(1.2rem,2vw,2rem)] leading-none mb-1">
              83%
            </div>
            <p className="font-sans font-medium text-[clamp(0.65rem,0.8vw,0.8rem)] text-white/80 leading-snug">
              заказчиков остаются с нами на долгосрочное сотрудничество <span className="text-brand-red font-semibold">3+ лет</span>
            </p>
          </div>
        </div>

        {/* Card 2: 10+ Years History Spline Chart - spans 4 columns */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 group relative flex flex-row items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-[clamp(1rem,1.5vw,1.75rem)] rounded-none hover:bg-white/15 transition-all duration-300 min-h-[clamp(8rem,10vw,12rem)] shadow-sm">
          {/* 3D Canvas Box */}
          <div className="w-[clamp(6rem,8vw,9.5rem)] h-[clamp(5rem,7vw,7.5rem)] flex-shrink-0 relative overflow-hidden">
            <SplineChart />
          </div>
          {/* Stat Info */}
          <div className="flex flex-col justify-center text-left">
            <div className="font-headline font-black text-brand-red text-[clamp(1.2rem,2vw,2rem)] leading-none mb-1">
              10+ лет
            </div>
            <p className="font-sans font-medium text-[clamp(0.65rem,0.8vw,0.8rem)] text-white/80 leading-snug">
              опыта работы в сфере маркетинга, брендинга и цифрового развития
            </p>
          </div>
        </div>

        {/* Card 3: 150+ Projects Sphere Chart - spans 4 columns */}
        <div className="col-span-12 md:col-span-12 lg:col-span-4 group relative flex flex-row items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-[clamp(1rem,1.5vw,1.75rem)] rounded-none hover:bg-white/15 transition-all duration-300 min-h-[clamp(8rem,10vw,12rem)] shadow-sm">
          {/* 3D Canvas Box */}
          <div className="w-[clamp(5rem,7vw,7.5rem)] aspect-square flex-shrink-0 relative overflow-hidden">
            <SphereChart />
          </div>
          {/* Stat Info */}
          <div className="flex flex-col justify-center text-left">
            <div className="font-headline font-black text-brand-red text-[clamp(1.2rem,2vw,2rem)] leading-none mb-1">
              150+
            </div>
            <p className="font-sans font-medium text-[clamp(0.65rem,0.8vw,0.8rem)] text-white/80 leading-snug">
              проектов успешно реализовано для малого бизнеса и крупных компаний
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
