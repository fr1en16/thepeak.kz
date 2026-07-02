"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button01 } from "@/components/ui/nextjsshop-button"

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
    href?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton = {
    text: "View gallery",
    href: "/work"
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-[220px] md:-space-x-[280px] lg:-space-x-[380px] xl:-space-x-[440px] 2xl:-space-x-[500px]",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const defaultImages: Array<{ src: string; alt: string; title?: string; href?: string }> = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard Design",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "E-Commerce Platform",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App Design",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Brand Identity",
    },
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
      alt: "Marketing Campaign",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      alt: "Product Photography",
    },
    {
      src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      alt: "Packaging Design",
    },
    {
      src: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "Tech Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      alt: "Future Vision",
    },
  ]
  
  const images = customImages || defaultImages

  return (
    <section
      aria-label={title}
      className={cn("relative w-full h-screen min-h-screen flex flex-col justify-between pt-24 pb-0 overflow-hidden", className)}
      id="archives"
    >
      {/* Header Section */}
      <div className="relative z-10 text-center pt-8 px-8">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white mb-8 text-balance max-w-5xl mx-auto leading-[0.9] no-invert">
          {title}
        </h2>

        <div className="flex justify-center mt-6">
          <Button01
            href={archiveButton.href}
            text={archiveButton.text}
            variant="light"
            className="no-invert mx-auto"
          />
        </div>
      </div>

      {/* Desktop 3D overlapping layout - hidden on mobile */}
      <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
        <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
          {images.map((image, index) => {
            // Calculate stagger height - peak in middle, descending to edges
            const totalImages = images.length
            const middle = Math.floor(totalImages / 2)
            const distanceFromMiddle = Math.abs(index - middle)
            const staggerOffset = maxHeight - distanceFromMiddle * 20

            const zIndex = totalImages - index

            const isHovered = hoveredIndex === index
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

            // When hovering: hovered card moves to consistent top position, others move to baseline
            const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

            const cardContent = (
              <div
                className="relative aspect-video w-64 md:w-80 lg:w-[460px] xl:w-[540px] 2xl:w-[620px] rounded-none overflow-hidden transition-transform duration-300 group-hover:scale-105"
                style={{
                  boxShadow: `
                    rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                    rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                    rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                    rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                  `,
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover object-left-top rounded-none"
                  loading="lazy"
                  decoding="async"
                />
                {image.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-sans font-bold text-sm tracking-wider">
                      {image.title}
                    </span>
                  </div>
                )}
              </div>
            )

            return (
              <motion.div
                key={index}
                className="group cursor-pointer flex-shrink-0"
                style={{
                  zIndex: zIndex,
                }}
                initial={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                  opacity: 0,
                }}
                animate={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2, // Much faster hover animation
                  delay: index * 0.05, // Faster entrance stagger
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onImageClick?.(index)}
              >
                {image.href ? (
                  <Link href={image.href} className="block no-invert">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile marquee layout */}
      <div className="block md:hidden relative pb-12 mt-auto">
        <div
          className={cn(
            "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
            "flex-row"
          )}
        >
          {Array(marqueeRepeat)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex shrink-0 justify-around [gap:var(--gap)]",
                  "animate-marquee flex-row",
                  {
                    "group-hover:[animation-play-state:paused]": pauseOnHover,
                  }
                )}
              >
                {images.map((image, index) => {
                  const cardContent = (
                    <div
                      className="relative aspect-video w-64 rounded-none overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{
                        boxShadow: `
                          rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                          rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                          rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                          rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                        `,
                      }}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover object-left-top rounded-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )

                  return (
                    <div
                      key={`${i}-${index}`}
                      className="group cursor-pointer flex-shrink-0"
                      onClick={() => onImageClick?.(index)}
                    >
                      {image.href ? (
                        <Link href={image.href} className="block no-invert">
                          {cardContent}
                        </Link>
                      ) : (
                        cardContent
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
