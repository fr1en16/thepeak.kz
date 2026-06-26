import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { createCaseMetadata, getCasePageJsonLd } from "@/lib/seo";
import { targetCases } from "@/data/target-cases";
import CaseClient from "./CaseClient";

type TargetCaseSlug = keyof typeof targetCases;

function isTargetCaseSlug(slug: string): slug is TargetCaseSlug {
    return slug in targetCases;
}

export function generateStaticParams() {
    return Object.keys(targetCases).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (!isTargetCaseSlug(slug)) {
        return {};
    }

    return createCaseMetadata(slug);
}

export default async function TargetCasePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!isTargetCaseSlug(slug)) {
        notFound();
    }

    return (
        <>
            <JsonLd data={getCasePageJsonLd(slug)} />
            <CaseClient data={targetCases[slug]} slug={slug} />
        </>
    );
}
