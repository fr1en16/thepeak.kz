import { notFound } from "next/navigation";
import { getCaseData } from "@/lib/notion";
import CaseClient from "./CaseClient";

export const revalidate = 3600;

export default async function DynamicCasePage({
    params,
}: {
    params: { slug: string };
}) {
    const data = await getCaseData(params.slug);

    if (!data) {
        notFound();
    }

    return <CaseClient data={data} slug={params.slug} />;
}