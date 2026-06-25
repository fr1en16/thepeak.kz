"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CaseGalleryItem {
    height?: number;
    src: string;
    name?: string;
    posterSrc?: string;
    type: "image" | "video";
    width?: number;
}

interface CaseVideoGalleryProps {
    slug: string;
}

interface VideoState {
    duration: number;
    hasStarted: boolean;
    isMuted: boolean;
    isPlaying: boolean;
    progress: number;
}

function getMimeType(src: string) {
    const normalizedSrc = src.toLowerCase().split("?")[0];

    if (normalizedSrc.endsWith(".webm")) return "video/webm";
    if (normalizedSrc.endsWith(".mov")) return "video/quicktime";
    if (normalizedSrc.endsWith(".m4v")) return "video/x-m4v";
    return "video/mp4";
}

function getCloudinaryPosterSrc(src: string) {
    if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) {
        return undefined;
    }

    const [baseSrc, query = ""] = src.split("?");
    const sourceWithoutExtension = baseSrc.replace(/\.[a-z0-9]+$/i, "");
    const posterSrc = sourceWithoutExtension.replace(
        /\/video\/upload\/(?:[^/]+\/)?(v\d+\/)/,
        "/video/upload/so_0.1,q_auto:good,f_jpg/$1",
    );

    return `${posterSrc}.jpg${query ? `?${query}` : ""}`;
}

function formatTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds <= 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}

export default function CaseVideoGallery({ slug }: CaseVideoGalleryProps) {
    const [mediaItems, setMediaItems] = useState<CaseGalleryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
    const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
    const [videoStates, setVideoStates] = useState<Record<string, VideoState>>({});
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

    useEffect(() => {
        const controller = new AbortController();

        async function loadMedia() {
            try {
                const response = await fetch(`/api/case-videos?slug=${encodeURIComponent(slug)}`, {
                    cache: "no-store",
                    signal: controller.signal,
                });

                if (!response.ok) {
                    setMediaItems([]);
                    return;
                }

                const data = (await response.json()) as { media?: CaseGalleryItem[]; videos?: CaseGalleryItem[] };
                const items = Array.isArray(data.media) ? data.media : data.videos;
                setMediaItems(Array.isArray(items) ? items : []);
            } catch {
                if (!controller.signal.aborted) {
                    setMediaItems([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoaded(true);
                }
            }
        }

        loadMedia();

        return () => controller.abort();
    }, [slug]);

    useEffect(() => {
        setActiveVideoSrc(null);
        setCursor({ visible: false, x: 0, y: 0 });
        setVideoStates({});
    }, [mediaItems]);

    const updateVideoState = (src: string, state: Partial<VideoState>) => {
        const defaultState: VideoState = {
            duration: 0,
            hasStarted: false,
            isMuted: false,
            isPlaying: false,
            progress: 0,
        };

        setVideoStates((currentStates) => ({
            ...currentStates,
            [src]: {
                ...defaultState,
                ...currentStates[src],
                ...state,
            },
        }));
    };

    const pauseOtherVideos = (src: string) => {
        Object.entries(videoRefs.current).forEach(([videoSrc, video]) => {
            if (video && videoSrc !== src) {
                video.pause();
                updateVideoState(videoSrc, { isPlaying: false });
            }
        });
    };

    const playVideo = (src: string) => {
        pauseOtherVideos(src);

        const video = videoRefs.current[src];

        if (video) {
            video.volume = 0.3;
            void video
                .play()
                .then(() => {
                    updateVideoState(src, { hasStarted: true, isMuted: video.muted, isPlaying: true });
                })
                .catch(() => {
                    updateVideoState(src, { isPlaying: false });
                });
        }

        setActiveVideoSrc(src);
        setCursor({ visible: false, x: 0, y: 0 });
    };

    const togglePlayback = (src: string) => {
        const video = videoRefs.current[src];

        if (!video) {
            return;
        }

        if (video.paused) {
            playVideo(src);
            return;
        }

        video.pause();
        updateVideoState(src, { isPlaying: false });
    };

    const toggleMute = (src: string) => {
        const video = videoRefs.current[src];

        if (!video) {
            return;
        }

        video.muted = !video.muted;
        updateVideoState(src, { isMuted: video.muted });
    };

    const seekVideo = (src: string, progress: number) => {
        const video = videoRefs.current[src];

        if (!video || !Number.isFinite(video.duration)) {
            return;
        }

        video.currentTime = (progress / 100) * video.duration;
        updateVideoState(src, { progress });
    };

    const openFullscreen = (src: string) => {
        const card = cardRefs.current[src];

        if (!card || !document.fullscreenEnabled) {
            return;
        }

        void card.requestFullscreen();
    };

    if (!isLoaded) {
        return null;
    }

    if (mediaItems.length === 0) {
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
            <div className="columns-1 gap-6 sm:columns-2 md:columns-3 lg:columns-4">
                {mediaItems.map((item, index) => (
                    <div
                        key={`${item.src}-${index}`}
                        ref={(node) => {
                            cardRefs.current[item.src] = node;
                        }}
                        className="mb-6 w-full break-inside-avoid bg-zinc-950 border border-white/5 rounded-none overflow-hidden"
                    >
                        {item.type === "image" ? (
                            <img
                                className="block h-auto w-full bg-zinc-900 object-contain"
                                src={item.src}
                                alt={item.name || `Материал кейса ${index + 1}`}
                                loading="lazy"
                                width={item.width}
                                height={item.height}
                            />
                        ) : (
                            <div
                                className={`group relative w-full bg-zinc-900 overflow-hidden ${
                                    activeVideoSrc === item.src ? "cursor-auto" : "cursor-none"
                                }`}
                                role="button"
                                tabIndex={0}
                                aria-label={`Смотреть ${item.name || `видео кейса ${index + 1}`}`}
                                onClick={() => togglePlayback(item.src)}
                                onMouseMove={(event) => {
                                    if (activeVideoSrc !== item.src) {
                                        setCursor({ visible: true, x: event.clientX, y: event.clientY });
                                    }
                                }}
                                onMouseLeave={() => setCursor({ visible: false, x: 0, y: 0 })}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        togglePlayback(item.src);
                                    }
                                }}
                            >
                                <video
                                    ref={(node) => {
                                        videoRefs.current[item.src] = node;
                                    }}
                                    className="block h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                    controls={false}
                                    controlsList="nodownload noplaybackrate noremoteplayback"
                                    disablePictureInPicture
                                    playsInline
                                    poster={item.posterSrc || getCloudinaryPosterSrc(item.src)}
                                    preload="metadata"
                                    width={item.width}
                                    height={item.height}
                                    aria-label={item.name || `Видео кейса ${index + 1}`}
                                    onContextMenu={(event) => event.preventDefault()}
                                    onLoadedMetadata={(event) => {
                                        updateVideoState(item.src, {
                                            duration: event.currentTarget.duration,
                                            isMuted: event.currentTarget.muted,
                                        });
                                    }}
                                    onPause={() => updateVideoState(item.src, { isPlaying: false })}
                                    onPlay={() => updateVideoState(item.src, { isPlaying: true })}
                                    onTimeUpdate={(event) => {
                                        const video = event.currentTarget;

                                        if (!Number.isFinite(video.duration) || video.duration <= 0) {
                                            return;
                                        }

                                        updateVideoState(item.src, {
                                            duration: video.duration,
                                            progress: (video.currentTime / video.duration) * 100,
                                        });
                                    }}
                                >
                                    <source src={item.src} type={getMimeType(item.src)} />
                                </video>
                                {videoStates[item.src]?.hasStarted && (
                                    <>
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 px-3 pb-3 text-white">
                                            <input
                                                className="h-1 w-full cursor-pointer appearance-none bg-white/25 accent-white"
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="0.1"
                                                value={videoStates[item.src]?.progress || 0}
                                                aria-label="Прогресс видео"
                                                onChange={(event) =>
                                                    seekVideo(item.src, Number(event.currentTarget.value))
                                                }
                                                onClick={(event) => event.stopPropagation()}
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:bg-white/85"
                                                        type="button"
                                                        aria-label={
                                                            videoStates[item.src]?.isPlaying ? "Пауза" : "Смотреть"
                                                        }
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            togglePlayback(item.src);
                                                        }}
                                                    >
                                                        {videoStates[item.src]?.isPlaying ? (
                                                            <Pause className="h-4 w-4" strokeWidth={2.4} />
                                                        ) : (
                                                            <Play
                                                                className="h-4 w-4 translate-x-px"
                                                                strokeWidth={2.4}
                                                            />
                                                        )}
                                                    </button>
                                                    <span className="font-sans text-xs font-medium tabular-nums text-white/90">
                                                        {formatTime(
                                                            ((videoStates[item.src]?.progress || 0) / 100) *
                                                                (videoStates[item.src]?.duration || 0),
                                                        )}{" "}
                                                        / {formatTime(videoStates[item.src]?.duration || 0)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
                                                        type="button"
                                                        aria-label={
                                                            videoStates[item.src]?.isMuted
                                                                ? "Включить звук"
                                                                : "Выключить звук"
                                                        }
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            toggleMute(item.src);
                                                        }}
                                                    >
                                                        {videoStates[item.src]?.isMuted ? (
                                                            <VolumeX className="h-4 w-4" strokeWidth={2.2} />
                                                        ) : (
                                                            <Volume2 className="h-4 w-4" strokeWidth={2.2} />
                                                        )}
                                                    </button>
                                                    <button
                                                        className="grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70"
                                                        type="button"
                                                        aria-label="Во весь экран"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            openFullscreen(item.src);
                                                        }}
                                                    >
                                                        <Maximize2 className="h-4 w-4" strokeWidth={2.2} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
