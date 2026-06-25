import JsonLd from "@/components/JsonLd";
import type { ReactNode } from "react";
import { getCasePageJsonLd } from "@/lib/seo";

type CaseSeoLayoutProps = {
  slug: string;
  children: ReactNode;
};

export default function CaseSeoLayout({ slug, children }: CaseSeoLayoutProps) {
  return (
    <>
      <JsonLd data={getCasePageJsonLd(slug)} />
      {children}
    </>
  );
}
