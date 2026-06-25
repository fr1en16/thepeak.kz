"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { allCasesData } from "@/data/cases";
import { formatTypography } from "@/utils/typography";

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
                  <video
                    src={mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
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
