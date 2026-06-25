import { notFound } from "next/navigation";
// Убедись, что путь к клиенту соответствует твоему проекту (обычно src/sanity/lib/client.ts)
import { client } from "@/sanity/lib/client";
import CaseClient from "./CaseClient";

export const revalidate = 0; // Мгновенная диагностика

export default async function DynamicCasePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Запрос к Sanity
    const query = `*[_type == "case" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug });

    if (!data) {
        console.error("DEBUG: Sanity data is null for slug:", slug);
        notFound();
    }

    return <CaseClient data={data} slug={slug} />;
}
