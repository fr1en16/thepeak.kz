"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CONTACTS } from "@/config/contacts";
import { formatTypography } from "@/utils/typography";
import { Button01 } from "@/components/ui/nextjsshop-button";
import PhoneInput from "@/components/ui/PhoneInput";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";
import {
    IconTarget,
    IconChartInfographic,
    IconShieldCheck,
    IconAppWindow,
    IconBuildingSkyscraper,
    IconShoppingCart,
    IconSparkles,
    IconSettingsUp,
    IconPlus,
    IconPhone,
    IconMail,
    IconMapPin,
    IconSend,
    IconBrandTelegram,
    IconBrandWhatsapp,
} from "@tabler/icons-react";

// ─── Grain SVG Background (Из страницы кейса) ──────────────────────────────
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
    const isPhone = value === CONTACTS.phone.display;

    if (isPhone) {
        return (
            <div
                className={cn("flex items-center gap-4 py-3 rounded-none select-none", className)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <a
                    href={CONTACTS.phone.tel}
                    aria-label={CONTACTS.phone.ariaLabel}
                    className="bg-white/5 p-3 rounded-none flex items-center justify-center flex-shrink-0 text-[#FD4B32] hover:text-white hover:bg-[#FD4B32] transition-colors duration-200 border border-white/10 cursor-pointer no-invert"
                >
                    <Icon className="h-5 w-5" />
                </a>
                <div className="relative flex items-center h-12 w-48 overflow-hidden">
                    <span
                        className={cn(
                            "font-sans font-bold text-sm text-white uppercase tracking-wider transition-all duration-300 absolute left-0 whitespace-nowrap no-invert",
                            isHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                        )}
                    >
                        {value}
                    </span>

                    <div
                        className={cn(
                            "flex items-center gap-3 transition-all duration-300 absolute left-0",
                            isHovered
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-95 pointer-events-none"
                        )}
                    >
                        <a
                            href={CONTACTS.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                            className="no-invert p-3 bg-white/5 hover:bg-[#FD4B32] text-white hover:text-white transition-colors duration-200 border border-white/10 rounded-none flex items-center justify-center cursor-pointer"
                        >
                            <IconBrandTelegram className="w-5 h-5" stroke={1.2} />
                        </a>

                        <a
                            href={CONTACTS.whatsappUrl}
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

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function WebClient() {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        contactMethod: "WhatsApp",
        message: "",
          privacyConsent: true,
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleScrollToContacts = () => {
        const contactsSection = document.getElementById("contacts");
        if (contactsSection) {
            contactsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.contact.trim() || !formData.privacyConsent) {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.contact.trim(),
                    comment: commentText,
                    source: "Страница разработки сайтов (Подвал)",
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", contact: "", contactMethod: "WhatsApp", message: "", privacyConsent: true });
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Failed to submit form:", err);
            setStatus("error");
        }
    };

    return (
        <>
            {/* 1. HERO SECTION */}
            <section className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] pt-[100px] md:pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,8vw,6rem)] border-b border-brand-gray/10 bg-white">
                <div className="swiss-grid relative w-full">
                    <div className="col-span-12 lg:col-span-10 xl:col-span-9">
                        <h1 className="no-invert font-headline font-semibold text-brand-gray text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-[-0.03em] mb-8">
                            {formatTypography("Сайт, который работает как маркетинговый инструмент")}
                        </h1>
                        <p className="no-invert description-text text-brand-gray/80 max-w-2xl text-[clamp(1.1rem,1.4vw,1.25rem)] mb-10">
                            {formatTypography(
                                "Создаем готовые инструменты продаж без стресса, лишних вопросов и бесконечных переделок. Получите сайт, который приносит прибыль и окупает вложения."
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
                            <Button01
                                onClick={handleScrollToContacts}
                                text={formatTypography("Обсудить задачу и рассчитать стоимость")}
                                variant="dark"
                                className="w-full sm:w-auto scale-100 origin-left cursor-pointer"
                            />
                            <p className="no-invert font-sans text-[11px] text-brand-gray/50 uppercase tracking-wider font-bold max-w-xs leading-snug m-0">
                                Без давления и навязчивых продаж.<br /> Ответим в течение часа.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ПОЧЕМУ ВАШ ПРОЕКТ ОБРЕЧЕН НА УСПЕХ */}
            <section className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] bg-brand-light-gray/20 border-b border-brand-gray/10">
                <div className="swiss-grid py-[clamp(4rem,7vw,6rem)]">
                    <h2 className="col-span-12 md:col-start-4 md:col-span-9 font-headline font-semibold text-brand-gray text-[clamp(1.8rem,3vw,3rem)] leading-[0.9] mb-[clamp(3rem,5vw,4rem)] select-none no-invert">
                        {formatTypography("Почему ваш проект")} <br />
                        <span className="text-brand-red">{formatTypography("обречен на успех")}</span>
                    </h2>

                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 border-t border-l border-brand-gray/15 w-full">
                        {[
                            {
                                icon: IconTarget,
                                title: "Фокус на качестве, а не потоке",
                                desc: "Берем ограниченное число заказов. Ваш проект получает 100% внимания команды — никакой конвейерной работы.",
                            },
                            {
                                icon: IconChartInfographic,
                                title: "Маркетинг — основа",
                                desc: "Не просто рисуем дизайн, а детально изучаем вашу нишу, воронку, конкурентов и закрываем возражения аудитории еще до разработки.",
                            },
                            {
                                icon: IconShieldCheck,
                                title: "Сайт под ключ с гарантией",
                                desc: "Отдаем полностью протестированный, адаптированный под все устройства сайт с настроенной аналитикой и интеграцией CRM.",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col justify-between p-[clamp(2rem,3vw,3rem)] bg-white border-r border-b border-brand-gray/15 min-h-[320px] rounded-none hover:bg-brand-red transition-colors duration-300"
                            >
                                <div className="flex flex-col z-10">
                                    <feature.icon className="w-10 h-10 mb-8 text-brand-red group-hover:text-white transition-colors duration-300 stroke-[1.2]" />
                                    <h3 className="no-invert font-headline font-semibold text-[clamp(1.3rem,1.5vw,1.5rem)] text-brand-gray group-hover:text-white transition-colors duration-300 leading-tight mb-4">
                                        {formatTypography(feature.title)}
                                    </h3>
                                    <p className="no-invert font-sans text-brand-gray/70 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed">
                                        {formatTypography(feature.desc)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. ФОРМАТЫ САЙТОВ */}
            <section className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] bg-[#060606] text-white border-b border-white/10 py-[clamp(4rem,7vw,7rem)]">
                <div className="swiss-grid items-start">
                    <div className="col-span-12 lg:col-span-5 mb-10 lg:mb-0 pr-0 lg:pr-8">
                        <h2 className="no-invert font-headline font-bold text-white text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.0] tracking-tight">
                            {formatTypography("Какой формат сайта решит вашу задачу?")}
                        </h2>
                        <Button01
                            onClick={handleScrollToContacts}
                            text={formatTypography("Помогите выбрать")}
                            variant="dark"
                            className="mt-10 border-white/20 hover:border-white text-white hover:bg-white hover:text-black hidden lg:flex cursor-pointer"
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-7 flex flex-col border-t border-white/10">
                        {[
                            {
                                icon: IconAppWindow,
                                title: "Лендинг",
                                desc: "Для быстрой продажи одной услуги/товара или сбора заявок.",
                            },
                            {
                                icon: IconBuildingSkyscraper,
                                title: "Корпоративный сайт",
                                desc: "Для масштабного представления компании и каталога услуг.",
                            },
                            {
                                icon: IconShoppingCart,
                                title: "Интернет-магазин",
                                desc: "Для автоматизации продаж и приема платежей онлайн.",
                            },
                            {
                                icon: IconSparkles,
                                title: "Промо-сайт",
                                desc: "Для компактного или нестандартного присутствия бренда в сети.",
                            },
                            {
                                icon: IconSettingsUp,
                                title: "Доработки и Редизайн",
                                desc: "Если сайт уже есть, но его нужно улучшить, обновить визуал или настроить интеграции (CRM, оплата).",
                            },
                        ].map((format, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-6 py-8 border-b border-white/10 group">
                                <div className="bg-white/5 p-4 rounded-none border border-white/10 flex-shrink-0 group-hover:bg-[#FD4B32] group-hover:border-[#FD4B32] transition-colors duration-300">
                                    <format.icon className="w-6 h-6 text-white" stroke={1.2} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="no-invert font-headline font-semibold text-xl text-white tracking-wide">
                                        {formatTypography(format.title)}
                                    </h3>
                                    <p className="no-invert font-sans text-white/50 text-base leading-relaxed">
                                        {formatTypography(format.desc)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 lg:hidden">
                            <Button01
                                onClick={handleScrollToContacts}
                                text={formatTypography("Помогите выбрать формат")}
                                variant="dark"
                                className="w-full border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. КОМФОРТНЫЕ УСЛОВИЯ */}
            <section className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] bg-white border-b border-brand-gray/10 py-[clamp(4rem,7vw,7rem)]">
                <div className="swiss-grid">
                    <div className="col-span-12 relative border border-brand-gray/15 p-[clamp(2rem,4vw,4rem)] flex flex-col lg:flex-row gap-12 justify-between items-start rounded-none bg-brand-light-gray/10">
                        <IconPlus className="absolute -top-3 -left-3 h-6 w-6 text-brand-red select-none" stroke={1.2} />
                        <IconPlus className="absolute -top-3 -right-3 h-6 w-6 text-brand-red select-none" stroke={1.2} />
                        <IconPlus className="absolute -bottom-3 -left-3 h-6 w-6 text-brand-red select-none" stroke={1.2} />
                        <IconPlus className="absolute -right-3 -bottom-3 h-6 w-6 text-brand-red select-none" stroke={1.2} />

                        <div className="w-full lg:w-5/12">
                            <h2 className="no-invert font-headline font-semibold text-brand-gray text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[0.9] tracking-tight">
                                {formatTypography("Комфортные условия работы")}
                            </h2>
                        </div>

                        <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                            <div>
                                <h4 className="no-invert font-sans font-bold text-brand-gray uppercase tracking-wider text-xs mb-3">Фиксированная стоимость</h4>
                                <p className="no-invert font-sans text-brand-gray/70 text-sm leading-relaxed">
                                    {formatTypography("Платите за решение задачи, а не за количество часов. Цена не вырастет в процессе.")}
                                </p>
                            </div>
                            <div>
                                <h4 className="no-invert font-sans font-bold text-brand-gray uppercase tracking-wider text-xs mb-3">Поэтапная оплата</h4>
                                <p className="no-invert font-sans text-brand-gray/70 text-sm leading-relaxed">
                                    {formatTypography("При необходимости делим всю сумму на 2-3 фиксированных платежа по официальному договору.")}
                                </p>
                            </div>
                            <div className="sm:col-span-2">
                                <h4 className="no-invert font-sans font-bold text-brand-gray uppercase tracking-wider text-xs mb-3">Вы не остаетесь одни</h4>
                                <p className="no-invert font-sans text-brand-gray/70 text-sm leading-relaxed max-w-xl">
                                    {formatTypography("Техническая поддержка, помощь с наполнением контентом и передача всех исходных файлов уже включены в итоговую стоимость.")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ПОДВАЛ / ТЕМНАЯ ЗЕРНИСТАЯ ФОРМА (Из DiskokrasCasePage) */}
            <section className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] relative border-b border-white/10 py-20 md:py-28 bg-[#060606]" id="contacts">
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{ ...GRAIN_STYLE, opacity: 0.08 }}
                />
                <div className="swiss-grid relative z-10">
                    <div className="col-span-12 bg-[#0c0c0c] border border-white/10 relative flex flex-col md:grid h-full w-full md:grid-cols-2 lg:grid-cols-3 rounded-none">
                        <IconPlus className="absolute -top-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
                        <IconPlus className="absolute -top-3 -right-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
                        <IconPlus className="absolute -bottom-3 -left-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />
                        <IconPlus className="absolute -right-3 -bottom-3 h-6 w-6 text-[#FD4B32] select-none no-invert" stroke={1.2} />

                        <div className="flex flex-col justify-between lg:col-span-2 h-full">
                            <div className="relative h-full flex flex-col justify-between px-5 py-8 md:p-12 gap-8">
                                <div className="space-y-6">
                                    <h2 className="no-invert font-headline font-semibold text-white tracking-wide text-[clamp(1.4rem,2.2vw,2.5rem)] leading-[1.0] max-w-xl">
                                        {formatTypography("Оставьте заявку и\u00a0узнайте стоимость и\u00a0сроки")}
                                    </h2>
                                    <p className="no-invert description-text text-white/60 max-w-xl leading-relaxed text-sm sm:text-base">
                                        {formatTypography("Расскажите о\u00a0своей цели, и\u00a0мы\u00a0предложим оптимальный формат сайта с\u00a0аргументацией каждого решения. Ответим в\u00a0течение 1\u00a0рабочего дня.")}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-x-8 gap-y-4 pt-6 border-t border-white/10 mt-auto">
                                    <ContactInfoDark icon={IconPhone} value={CONTACTS.phone.display} />
                                    <ContactInfoDark icon={IconMail} value={CONTACTS.email} />
                                    <ContactInfoDark icon={IconMapPin} value={CONTACTS.address} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] flex h-full w-full items-start border-t border-white/10 p-6 md:py-12 md:px-8 md:col-span-1 md:border-t-0 md:border-l md:border-white/10 rounded-none">
                            {status === "success" ? (
                                <div className="w-full text-center py-10 space-y-4">
                                    <div className="w-12 h-12 bg-[#FD4B32] text-white flex items-center justify-center mx-auto rounded-none no-invert">
                                        <IconSend className="w-5 h-5" stroke={1.2} />
                                    </div>
                                    <h3 className="no-invert font-headline font-semibold text-white text-base leading-[0.9]">
                                        {formatTypography("Заявка отправлена")}
                                    </h3>
                                    <p className="no-invert font-sans font-medium text-white/60 text-sm">
                                        {formatTypography("Мы свяжемся с вами в ближайшее время.")}
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
                                            className="no-invert w-full font-sans text-sm text-white bg-transparent border-b border-white/20 focus:border-[#FD4B32] py-2.5 outline-none transition-colors duration-200 rounded-none placeholder-white/20 disabled:opacity-50"
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
                                                        className={`no-invert py-1.5 px-3 text-center font-sans text-[10px] uppercase tracking-wider font-bold transition-colors duration-200 border cursor-pointer rounded-none disabled:opacity-50 ${isActive
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
                                            disabled={status === "loading"}
                                            placeholder="Расскажите о задачах и целях проекта..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="no-invert w-full font-sans text-sm text-white bg-transparent border-b border-white/20 focus:border-[#FD4B32] py-2.5 outline-none transition-colors duration-200 resize-none rounded-none placeholder-white/20 disabled:opacity-50"
                                        />
                                    </div>

                                    <PrivacyConsentCheckbox
              checked={formData.privacyConsent}
              onCheckedChange={(checked) => setFormData({ ...formData, privacyConsent: checked })}
              disabled={status === "loading"}
              variant="dark"
            />

            {status === "error" && (
                                        <p className="text-red-500 font-sans text-xs font-semibold">
                                            Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.
                                        </p>
                                    )}

                                    <Button01
                                        type="submit"
                                        disabled={status === "loading"}
                                        text={status === "loading" ? "Отправка..." : "Отправить заявку"}
                                        variant="dark"
                                        className="w-full justify-between cursor-pointer"
                                    />
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Логотип / Копирайт под формой */}
                    <div className="col-span-12 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="font-sans text-xs text-white/40 no-invert">
                            © {new Date().getFullYear()} ThePeak. Все права защищены.
                        </p>
                        <Link
                            href="/privacy"
                            className="font-sans text-xs text-white/40 hover:text-[#FD4B32] transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-[#FD4B32] no-invert"
                        >
                            Политика конфиденциальности
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
