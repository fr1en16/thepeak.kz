import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getCaseData(slug: string) {
    if (!process.env.NOTION_DATABASE_ID) {
        throw new Error("Missing NOTION_DATABASE_ID in .env.local");
    }

    // Обходим поломанный кэш типов Верселя через (notion.databases as any)
    const response = await (notion.databases as any).query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: 'slug',
            title: { equals: slug },
        },
    });

    if (!response?.results?.length) return null;

    const page: any = response.results[0];
    const p = page.properties;

    const txt = (field: any) => field?.rich_text?.[0]?.plain_text || field?.title?.[0]?.plain_text || '';

    const rawReels = txt(p.reels_data);
    const reels = rawReels
        .split('\n')
        .filter(Boolean)
        .map((line: string) => {
            const [url = '', name = '', role = ''] = line.split('|').map((s: string) => s.trim());
            const cleanUrl = url.split('?')[0].replace('/reels/', '/p/').replace('/reel/', '/p/') + 'embed';
            return {
                name: name || 'Reel',
                role: role || '',
                src: cleanUrl
            };
        });

    return {
        slug,
        name: txt(p.name),
        hero_desc: txt(p.hero_desc),
        year: txt(p.year),
        service: txt(p.service),
        industry: txt(p.industry),
        insta_url: txt(p.insta_url),
        contentBlocks: [
            { chapter: txt(p.block1_title), text: txt(p.block1_text) },
            { chapter: txt(p.block2_title), text: txt(p.block2_text) },
            { chapter: txt(p.block3_title), text: txt(p.block3_text) },
        ].filter((b: any) => Boolean(b.chapter) && Boolean(b.text)),
        reels,
    };
}