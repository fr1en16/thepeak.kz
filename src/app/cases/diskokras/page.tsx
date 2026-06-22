"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import HorizontalMediaGallery from "@/components/ui/bento-gallery";
import { formatTypography } from "@/utils/typography";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconPlus,
  IconPhone,
  IconMail,
  IconMapPin,
  IconSend,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Button01 } from "@/components/ui/nextjsshop-button";
import PhoneInput from "@/components/ui/PhoneInput";

// ─── Gallery Data ──────────────────────────────────────────────────────────────
const diskokrasGallery = [
  { name: "Покраска дисков", role: "Satin Black", src: "/cases/vozdukh.mp4", aspect: "4/5" },
  { name: "Зеркальный блеск", role: "Полировка", src: "/cases/vozdukh.mp4", aspect: "9/16" },
  { name: "Стиль кузова", role: "Carbon Fiber", src: "/cases/vozdukh.mp4", aspect: "4/5" },
  { name: "Керамика 9H", role: "Защитный слой", src: "/cases/vozdukh.mp4", aspect: "9/16" },
  { name: "Салон автомобиля", role: "Детализация", src: "/cases/vozdukh.mp4", aspect: "4/5" },
  { name: "Вирусные Reels", role: "2.4M просмотров", src: "/cases/vozdukh.mp4", aspect: "9/16" },
];

// ─── Content Blocks ────────────────────────────────────────────────────────────
const contentBlocks = [
  {
    chapter: "01 / Концепция",
    text: "Мы начали работу с проектом в ноябре 2024 года. И с самого начала понимали — здесь нельзя делать обычный автосервисный Instagram. Нужно было создать бренд, у которого есть лицо, энергия и свой вайб.",
  },
  {
    chapter: "02 / Реализация",
    text: "Построили весь проект вокруг личного бренда владельца: его знаний, подачи, отношения к машинам и людям. Именно это стало фундаментом всего визуала, контента и коммуникации. Мы полностью выстроили SMM‑направление: от позиционирования и атмосферы аккаунта до форматов Reels, подачи, смыслов и визуального стиля.",
  },
  {
    chapter: "03 / Результат",
    text: "За время работы Diskokras начал расти органически. Люди начали приходить через рекомендации, сохранения, Reels и узнаваемость. Сегодня аккаунт воспринимается уже не как страница сервиса, а как полноценный автомобильный бренд со своей эстетикой, подачей и комьюнити вокруг него. И это именно тот результат, который мы любим больше всего — когда бренд начинает вызывать эмоцию.",
  },
];

// ─── Grain SVG as data URL ─────────────────────────────────────────────────────
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

function ContactInfoDark({
  icon: Icon,
  value,
  className,
  ...props
}: ContactInfoDarkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPhone = value === "+7 700 086 8608";

  if (isPhone) {
    return (
      <div
        className={cn("flex items-center gap-4 py-3 rounded-none select-none", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <a
          href="tel:+77000868608"
          aria-label="Call +7 700 086 8608"
          className="bg-white/5 p-3 rounded-none flex items-center justify-center flex-shrink-0 text-[#FD4B32] hover:text-white hover:bg-[#FD4B32] transition-colors duration-200 border border-white/10 cursor-pointer no-invert"
        >
          <Icon className="h-5 w-5" />
        </a>
        <div className="relative flex items-center h-12 w-48 overflow-hidden">
          {/* Display Phone Number */}
          <span
            className={cn(
              "font-sans font-bold text-sm text-white uppercase tracking-wider transition-all duration-300 absolute left-0 whitespace-nowrap no-invert",
              isHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
            )}
          >
            {value}
          </span>

          {/* Hover Icons Container (Telegram & WhatsApp only) */}
          <div
            className={cn(
              "flex items-center gap-3 transition-all duration-300 absolute left-0",
              isHovered
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            {/* Telegram Link */}
            <a
              href="https://t.me/+77000868608"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="no-invert p-3 bg-white/5 hover:bg-[#FD4B32] text-white hover:text-white transition-colors duration-200 border border-white/10 rounded-none flex items-center justify-center cursor-pointer"
            >
              <IconBrandTelegram className="w-5 h-5" stroke={1.2} />
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/77000868608"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="no-invert p-3 bg-white/5 hover:bg-[#FD4B32] text-white hover:text-white transition-colors duration-200 border border-white/10 rounded-none flex items-center justify-center cursor-pointer"
            >
              <IconBrandWhatsapp className="w-5 h-5" stroke={1.2} />
            </a>
          </div>
        </div>
      </div>
    );
  }

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

// ─── Component ─────────────────────────────────────────────────────────────────
export default function DiskokrasCasePage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    contactMethod: "WhatsApp",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const commentText = formData.message.trim()
        ? `${formData.message.trim()}\n\n[Способ связи: ${formData.contactMethod}]`
        : `[Способ связи: ${formData.contactMethod}]`;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.contact.trim(),
          comment: commentText,
          source: "Кейс Diskokras (Хотите такие же результаты и контент?)",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          contact: "",
          contactMethod: "WhatsApp",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
      setStatus("error");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Global nav (sits above, inherits site styles) ── */}
      <Navigation />

      {/* ══════════════════════════════════════════════════════
          DARK WRAPPER — full dark theme isolated from swiss-grid
          ══════════════════════════════════════════════════════ */}
      <div
        className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)]"
        style={{ backgroundColor: "#060606", color: "#ffffff" }}
      >

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden border-b border-white/10">

          {/* Background Cover Image (Desktop) */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-35 hidden md:block"
            style={{
              backgroundImage: "url('/cases/diskokras.png')",
            }}
          />

          {/* Background Cover Image (Mobile) */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-35 block md:hidden"
            style={{
              backgroundImage: "url('/cases/diskokras_m.webp')",
            }}
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#060606] via-[#060606]/40 to-[#060606]/85" />

          {/* Grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ ...GRAIN_STYLE, opacity: 0.13 }}
          />

          {/* Back link */}
          <div className="relative z-10 px-[var(--page-margin)] pt-40">
            <Link
              href="/#cases"
              className="no-invert inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 font-sans text-xs uppercase tracking-[0.2em]"
            >
              <ArrowLeft className="w-3 h-3" />
              {formatTypography("Все кейсы")}
            </Link>
          </div>

          {/* Hero headline */}
          <div className="relative z-10 px-[var(--page-margin)] pt-16 pb-20 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-end">

              {/* Left: eyebrow + title */}
              <div className="lg:col-span-8 space-y-6">
                <h1
                  className="no-invert font-sans font-semibold text-white leading-[0.9] tracking-tight"
                  style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
                >
                  Diskokras
                </h1>
              </div>

              {/* Right: description + meta */}
              <div className="lg:col-span-4 space-y-8">
                <p
                  className="no-invert font-sans text-white/60 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                >
                  {formatTypography("Построение полноценного автомобильного бренда со своей эстетикой, подачей и комьюнити вокруг личного бренда.")}
                </p>

                {/* Meta grid */}
                <div className="grid grid-cols-3 gap-px border border-white/10">
                  {[
                    { label: "Старт", value: "Ноябрь 2024" },
                    { label: "Услуга", value: "SMM" },
                    { label: "Направление", value: "Автодетейлинг" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="p-4 border border-white/10"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <p className="no-invert font-sans text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                        {label}
                      </p>
                      <p className="no-invert font-sans text-white text-sm font-semibold">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="https://instagram.com/diskokras.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-invert inline-flex items-center gap-3 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-sans px-6 py-4 hover:border-white/60 hover:bg-white/5 transition-all duration-300 group w-full justify-between"
                  style={{ borderRadius: 0 }}
                >
                  {formatTypography("Смотреть профиль")}
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="mt-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="no-invert text-[10px] font-sans text-white/20 uppercase tracking-[0.3em]">
                {formatTypography("2024 — н.\u00a0в.")}
              </span>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT — Asymmetric Swiss blocks ───────── */}
        {contentBlocks.map(({ chapter, text }, idx) => (
          <section
            key={chapter}
            className="relative border-b border-white/10"
            style={{
              background:
                idx % 2 === 1
                  ? "rgba(255,255,255,0.02)"
                  : "transparent",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{ ...GRAIN_STYLE, opacity: 0.06 }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-px px-[var(--page-margin)] py-20 md:py-28">

              {/* Left: chapter label (≈25%) */}
              <div className="lg:col-span-3 flex flex-col justify-between gap-6 mb-8 lg:mb-0">
                <div>
                  <span
                    className="no-invert font-sans text-[10px] uppercase tracking-[0.3em] text-white/25 block mb-3"
                  >
                    {chapter}
                  </span>
                  <div className="h-px w-10 bg-white/15" />
                </div>

                {/* Decorative index number */}
                <div
                  className="no-invert font-sans font-semibold text-white/05 select-none"
                  style={{ fontSize: "clamp(5rem, 8vw, 9rem)", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Right: content (≈75%) */}
              <div className="lg:col-span-9 lg:pl-16">
                <p
                  className="no-invert font-sans text-white/85 leading-[1.6]"
                  style={{ fontSize: "clamp(1.15rem, 2vw, 1.65rem)", letterSpacing: "-0.02em" }}
                >
                  {formatTypography(text)}
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* ── VIDEO GALLERY ─────────────────────────────────── */}
        <section className="relative border-b border-white/10">
          <HorizontalMediaGallery
            items={diskokrasGallery}
            className="w-full"
          />
        </section>

        {/* ── CONTACT FORM SECTION ─────────────────────────── */}
        <section
          className="relative border-b border-white/10 px-[var(--page-margin)] py-20 md:py-28"
          id="contacts"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ ...GRAIN_STYLE, opacity: 0.08 }}
          />
          <div
            className="bg-[#0c0c0c] border border-white/10 relative flex flex-col md:grid h-full w-full md:grid-cols-2 lg:grid-cols-3 rounded-none z-10"
          >
            <IconPlus className="absolute -top-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -top-3 -right-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -bottom-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
            <IconPlus className="absolute -right-3 -bottom-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />

            <div className="flex flex-col justify-between lg:col-span-2 h-full">
              <div className="relative h-full flex flex-col justify-between px-5 py-8 md:p-12 gap-8">
                <div className="space-y-6">
                  <h2 className="no-invert font-headline font-semibold text-white tracking-wide text-[clamp(1.4rem,2.2vw,2.5rem)] leading-[1.0] max-w-xl">
                    {formatTypography("Хотите такие\u00a0же результаты\u00a0и контент?")}
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
            <div
              className="bg-white/[0.02] flex h-full w-full items-start border-t border-white/10 p-6 md:py-12 md:px-8 md:col-span-1 md:border-t-0 md:border-l md:border-white/10 rounded-none"
            >
              {status === "success" ? (
                <div className="w-full text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center mx-auto rounded-none no-invert">
                    <IconSend className="w-5 h-5" stroke={1.5} />
                  </div>
                  <h3 className="no-invert font-headline font-semibold text-white text-base leading-[1.2]">
                    {formatTypography("Заявка отправлена")}
                  </h3>
                  <p className="no-invert font-sans font-medium text-white/60 text-sm">
                    {formatTypography("Мы свяжемся с вами за 15 минут.")}
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
                      disabled={status === "loading"}
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="no-invert w-full font-sans text-sm text-white bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 outline-none transition-colors duration-200 rounded-none placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      variant="box"
                      required
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
                            disabled={status === "loading"}
                            onClick={() => setFormData({ ...formData, contactMethod: method })}
                            className={`no-invert py-1.5 px-3 text-center font-sans text-[10px] uppercase tracking-wider font-bold transition-all duration-200 border cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed ${isActive
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white/50 border-white/20 hover:bg-white/5 hover:text-white"
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
                      disabled={status === "loading"}
                      placeholder="Расскажите о задачах и целях проекта..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="no-invert w-full font-sans text-sm text-white bg-white/5 border border-white/10 focus:border-white/30 px-4 py-3 outline-none transition-colors duration-200 resize-none rounded-none placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 font-sans text-xs font-semibold">
                      Произошла ошибка при отправке заявки. Пожалуйста, свяжитесь с нами напрямую или попробуйте ещё раз.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center bg-white text-black font-medium py-3.5 tracking-wider uppercase text-xs transition-opacity duration-200 cursor-pointer rounded-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100"
                  >
                    {status === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}