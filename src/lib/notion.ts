import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getCaseData(slug: string) {
    if (!process.env.NOTION_DATABASE_ID) {
        console.error("DEBUG: DATABASE_ID не задан");
        return null;
    }

    try {
        console.log("DEBUG: Ищем slug:", slug);
        const response = await (notion.databases as any).query({
            database_id: process.env.NOTION_DATABASE_ID,
            filter: {
                property: 'slug',
                title: { equals: slug }, // Попробуем точное совпадение (может быть чувствительно к регистру!)
            },
        });

        console.log("DEBUG: Notion ответил, найдено записей:", response?.results?.length);

        if (!response?.results?.length) return null;

        const page: any = response.results[0];
        const p = page.properties;

        // Добавляем логирование для каждого поля, чтобы найти, где падает
        console.log("DEBUG: Данные страницы загружены");

        const txt = (field: any) => {
            try {
                if (!field) return "";
                if (field.type === "title") return field.title?.[0]?.plain_text || "";
                if (field.type === "rich_text") return field.rich_text?.[0]?.plain_text || "";
                return "";
            } catch (e) { return ""; }
        };

        return {
            slug: slug,
            name: txt(p.name),
            hero_desc: txt(p.hero_desc),
            year: txt(p.year),
            service: txt(p.service),
            industry: txt(p.industry),
            insta_url: txt(p.insta_url),
            contentBlocks: [],
            reels: []
        };
    } catch (e) {
        console.error("DEBUG: ОШИБКА NOTION API:", e);
        throw e; // Пробрасываем ошибку, чтобы она попала в логи Vercel
    }
}