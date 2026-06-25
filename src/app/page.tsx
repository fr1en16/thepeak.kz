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

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroDuplicate />
      <div className="block md:hidden">
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
