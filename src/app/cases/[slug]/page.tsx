import { notFound } from "next/navigation";
// Убедись, что путь к клиенту соответствует твоему проекту (обычно src/sanity/lib/client.ts)
import { client } from "@/sanity/lib/client";
import CaseClient from "./CaseClient";

export const revalidate = 0; // Мгновенная диагностика

export default async function DynamicCasePage({ params }: { params: { slug: string } }) {
    try {
        // Запрос к Sanity
        const query = `*[_type == "case" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug: params.slug });

        if (!data) {
            console.error("DEBUG: Sanity data is null for slug:", params.slug);
            notFound();
        }

        return <CaseClient data={data} slug={params.slug} />;
    } catch (error) {
        // Вывод ошибки в UI
        throw new Error(`SANITY_ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
}