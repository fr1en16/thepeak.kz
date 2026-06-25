"use client";

import { useEffect, useRef, useState } from "react";

interface CaseGalleryItem {
    src: string;
    name?: string;
}

interface CaseVideoGalleryProps {
    slug: string;
}

function getMimeType(src: string) {
    const normalizedSrc = src.toLowerCase().split("?")[0];

    if (normalizedSrc.endsWith(".webm")) return "video/webm";
    if (normalizedSrc.endsWith(".mov")) return "video/quicktime";
    if (normalizedSrc.endsWith(".m4v")) return "video/x-m4v";
    return "video/mp4";
}

export default function CaseVideoGallery({ slug }: CaseVideoGalleryProps) {
    const [localVideos, setLocalVideos] = useState<CaseGalleryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
    const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

    useEffect(() => {
        const controller = new AbortController();

        async function loadVideos() {
            try {
                const response = await fetch(`/api/case-videos?slug=${encodeURIComponent(slug)}`, {
                    cache: "no-store",
                    signal: controller.signal,
                });

                if (!response.ok) {
                    setLocalVideos([]);
                    return;
                }

                const data = (await response.json()) as { videos?: CaseGalleryItem[] };
                setLocalVideos(Array.isArray(data.videos) ? data.videos : []);
            } catch {
                if (!controller.signal.aborted) {
                    setLocalVideos([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoaded(true);
                }
            }
        }

        loadVideos();

        return () => controller.abort();
    }, [slug]);

    useEffect(() => {
        setActiveVideoSrc(null);
        setCursor({ visible: false, x: 0, y: 0 });
    }, [localVideos]);

    const activateVideo = (src: string) => {
        Object.entries(videoRefs.current).forEach(([videoSrc, video]) => {
            if (video && videoSrc !== src) {
                video.pause();
            }
        });

        const video = videoRefs.current[src];

        if (video) {
            video.volume = 0.3;
            void video.play();
        }

        setActiveVideoSrc(src);
        setCursor({ visible: false, x: 0, y: 0 });
    };

    if (!isLoaded) {
        return null;
    }

    if (localVideos.length === 0) {
        return null;
    }

    return (
        <section className="relative border-b border-white/10 px-[var(--page-margin)] py-20 bg-[#0a0a0a]">
            {cursor.visible && (
                <div
                    className="pointer-events-none fixed left-0 top-0 z-[100] font-sans text-xs font-bold uppercase tracking-[0.24em] text-white mix-blend-difference transition-transform duration-150 ease-out will-change-transform"
                    style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)` }}
                >
                    Смотреть
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {localVideos.map((item, index) => (
                    <div
                        key={`${item.src}-${index}`}
                        className="w-full bg-zinc-950 border border-white/5 rounded-none overflow-hidden flex flex-col justify-between"
                    >
                        <div
                            className={`group relative w-full aspect-[9/16] bg-zinc-900 overflow-hidden ${
                                activeVideoSrc === item.src ? "cursor-auto" : "cursor-none"
                            }`}
                            role="button"
                            tabIndex={0}
                            aria-label={`Смотреть ${item.name || `видео кейса ${index + 1}`}`}
                            onClick={() => activateVideo(item.src)}
                            onMouseMove={(event) => {
                                if (activeVideoSrc !== item.src) {
                                    setCursor({ visible: true, x: event.clientX, y: event.clientY });
                                }
                            }}
                            onMouseLeave={() => setCursor({ visible: false, x: 0, y: 0 })}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    activateVideo(item.src);
                                }
                            }}
                        >
                            <video
                                ref={(node) => {
                                    videoRefs.current[item.src] = node;
                                }}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                                controls={activeVideoSrc === item.src}
                                playsInline
                                preload="metadata"
                                aria-label={item.name || `Видео кейса ${index + 1}`}
                            >
                                <source src={item.src} type={getMimeType(item.src)} />
                            </video>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
