import type { Metadata } from "next";
import CaseSeoLayout from "@/components/CaseSeoLayout";
import { createCaseMetadata } from "@/lib/seo";

export const metadata: Metadata = createCaseMetadata("avtopilot");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CaseSeoLayout slug="avtopilot">{children}</CaseSeoLayout>;
}
