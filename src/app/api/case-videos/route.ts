import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { caseMediaManifest } from "@/data/case-media-manifest";

const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".m4v", ".mov", ".mp4", ".webm"]);
const CLOUDINARY_CASES_FOLDER = "cases";
const CLOUDINARY_VIDEO_TRANSFORMATION = "q_auto:best";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface CaseMediaItem {
    height?: number;
    src: string;
    name: string;
    posterSrc?: string;
    type: "image" | "video";
    width?: number;
}

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
    display_name?: string;
    height?: number;
    original_filename?: string;
    format?: string;
    width?: number;
}

interface CloudinaryResourcesResponse {
    resources?: CloudinaryResource[];
}

interface CloudinaryErrorResponse {
    error?: {
        message?: string;
    };
}

function isSafeSlug(slug: string) {
    return /^[a-z0-9-]+$/i.test(slug);
}

function getMediaType(fileName: string): CaseMediaItem["type"] | null {
    const extension = path.extname(fileName).toLowerCase();

    if (IMAGE_EXTENSIONS.has(extension)) {
        return "image";
    }

    if (VIDEO_EXTENSIONS.has(extension)) {
        return "video";
    }

    return null;
}

function getCloudinaryConfig() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return null;
    }

    return { cloudName, apiKey, apiSecret };
}

function getCloudinaryVideoName(resource: CloudinaryResource, folderPrefix: string) {
    const publicName = resource.public_id.slice(folderPrefix.length);
    return resource.display_name || resource.original_filename || path.parse(publicName).name;
}

function getHighQualityCloudinaryVideoSrc(src: string) {
    return src.replace("/video/upload/", `/video/upload/${CLOUDINARY_VIDEO_TRANSFORMATION}/`);
}

function getPublicMediaSrc(slug: string, fileName: string) {
    return `/cases/${slug}/${encodeURIComponent(fileName)}`;
}

function normalizeMediaKey(value: string) {
    return value
        .normalize("NFC")
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/%[0-9a-f]{2}/gi, " ")
        .replace(/[^a-zа-яё0-9]+/giu, " ")
        .trim();
}

function getBracketToken(value: string) {
    return value.match(/\[([^\]]+)\]/)?.[1]?.toLowerCase();
}

function getCloudinaryPublicName(value: string) {
    const withoutQuery = value.split("?")[0];
    const withoutExtension = withoutQuery.replace(/\.[a-z0-9]+$/i, "");
    const decoded = decodeURIComponent(withoutExtension);

    return path.basename(decoded);
}

function findPosterForVideoName(videoName: string, posterItems: CaseMediaItem[]) {
    const exactKey = normalizeMediaKey(videoName);
    const token = getBracketToken(videoName);

    return posterItems.find((poster) => {
        const posterKey = normalizeMediaKey(poster.name);

        if (posterKey === exactKey) {
            return true;
        }

        if (token && posterKey.includes(token)) {
            return true;
        }

        return posterKey.length > 0 && exactKey.includes(posterKey);
    });
}

async function getCloudinaryVideos(slug: string, localPosters: CaseMediaItem[]): Promise<CaseMediaItem[] | null> {
    const config = getCloudinaryConfig();

    if (!config) {
        return null;
    }

    const folderPrefix = `${CLOUDINARY_CASES_FOLDER}/${slug}/`;
    const params = new URLSearchParams({
        prefix: folderPrefix,
        max_results: "100",
    });
    const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/resources/video/upload?${params.toString()}`;
    const credentials = Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString("base64");

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const error = (await response.json().catch(() => null)) as CloudinaryErrorResponse | null;
            console.warn(
                `Cloudinary case videos request failed for "${slug}": ${response.status}${
                    error?.error?.message ? ` ${error.error.message}` : ""
                }`,
            );

            return null;
        }

        const data = (await response.json()) as CloudinaryResourcesResponse;

        return (data.resources || [])
            .filter((resource) => {
                if (!resource.secure_url || !resource.public_id.startsWith(folderPrefix)) {
                    return false;
                }

                const nestedPath = resource.public_id.slice(folderPrefix.length);
                return nestedPath.length > 0 && !nestedPath.includes("/");
            })
            .map((resource) => {
                const src = getHighQualityCloudinaryVideoSrc(resource.secure_url);
                const name = getCloudinaryVideoName(resource, folderPrefix);
                const poster = findPosterForVideoName(name, localPosters) || findPosterForVideoName(src, localPosters);

                return {
                    height: resource.height,
                    src,
                    name,
                    posterSrc: poster?.src,
                    type: "video" as const,
                    width: resource.width,
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name, "ru"));
    } catch {
        return null;
    }
}

async function getLocalMedia(slug: string, allowedTypes: Set<CaseMediaItem["type"]>): Promise<CaseMediaItem[]> {
    const videoDir = path.join(process.cwd(), "public", "cases", slug);

    try {
        const entries = await readdir(videoDir, { withFileTypes: true });

        return entries
            .flatMap((entry) => {
                if (!entry.isFile()) {
                    return [];
                }

                const type = getMediaType(entry.name);

                if (!type || !allowedTypes.has(type)) {
                    return [];
                }

                return [
                    {
                        src: getPublicMediaSrc(slug, entry.name),
                        name: path.parse(entry.name).name,
                        type,
                    },
                ];
            })
            .sort((a, b) => a.name.localeCompare(b.name, "ru"));
    } catch {
        return [];
    }
}

async function getLocalPosters(slug: string): Promise<CaseMediaItem[]> {
    const mediaDir = path.join(process.cwd(), "public", "cases", slug);

    try {
        const entries = await readdir(mediaDir, { withFileTypes: true });

        return entries
            .flatMap((entry) => {
                if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".webp") {
                    return [];
                }

                return [
                    {
                        src: getPublicMediaSrc(slug, entry.name),
                        name: path.parse(entry.name).name,
                        type: "image" as const,
                    },
                ];
            })
            .sort((a, b) => a.name.localeCompare(b.name, "ru"));
    } catch {
        return [];
    }
}

function getManifestMedia(
    slug: string,
    allowedTypes: Set<CaseMediaItem["type"]>,
    localPosters: CaseMediaItem[] = [],
): CaseMediaItem[] {
    return (caseMediaManifest[slug] || [])
        .filter((item) => allowedTypes.has(item.type))
        .map((item) => {
            if (item.type !== "video" || item.posterSrc) {
                return { ...item };
            }

            const poster =
                findPosterForVideoName(item.name, localPosters) ||
                findPosterForVideoName(getCloudinaryPublicName(item.src), localPosters);

            return { ...item, posterSrc: poster?.src };
        })
        .sort((a, b) => a.name.localeCompare(b.name, "ru"));
}

function excludeVideoPostersFromImages(images: CaseMediaItem[], videos: CaseMediaItem[]) {
    const posterSrcs = new Set(videos.map((video) => video.posterSrc).filter(Boolean));

    return images.filter((image) => !posterSrcs.has(image.src));
}

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug")?.trim();

    if (!slug || !isSafeSlug(slug)) {
        return Response.json({ videos: [] }, { status: 400 });
    }

    const localPosters = await getLocalPosters(slug);
    const cloudinaryVideos = await getCloudinaryVideos(slug, localPosters);
    const fallbackVideos = getManifestMedia(slug, new Set(["video"]), localPosters);

    if (cloudinaryVideos && cloudinaryVideos.length > 0) {
        const localImages = excludeVideoPostersFromImages(await getLocalMedia(slug, new Set(["image"])), cloudinaryVideos);
        const media = [...cloudinaryVideos, ...localImages].sort((a, b) => a.name.localeCompare(b.name, "ru"));

        return Response.json({ media, videos: media.filter((item) => item.type === "video") });
    }

    if (fallbackVideos.length > 0) {
        const localImages = excludeVideoPostersFromImages(await getLocalMedia(slug, new Set(["image"])), fallbackVideos);
        const media = [...fallbackVideos, ...localImages].sort((a, b) => a.name.localeCompare(b.name, "ru"));

        return Response.json({ media, videos: media.filter((item) => item.type === "video") });
    }

    const media = await getLocalMedia(slug, new Set(["image"]));
    return Response.json({ media, videos: media.filter((item) => item.type === "video") });
}
