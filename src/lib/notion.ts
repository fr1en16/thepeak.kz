import { Client } from '@notionhq/client';

// Инициализируем клиент Notion
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getCaseData(slug: string) {
    if (!process.env.NOTION_DATABASE_ID) {
        throw new Error("Missing NOTION_DATABASE_ID in .env.local");
    }

    // Запрос к базе данных Notion
    // Используем (notion.databases as any) для обхода конфликтов кэша типов Vercel
    const response = await (notion.databases as any).query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: 'slug',
            title: { equals: slug },
        },
    });

    // Если страница не найдена, возвращаем null
    if (!response?.results?.length) return null;

    const page: any = response.results[0];
    const p = page.properties;

    // Хелпер для извлечения текста из ячеек Notion
    const txt = (field: any) => field?.rich_text?.[0]?.plain_text || field?.title?.[0]?.plain_text || '';

    // Парсинг рилсов из текстовой ячейки
    const rawReels = txt(p.reels_data);
    const reels = rawReels
        .split('\n')
        .filter(Boolean)
        .map((line: string) => {
            const [url = '', name = '', role = ''] = line.split('|').map((s: string) => s.trim());
            // Конвертация ссылки в embed-формат
            const cleanUrl = url.split('?')[0].replace('/reels/', '/p/').replace('/reel/', '/p/') + 'embed';
            return {
                name: name || 'Reel',
                role: role || '',
                src: cleanUrl
            };
        });

    // Формируем финальный объект данных
    return {
        slug,
        name: txt(p.name),
        hero_desc: txt(p.hero_desc),
        year: txt(p.year),
        service: txt(p.service),
        industry: txt(p.industry),
        insta_url: txt(p.insta_url),
        // Фильтруем блоки: возвращаем только те, где заполнено и название, и текст
        contentBlocks: [
            { chapter: txt(p.block1_title), text: txt(p.block1_text) },
            { chapter: txt(p.block2_title), text: txt(p.block2_text) },
            { chapter: txt(p.block3_title), text: txt(p.block3_text) },
        ].filter((b: any) => Boolean(b.chapter) && Boolean(b.text)),
        reels,
    };
}