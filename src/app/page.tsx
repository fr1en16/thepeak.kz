import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HomeClient from "./home-client";
import { createSeoMetadata, getBreadcrumbJsonLd, getServiceJsonLd, pageSeo } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(pageSeo.home);

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([{ name: "Главная", path: "/" }]),
          getServiceJsonLd({
            name: "Маркетинговое агентство в\u00a0Казахстане",
            description:
              "Комплексный маркетинг, SMM, digital-стратегия, брендинг, разработка сайтов и\u00a0продакшн для бизнеса в\u00a0Казахстане, Алматы и\u00a0Астане.",
            path: "/",
            serviceType: "Маркетинг полного цикла",
          }),
        ]}
      />
      <HomeClient />
    </>
  );
}
