"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export interface MediaItem {
  name: string;
  role: string;
  src: string;
  aspect?: string; // e.g. "9/16" or "4/5"
}

interface HorizontalMediaGalleryProps {
  items: MediaItem[];
  className?: string;
}

// ─── PREMIUM CUSTOM VIDEO PLAYER ───────────────────────────────────────────────
function CustomVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4); // Volume default to 40% (0.4)
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Attempt autoplay with 40% volume when modal opens
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Autoplay blocked: ", err);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = parseFloat(e.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const vol = parseFloat(e.target.value);
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
      videoRef.current.muted = vol === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const muted = !isMuted;
      videoRef.current.muted = muted;
      setIsMuted(muted);
      if (muted) {
        setVolume(0);
      } else {
        const prevVol = videoRef.current.volume || 0.4;
        setVolume(prevVol);
        videoRef.current.volume = prevVol;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={playerRef}
      className="relative flex flex-col items-center justify-center bg-black border border-white/10 w-full h-full group"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
        loop
      />

      {/* Custom Minimalist Controls Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        
        {/* Progress Bar slider */}
        <div className="flex items-center w-full">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-[#FD4B32] outline-none transition-all duration-150 rounded-none"
            style={{
              background: `linear-gradient(to right, #FD4B32 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
        </div>

        {/* Buttons, Time & Indicators */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#FD4B32] transition-colors p-1 cursor-pointer bg-transparent border-0 outline-none flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <span className="text-[11px] font-mono text-white/70 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Volume Control */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="text-white hover:text-[#FD4B32] transition-colors p-1 cursor-pointer bg-transparent border-0 outline-none flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/vol:w-16 h-1 bg-white/20 appearance-none cursor-pointer accent-[#FD4B32] outline-none transition-all duration-300 rounded-none self-center"
                style={{
                  background: `linear-gradient(to right, #FD4B32 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#FD4B32] transition-colors p-1 cursor-pointer bg-transparent border-0 outline-none flex items-center justify-center"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Center Play Overlay (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-black/70 hover:bg-[#FD4B32]/90 border border-white/20 hover:border-transparent text-white hover:scale-105 transition-all duration-300 p-0 rounded-none z-10 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
      )}
    </div>
  );
}

// ─── MAIN GALLERY COMPONENT ───────────────────────────────────────────────────
export default function HorizontalMediaGallery({ items, className }: HorizontalMediaGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Client-side mount check to avoid SSR hydration issues
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom cursor states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [cursorText, setCursorText] = useState("");

  // Smooth mouse coordinates tracking using spring animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isHovered && !selectedItem) {
      smoothX.set(mousePos.x);
      smoothY.set(mousePos.y);
    }
  }, [mousePos, isHovered, selectedItem, smoothX, smoothY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!containerRef.current || !scrollRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const width = rect.width;

    const scrollEl = scrollRef.current;
    const canScrollLeft = scrollEl.scrollLeft > 5;
    const canScrollRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 5;

    // Define boundary zones: 18% of width, up to 220px max
    const zoneWidth = Math.min(220, width * 0.18);

    if (relativeX < zoneWidth && canScrollLeft) {
      setCursorText("← назад");
    } else if (relativeX > width - zoneWidth && canScrollRight) {
      setCursorText("вперед →");
    } else if (hoveredIdx !== null) {
      setCursorText("открыть");
    } else {
      setCursorText("");
    }
  };

  const handleScroll = (dir: "назад" | "вперед") => {
    if (!scrollRef.current) return;
    const scrollAmount = window.innerWidth * 0.4; // Scroll 40% of screen width
    const targetScroll =
      scrollRef.current.scrollLeft + (dir === "вперед" ? scrollAmount : -scrollAmount);

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const getAspectMultiplier = (aspect?: string) => {
    if (!aspect) return 16 / 9;
    const [w, h] = aspect.split("/").map(Number);
    return w && h ? w / h : 16 / 9;
  };

  // Detect media type from file extension
  const isVideo = (src: string) => {
    return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none cursor-none bg-transparent py-12",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIdx(null);
        setCursorText("");
      }}
      onClick={() => {
        if (cursorText === "← назад") {
          handleScroll("назад");
        } else if (cursorText === "вперед →") {
          handleScroll("вперед");
        }
      }}
    >
      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-[var(--page-margin)] py-4 scroll-smooth cursor-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item, idx) => {
          // Parse aspect ratio style
          const aspectVal = item.aspect || "4/5";
          const [w, h] = aspectVal.split("/").map(Number);
          const ratio = w && h ? w / h : 4 / 5;

          const cardHeight = "55vh"; // Consistent vertical height
          const cardWidth = `calc(${cardHeight} * ${ratio})`;

          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;

          return (
            <div
              key={idx}
              className="relative flex-shrink-0 group overflow-hidden bg-zinc-950 border border-white/10 rounded-none shadow-xl transition-all duration-500 ease-out cursor-none"
              style={{
                height: cardHeight,
                width: cardWidth,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (cursorText === "← назад") {
                  handleScroll("назад");
                } else if (cursorText === "вперед →") {
                  handleScroll("вперед");
                } else if (cursorText === "открыть") {
                  setSelectedItem(item);
                }
              }}
            >
              {isVideo(item.src) ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Minimalist Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center" />
            </div>
          );
        })}
      </div>

      {/* Custom Follower Cursor */}
      <AnimatePresence>
        {isHovered && !selectedItem && cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-mode-difference text-white font-sans uppercase tracking-[0.25em] text-xs font-semibold select-none flex items-center justify-center"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div className="px-4 py-2 bg-transparent select-none whitespace-nowrap">
              {cursorText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Modal with Custom Video Player */}
      <AnimatePresence>
        {isMounted && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-default"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button - positioned cleanly at the top right of screen, outside the video box */}
            <button
              onClick={() => setSelectedItem(null)}
              className="fixed top-8 right-[var(--page-margin)] text-white/60 hover:text-white transition-colors duration-300 p-2 cursor-pointer z-[120] bg-transparent border-0 outline-none flex items-center justify-center"
              aria-label="Close"
            >
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] border border-white/20 px-3.5 py-1.5 hover:border-white/60 transition-all duration-300">
                закрыть
              </span>
            </button>

            <div
              className="relative w-full max-w-5xl h-[80vh] max-h-[80vh] p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: `calc(80vh * ${getAspectMultiplier(selectedItem.aspect)})`,
                maxWidth: "95vw",
              }}
            >
              {isVideo(selectedItem.src) ? (
                <CustomVideoPlayer src={selectedItem.src} />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.name}
                  className="max-w-full max-h-[80vh] object-contain rounded-none border border-white/10"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}