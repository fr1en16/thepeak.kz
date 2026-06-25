"use client";

import Navigation from "@/components/Navigation";
import HeroDuplicate from "@/components/HeroDuplicate";
import ServicesAnimate from "@/components/ServicesAnimate";
import WorkStages from "@/components/WorkStages";
import CasesMasonrySection from "@/components/CasesMasonrySection";
import ClientLogosBlock from "@/components/ClientLogosBlock";
import Team from "@/components/Team";
import ContactSection from "@/components/ContactSection";
import StatsBlock from "@/components/StatsBlock";

export default function HomeClient() {
  return (
    <>
      <Navigation />
      <HeroDuplicate />
      <div className="col-span-12 block w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] md:hidden">
        <StatsBlock />
      </div>
      <ServicesAnimate />
      <WorkStages />
      <CasesMasonrySection />
      <ClientLogosBlock />
      <Team />
      <ContactSection />
    </>
  );
}
