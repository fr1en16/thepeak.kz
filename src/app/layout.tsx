import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GridGuide from "@/components/GridGuide";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import HeroVideoPreload from "@/components/HeroVideoPreload";

const interDisplay = localFont({
  src: [
    { path: "./fonts/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    // Map heavier weights (700, 800, 900) to the SemiBold woff2 file
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "800", style: "normal" },
    { path: "./fonts/InterDisplay-SemiBold.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ThePeak – Маркетинг от идеи до готового результата",
  description: "Креативное агентство ThePeak. Создаем маркетинг, который становится референсом для других. Разработка стратегий, сайтов, брендинга и 3D-графики.",
  icons: {
    icon: "https://static.tildacdn.pro/tild3334-3763-4662-a232-663137633465/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${interDisplay.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="relative min-h-screen antialiased font-sans text-[#434343] bg-white selection:bg-[#FD4B32] selection:text-white overflow-x-hidden">
        <HeroVideoPreload />
        <SmoothScroll />
        <PageTransition>
          {children}
        </PageTransition>
        <GridGuide />
      </body>
    </html>
  );
}
