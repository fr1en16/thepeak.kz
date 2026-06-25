"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { formatTypography } from "@/utils/typography";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import { Button01 } from "@/components/ui/nextjsshop-button";
import PhoneInput from "@/components/ui/PhoneInput";

interface BentoCaseItem {
  name: string;
  type: string;
  image?: string;
  video?: string;
  className: string;
  href: string;
}

const allCasesData: BentoCaseItem[] = [
  { name: "Sensata", type: "Видеопродакшн", image: "/cases/sensata.webp", className: "col-span-1", href: "/cases/sensata" },
  { name: "Puma Kazakhstan", type: "SMM / Ритейл", image: "/cases/puma.webp", className: "col-span-1", href: "/cases/puma" },
  { name: "Gippo", type: "SMM / Фаст-фуд", image: "/cases/gippo.webp", className: "col-span-1", href: "/cases/gippo" },
  { name: "Lukoil Lubricants", type: "SMM / Производство", image: "/cases/lukoil.mp4", className: "col-span-1", href: "/cases/lukoil" },
  { name: "Bazis A", type: "Видеопродакшн", image: "/cases/bazis a.mp4", className: "col-span-1", href: "/cases/bazisa" },
  { name: "Velmar", type: "SMM", image: "/cases/velmar.mp4", className: "col-span-1", href: "/cases/velmar" },
  { name: "Raccoon Tyres", type: "SMM / Автосервис", image: "/cases/raccoon.mp4", className: "col-span-1", href: "/cases/racoon" },
  { name: "ONmacabim", type: "Стратегия & SMM", image: "/cases/onmacabim.webp", className: "col-span-1", href: "/cases/onmacabim" },
  { name: "Mind of Body", type: "SMM / Фитнес", image: "/cases/mob.webp", className: "col-span-1", href: "/cases/mindofbody" },
  { name: "Diskokras", type: "SMM / Личный бренд", image: "/cases/diskokras.webp", className: "col-span-1", href: "/cases/diskokras" },
  { name: "Рис", type: "SMM / Ресторан", image: "/cases/ris.mp4", className: "col-span-1", href: "/cases/ris" },
  { name: "Cadillac", type: "SMM / Продажа авто", image: "/cases/cadillac.webp", className: "col-span-1", href: "/cases/cadillac" },
  { name: "Bossxo", type: "SMM / Продажа мебели", image: "/cases/bossxo.webp", className: "col-span-1", href: "/cases/bossxo" },
  { name: "Blink map", type: "SMM / IT-бизнес", image: "/cases/blink.webp", className: "col-span-1", href: "/cases/blink" },
  { name: "Avtopilot", type: "SMM / Автосервис", image: "/cases/avtopilot.mp4", className: "col-span-1", href: "/cases/avtopilot" },
  { name: "ARK detailing", type: "SMM / Детейлинг", image: "/cases/ark.webp", className: "col-span-1", href: "/cases/ark" },
];

const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "180px 180px",
};

// Интерактивный 3D-tilt эффект с добавлением perspective
const TiltWrapper = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="w-full h-full transition-all duration-200 ease-out will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const ContactInfoDark = () => (
  <div className="space-y-8 font-sans">
    <div>
      <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">Контакты</h3>
      <a href="tel:+77000000000" className="flex items-center gap-3 text-white hover:text-[#FD4B32] transition-colors text-lg font-medium">
        <IconPhone size={18} className="text-white/40" />
        <span>+7 (700) 000-00-00</span>
      </a>
    </div>
    <div>
      <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">Email</h3>
      <a href="mailto:hello@altis.agency" className="flex items-center gap-3 text-white hover:text-[#FD4B32] transition-colors text-lg font-medium">
        <IconMail size={18} className="text-white/40" />
        <span>hello@altis.agency</span>
      </a>
    </div>
    <div>
      <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">Локация</h3>
      <div className="flex items-center gap-3 text-white text-lg font-medium">
        <IconMapPin size={18} className="text-white/40" />
        <span>Костанай, Казахстан</span>
      </div>
    </div>
  </div>
);

export default function CasesCatalogPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setName("");
    setPhone("");
    setEmail("");
  }, []);

  return (
    <>
      <Navigation />
      <div className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] min-h-screen relative overflow-hidden" style={{ backgroundColor: "#060606", color: "#ffffff" }}>
        {/* Шумовой слой */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-50" style={GRAIN_STYLE} />

        {/* HEADER */}
        <header className="px-[var(--page-margin)] pt-24 pb-12 border-b border-white/10 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest font-mono mb-8 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Назад на главную
          </Link>
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter uppercase mb-4">
            {formatTypography("Кейсы")}
          </h1>
          <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-xl">
            Проекты, разработанные нашей командой: от комплексного SMM до масштабного видеопроизводства.
          </p>
        </header>

        {/* СЕТКА ПРОЕКТОВ */}
        <section className="relative px-[var(--page-margin)] py-16 bg-[#060606] border-b border-white/10 z-10">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {allCasesData.map((item, index) => {
                // Проверяем, является ли строка в image ссылкой на mp4-видео
                const isImageMp4 = item.image?.toLowerCase().endsWith(".mp4");

                return (
                  <Link
                    href={item.href}
                    key={index}
                    className="group relative flex flex-col rounded-none bg-transparent transition-all duration-300"
                  >
                    {/* Контейнер с жестким соотношением 16:9 (aspect-video) */}
                    <div className="relative w-full aspect-video overflow-hidden bg-neutral-900 rounded-none border border-white/5">
                      <TiltWrapper>
                        {item.video ? (
                          <video
                            src={item.video}
                            poster={item.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        ) : isImageMp4 ? (
                          <video
                            src={item.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                      </TiltWrapper>
                    </div>

                    {/* Подпись карточки */}
                    <div className="pt-4 pb-1 z-10 relative flex items-baseline justify-between gap-4">
                      <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider group-hover:text-[#FD4B32] transition-colors truncate">
                        {item.name}
                      </h3>
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-medium shrink-0 text-right">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="px-[var(--page-margin)] py-24 bg-[#0a0a0a] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl font-sans font-bold tracking-tighter uppercase">
              {formatTypography("Обсудить проект")}
            </h2>
            <p className="text-white/60 font-mono text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Заполните форму, и мы свяжемся с вами в течение рабочего дня для детального разбора вашей задачи.
            </p>
            <div className="pt-4">
              <ContactInfoDark />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ИВАН"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-white tracking-wide rounded-none font-sans uppercase transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL@EXAMPLE.COM"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-white tracking-wide rounded-none font-sans uppercase transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Телефон</label>
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  className="w-full bg-transparent border-b border-white/10 py-1 text-sm text-white focus:outline-none focus:border-white tracking-wide rounded-none"
                />
              </div>

              <div className="pt-4">
                <Button01
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full md:w-auto px-8 py-4 bg-white text-black font-sans font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#FD4B32] hover:text-white disabled:opacity-50"
                  )}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  <IconSend size={14} />
                </Button01>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}