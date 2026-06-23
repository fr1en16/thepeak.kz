import { notFound } from "next/navigation";
import { getCaseData } from "@/lib/notion";
import CaseClient from "./CaseClient";

export const revalidate = 0; // Ставим 0 для мгновенной диагностики

export default async function DynamicCasePage({ params }: { params: { slug: string } }) {
    try {
        const data = await getCaseData(params.slug);

        if (!data) {
            console.error("DEBUG: Notion data is null for slug:", params.slug);
            notFound();
        }

        return <CaseClient data={data} slug={params.slug} />;
    } catch (error) {
        // ВЫВОДИМ ОШИБКУ НА ЭКРАН, А НЕ В ЛОГИ VERCEL
        throw new Error(`NOTION_ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
}