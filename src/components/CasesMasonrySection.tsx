"use client";

import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { formatTypography } from "@/utils/typography";

interface CaseItem {
  logo: string;
  type: string;
  text: string;
  image?: string;
  video?: string;
  className: string;
  href?: string;
}

const getLogoPath = (logo: string): string => {
  const name = logo.toLowerCase();
  if (name.includes("qazsip")) return "/cases/logo/Qazsip.webp";
  if (name.includes("gippo")) return "/cases/logo/Gippo.webp";
  if (name.includes("sensata")) return "/cases/logo/Сенсата.webp";
  if (name.includes("metro")) return "/cases/logo/Метро.webp";
  if (name.includes("lukoil")) return "/cases/logo/Лукойл.webp";
  if (name.includes("compass")) return "/cases/logo/Компасс.webp";
  if (name.includes("dodo")) return "/cases/logo/Додо.webp";
  if (name.includes("diskokras")) return "/cases/logo/Дискокрас.webp";
  if (name.includes("вираж")) return "/cases/logo/Вираж.webp";
  if (name.includes("марафон")) return "/cases/logo/Алматы Марафон.webp";
  return "";
};

const renderBrandLogo = (logo: string) => {
  const logoPath = getLogoPath(logo);
  const parts = logo.split(" / ");
  const displayName = parts[parts.length - 1]; // take "DODO PIZZA" from "HIGHTOWER / DODO PIZZA"
  
  if (logoPath) {
    return (
      <img
        src={logoPath}
        alt={displayName}
        className="h-[42px] w-auto max-w-[150px] object-contain select-none"
      />
    );
  }
  
  return (
    <span className="font-sans font-extrabold text-[12px] tracking-wider text-white uppercase leading-none select-none">
      {displayName}
    </span>
  );
};

export default function CasesMasonrySection() {
  const casesData: CaseItem[] = [
    {
      logo: "GIPPO",
      type: "smm, таргет",
      text: "Построили дерзкий street food-бренд в Instagram и TikTok: viral-контент, офлайн-активации и механики, которые давали х2 рост продаж за два дня.",
      image: "/cases/gippo.webp",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "HIGHTOWER / DODO PIZZA",
      type: "сайт",
      text: "Лендинг для привлечения сотрудников и арендаторов помещений под пиццерии.",
      image: "/cases/dodo.webp",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "SENSATA GROUP",
      type: "продакшн",
      text: "Рыба плавает в воде, ест других рыб и иногда попадает на крючок. Некоторые рыбы большие, некоторые маленькие. Рыба — это рыба.",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "Diskokras",
      type: "smm",
      text: "Построили личный бренд вокруг владельца, органический рост и живое комьюнити вместо обычной страницы сервиса.",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "/cases/diskokras",
    },
    {
      logo: "Qazsip",
      type: "таргет",
      text: "Настроили таргет, отсеяли нецелевой трафик — и в первый месяц 3 крупные продажи при цене лида меньше $1.30.",
      image: "/cases/qazsip.webp",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "LUKOIL",
      type: "smm",
      text: "Выстроили современную коммуникацию для одного из крупнейших брендов в нише: Instagram, TikTok, YouTube, дизайн для дрифт-команды и х2 рост охватов каждый месяц.",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "compass",
      type: "брендинг, сайт",
      text: "Брендинг и сайт для Compass Consulting — одной из крупнейших консалтинговых компаний Узбекистана.",
      image: "/cases/compass.webp",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "ВИРАЖ ГРУППА",
      type: "таргет",
      text: "Таргет для автомобильного холдинга Вираж — 40 000+ лидов для FAW Kazakhstan и 10 000+ заявок для UAZ Kazakhstan, стоимость лида от $2.2 до $3.7. Работаем более 3 лет.",
      image: "/cases/viraz.webp",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "Я ТУТ",
      type: "лого",
      text: "Логотип с тёплой природной эстетикой и глубоким смыслом для базы отдыха.",
      image: "/cases/yatut.webp",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "АЛМАТЫ МАРАФОН",
      type: "мероприятие",
      text: "Рыба плавает в воде, ест других рыб и иногда попадает на крючок. Некоторые рыбы большие, некоторые маленькие. Рыба — это рыба.",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "METRO",
      type: "продакшн",
      text: "Рыба плавает в воде, ест других рыб и иногда попадает на крючок. Некоторые рыбы большие, некоторые маленькие. Рыба — это рыба.",
      image: "/cases/metro.webp",
      video: "/cases/metro.mp4",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
      href: "#contacts",
    },
  ];

  return (
    <section
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] overflow-hidden pt-[3rem] md:pt-[var(--page-margin)] pb-12 bg-white select-none scroll-mt-[clamp(2rem,2.8vw,3.5rem)]"
      id="cases"
    >
      {/* Header Container */}
      <div className="swiss-grid mb-16">
        <div className="col-span-12 md:col-start-7 md:col-span-6 lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 text-left">
          <h2 className="font-headline font-semibold text-brand-gray text-[clamp(1.6rem,2.91vw,2.5rem)] leading-[0.9] mb-6 no-invert">
            {formatTypography("За каждым кейсом стоят стратегия, сильная команда и конкретные показатели.")}
          </h2>
          <p className="description-text text-brand-gray/80 max-w-[900px] no-invert">
            {formatTypography(
              "Мы работаем с бизнесом, который хочет расти, а не просто присутствовать в digital.",
            )}
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="swiss-grid">
        <div className="col-span-12 w-full">
          <BentoGrid>
            {casesData.map((item, i) => (
              <BentoCard
                key={i}
                className={item.className}
                href={item.href}
                background={
                  item.video ? (
                    <video
                      src={item.video}
                      poster={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.logo}
                      className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-black" />
                  )
                }
                logo={renderBrandLogo(item.logo)}
                type={item.type}
                text={formatTypography(item.text)}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
