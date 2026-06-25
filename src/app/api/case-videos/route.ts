import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

export const dynamic = "force-dynamic";

function isSafeSlug(slug: string) {
    return /^[a-z0-9-]+$/i.test(slug);
}

function getPublicVideoSrc(slug: string, fileName: string) {
    return `/cases/${slug}/video/${encodeURIComponent(fileName)}`;
}

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug")?.trim();

    if (!slug || !isSafeSlug(slug)) {
        return Response.json({ videos: [] }, { status: 400 });
    }

    const videoDir = path.join(process.cwd(), "public", "cases", slug, "video");

    try {
        const entries = await readdir(videoDir, { withFileTypes: true });
        const videos = entries
            .filter((entry) => entry.isFile() && VIDEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
            .map((entry) => ({
                src: getPublicVideoSrc(slug, entry.name),
                name: path.parse(entry.name).name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "ru"));

        return Response.json({ videos });
    } catch {
        return Response.json({ videos: [] });
    }
}
