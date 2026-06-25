"use client";

import CasesBentoGrid from "@/components/CasesBentoGrid";
import { Button01 } from "@/components/ui/nextjsshop-button";
import { formatTypography } from "@/utils/typography";

export default function CasesMasonrySection() {
  return (
    <section
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] overflow-hidden pt-[3rem] md:pt-[var(--page-margin)] pb-12 bg-white select-none scroll-mt-[clamp(2rem,2.8vw,3.5rem)]"
      id="cases"
    >
      <div className="swiss-grid mb-16">
        <div className="col-span-12 md:col-start-7 md:col-span-6 lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 text-left">
          <h2 className="font-headline font-semibold text-brand-gray text-[clamp(1.6rem,2.91vw,2.5rem)] leading-[0.9] mb-6 no-invert">
            {formatTypography("За каждым кейсом стоят стратегия, сильная команда и конкретные показатели.")}
          </h2>
          <p className="description-text text-brand-gray/80 max-w-[900px] no-invert">
            {formatTypography(
              "Мы работаем с бизнесом, который хочет расти, а не просто присутствовать в digital.",
            )}
          </p>
        </div>
      </div>

      <div className="swiss-grid">
        <div className="col-span-12 w-full">
          <CasesBentoGrid limit={10} />
        </div>
      </div>

      <div className="swiss-grid mt-10">
        <div className="col-span-12 flex justify-start md:justify-end">
          <Button01
            href="/cases"
            text={formatTypography("Все кейсы")}
            variant="dark"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
