import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import CasesClient from "./cases-client";
import { allCasesData } from "@/data/cases";
import { absoluteUrl, createSeoMetadata, getBreadcrumbJsonLd, pageSeo } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(pageSeo.cases);

export default function CasesCatalogPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/cases#collection"),
    name: "Кейсы ThePeak",
    description: pageSeo.cases.description,
    url: absoluteUrl("/cases"),
    inLanguage: "ru-KZ",
    about: ["SMM", "digital-маркетинг", "брендинг", "продакшн", "Казахстан", "Алматы", "Астана"],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allCasesData.map((caseItem, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: caseItem.name,
        url: absoluteUrl(caseItem.href),
      })),
    },
  };

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Кейсы", path: "/cases" },
          ]),
          collectionJsonLd,
        ]}
      />
      <CasesClient />
    </>
  );
}
