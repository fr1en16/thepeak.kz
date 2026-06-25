import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '869063512449970');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=869063512449970&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
