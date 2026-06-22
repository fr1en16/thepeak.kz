"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HeroDuplicate from "@/components/HeroDuplicate";
import ServicesAnimate from "@/components/ServicesAnimate";
import WorkStages from "@/components/WorkStages";
import CasesMasonrySection from "@/components/CasesMasonrySection";
import ClientLogosBlock from "@/components/ClientLogosBlock";
import Team from "@/components/Team";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroDuplicate />
      <ServicesAnimate />
      <WorkStages />
      <CasesMasonrySection />
      <ClientLogosBlock />
      <Team />
      <ContactSection />
    </>
  );
}



