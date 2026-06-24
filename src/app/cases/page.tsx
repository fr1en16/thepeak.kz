"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { BentoGrid } from "@/components/ui/bento-grid";
import { formatTypography } from "@/utils/typography";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconPlus,
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

// ─── Маппинг папок строго по скриншоту локального окружения ──────────────────
const allCasesData: BentoCaseItem[] = [
  {
    name: "Puma Kazakhstan",
    type: "SMM / Ритейл",
    image: "/cases/puma/hero.webp",
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2",
    href: "/cases/puma",
  },
  {
    name: "Gippo",
    type: "SMM / Фаст-фуд",
    image: "/cases/gippo/hero.webp",
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    href: "/cases/gippo",
  },
  {
    name: "Lukoil Lubricants",
    type: "SMM / Производство",
    image: "/cases/lukoil/hero.webp",
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    href: "/cases/lukoil",
  },
  {
    name: "Sensata",
    type: "Видеопродакшн",
    image: "/cases/sensata/sensata.webp",
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    href: "/cases/sensata",
  },
  {
    name: "Bazis A",
    type: "Видеопродакшн",
    image: "/cases/bazisa/hero.webp",
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    href: "/cases/bazisa",
  },
  {
    name: "Velmar",
    type: "SMM",
    image: "/cases/velmar/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/velmar",
  },
  {
    name: "Рис",
    type: "SMM / Ресторан",
    image: "/cases/ris/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/ris",
  },
  {
    name: "Raccoon Tyres",
    type: "SMM / Автосервис",
    image: "/cases/racoon/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/racoon",
  },
  {
    name: "ONmacabim",
    type: "Стратегия & SMM",
    image: "/cases/onmacabim/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/onmacabim",
  },
  {
    name: "Mind of Body",
    type: "SMM / Фитнес",
    image: "/cases/mindofbody/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/mindofbody",
  },
  {
    name: "Diskokras",
    type: "SMM / Личный бренд",
    image: "/cases/diskokras/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/diskokras",
  },
  {
    name: "Cadillac",
    type: "SMM / Продажа авто",
    image: "/cases/cadillac/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/cadillac",
  },
  {
    name: "Bossxo",
    type: "SMM / Продажа мебели",
    image: "/cases/bossxo/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/bossxo",
  },
  {
    name: "Blink map",
    type: "SMM / IT-бизнес",
    image: "/cases/blink/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/blink",
  },
  {
    name: "Avtopilot",
    type: "SMM / Автосервис",
    image: "/cases/avtopilot/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/avtopilot",
  },
  {
    name: "ARK detailing",
    type: "SMM / Детейлинг",
    image: "/cases/ark/hero.webp",
    className: "col-span-1 lg:col-span-1 lg:row-span-1",
    href: "/cases/ark",
  },
];

const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "180px 180px",
};

// ─── Contact Info Dark Component ─────────────────────────────────────────────
interface ContactInfoDarkProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  className?: string;
}

function ContactInfoDark({ icon: Icon, value, className, ...props }: ContactInfoDarkProps) {
  return (
    <div className={cn("flex items-center gap-4 py-3 rounded-none", className)} {...props}>
      <div className="bg-white/5 p-3 rounded-none flex items-center justify-center flex-shrink-0 text-[#FD4B32] border border-white/10">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-sans font-bold text-sm text-white uppercase tracking-wider no-invert">{value}</p>
      </div>
    </div>
  );
}

// ─── Локальный оберточный компонент для интерактивного 3D Тилта ───────────────
function TiltWrapper({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltFactor = 12;
  const perspective = 1000;
  const transitionDuration = 0.15;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || !isHovered) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
      setMousePosition({ x, y });
      const tiltX = -(y / 50) * tiltFactor;
      const tiltY = (x / 50) * tiltFactor;
      setTiltValues({ x: tiltX, y: tiltY });
    },
    [isHovered]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltValues({ x: 0, y: 0 });
  }, []);

  const glareX = mousePosition.x / 2 + 50;
  const glareY = mousePosition.y / 2 + 50;

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full bg-zinc-950"
        style={{
          position: "absolute",
          borderRadius: 0,
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
        }}
        transition={{ duration: transitionDuration, ease: "easeOut" }}
      >
        {children}

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
            pointerEvents: "none",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: transitionDuration }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CasesCatalogPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "+7",
    contactMethod: "WhatsApp",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navigation />

      <div
        className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] min-h-screen"
        style={{ backgroundColor: "#060606", color: "#ffffff" }}
      >
        {/* ── HEADER ───────────────────────────────────────── */}
        <section className="relative pt-40 pb-16 border-b border-white/10 px-[var(--page-margin)]">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ ...GRAIN_STYLE, opacity: 0.05 }}
          />
          <div className="relative z-10 space-y-6 max-w-4xl">
            <Link
              href="/"
              className="no-invert inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 font-sans text-xs uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="w-3 h-3" />
              {formatTypography("Главная")}
            </Link>
            <h1
              className="no-invert font-sans font-semibold text-white leading-[0.95] tracking-tight uppercase"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
            >
              Все кейсы
            </h1>
            <p className="no-invert font-sans text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed">
              {formatTypography("Реализованные проекты для лидеров рынка. От комплексных SMM-стратегий до масштабного видеопроизводства.")}
            </p>
          </div>
        </section>

        {/* ── BENTO GRID SECTION ───────────────────────────── */}
        <section className="relative px-[var(--page-margin)] py-16 bg-[#060606] border-b border-white/10">
          <div className="w-full">
            <BentoGrid className="auto-rows-[240px] md:auto-rows-[280px] gap-x-6 gap-y-12">
              {allCasesData.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-none bg-transparent transition-all duration-300",
                    item.className
                  )}
                >
                  {/* Окно медиа-контента */}
                  <div className="relative w-full flex-grow overflow-hidden bg-transparent rounded-none">
                    <TiltWrapper>
                      {item.video ? (
                        <video
                          src={item.video}
                          poster={item.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-102 group-hover:opacity-90"
                        />
                      ) : item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-102 group-hover:opacity-90"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-950" />
                      )}
                    </TiltWrapper>
                  </div>

                  {/* Надписи под карточкой */}
                  <div className="pt-4 pb-1 bg-transparent z-10 relative flex items-baseline justify-between gap-4">
                    <h3 className="no-invert font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wider transition-colors duration-300 group-hover:text-[#FD4B32] whitespace-nowrap">
                      {item.name}
                    </h3>
                    <p className="no-invert font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest font-medium whitespace-nowrap text-right">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* ── CONTACT FORM SECTION ─────────────────────────── */}
        <section className="relative px-[var(--page-margin)] py-20 md:py-28" id="contacts">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ ...GRAIN_STYLE, opacity: 0.08 }}
          />
          <div className="bg-[#0c0c0c] border border-white/10 relative flex flex-col md:grid h-full w-full md:grid-cols-2 lg:grid-cols-3 rounded-none z-10">
            <IconPlus className="absolute -top-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -top-3 -right-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -bottom-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -right-3 -bottom-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />

            <div className="flex flex-col justify-between lg:col-span-2 h-full">
              <div className="relative h-full flex flex-col justify-between px-5 py-8 md:p-12 gap-8">
                <div className="space-y-6">
                  {/* Новый кастомный заголовок под общую страницу каталога */}
                  <h2 className="no-invert font-headline font-semibold text-white tracking-wide text-[clamp(1.4rem,2.2vw,2.5rem)] leading-[1.0] max-w-xl">
                    {formatTypography("Начнем работу\u00a0над вашим проектом?")}
                  </h2>
                  <p className="no-invert description-text text-white/60 max-w-xl leading-relaxed text-sm sm:text-base">
                    {formatTypography("Если вы\u00a0хотите обсудить проект или\u00a0у\u00a0вас есть вопросы по\u00a0нашим услугам, пожалуйста, заполните форму. Мы\u00a0ответим вам в\u00a0течение 1\u00a0рабочего дня.")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-x-8 gap-y-4 pt-6 border-t border-white/10 mt-auto">
                  <ContactInfoDark icon={IconPhone} value="+7 700 086 8608" />
                  <ContactInfoDark icon={IconMail} value="marketing@thepeak.kz" />
                  <ContactInfoDark icon={IconMapPin} value="Алматы, Казахстан" />
                </div>
              </div>
            </div>
            <div className="bg-white/[0.02] flex h-full w-full items-start border-t border-white/10 p-6 md:py-12 md:px-8 md:col-span-1 md:border-t-0 md:border-l md:border-white/10 rounded-none">
              {submitted ? (
                <div className="w-full text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-[#FD4B32] text-white flex items-center justify-center mx-auto rounded-none no-invert">
                    <IconSend className="w-5 h-5" stroke={1.2} />
                  </div>
                  <h3 className="no-invert font-headline font-semibold text-white text-base leading-[0.9]">
                    {formatTypography("Спасибо за заявку!")}
                  </h3>
                  <p className="no-invert font-sans font-medium text-white/60 text-sm">
                    {formatTypography("Мы свяжемся с вами в течение ближайшего времени.")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-8">
                  <div className="space-y-1.5">
                    <label className="no-invert font-sans text-xs font-extrabold text-white/50 uppercase tracking-widest block">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="no-invert w-full font-sans text-sm text-white bg-transparent border-b border-white/20 focus:border-[#FD4B32] py-2.5 outline-none transition-colors duration-200 rounded-none placeholder-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="no-invert font-sans text-xs font-extrabold text-white/50 uppercase tracking-widest block">
                      Контакты (Телефон)
                    </label>
                    <PhoneInput
                      value={formData.contact}
                      onChange={(val) => setFormData({ ...formData, contact: val })}
                      theme="dark"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="no-invert font-sans text-xs font-extrabold text-white/50 uppercase tracking-widest block">
                      Где с вами связаться?
                    </label>
                    <div className="flex flex-wrap gap-2 w-fit">
                      {["WhatsApp", "Telegram", "Звонок"].map((method) => {
                        const isActive = formData.contactMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData({ ...formData, contactMethod: method })}
                            className={`no-invert py-1.5 px-3 text-center font-sans text-[10px] uppercase tracking-wider font-bold transition-colors duration-200 border cursor-pointer rounded-none ${isActive
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white/50 border-white/20 hover:bg-white/5"
                              }`}
                          >
                            {formatTypography(method)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="no-invert font-sans text-xs font-extrabold text-white/50 uppercase tracking-widest block">
                      О вашем проекте
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Расскажите о задачах и целях проекта..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="no-invert w-full font-sans text-sm text-white bg-transparent border-b border-white/20 focus:border-[#FD4B32] py-2.5 outline-none transition-colors duration-200 resize-none rounded-none placeholder-white/20"
                    />
                  </div>

                  <Button01
                    type="submit"
                    text="Отправить заявку"
                    variant="dark"
                    className="w-full justify-between"
                  />
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}