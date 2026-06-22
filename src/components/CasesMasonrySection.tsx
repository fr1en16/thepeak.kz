"use client";

import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { formatTypography } from "@/utils/typography";

interface CaseItem {
  logo: string;
  type: string;
  text: string;
  image: string;
  className: string;
  href?: string;
}

const getLogoPath = (logo: string): string => {
  const name = logo.toLowerCase();
  if (name.includes("gippo")) return "/logo/clot-5.webp";
  if (name.includes("dodo")) return "/logo/clot-44.webp";
  if (name.includes("sensata")) return "/logo/clot-11.webp";
  if (name.includes("diskokras")) return "/logo/clot-2.webp";
  if (name.includes("qazsip")) return "/logo/clot-41.webp";
  if (name.includes("lukoil")) return "/logo/clot-12.webp";
  if (name.includes("вираж")) return "/logo/clot-24.webp";
  if (name.includes("тут")) return "/logo/clot-57.webp";
  if (name.includes("metro")) return "/logo/clot-40.webp";
  if (name.includes("compass")) return "/logo/clot-13.webp";
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
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "HIGHTOWER / DODO PIZZA",
      type: "сайт",
      text: "Лендинг для привлечения сотрудников и арендаторов помещений под пиццерии.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "SENSATA GROUP",
      type: "продакшн",
      text: "Имиджевый продакшн полного цикла: от разработки концепции и сценария до съемок масштабных строительных объектов и финального монтажа.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "Diskokras",
      type: "smm",
      text: "Построили личный бренд вокруг владельца, органический рост и живое комьюнити вместо обычной страницы автосервиса.",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "Qazsip",
      type: "таргет",
      text: "Настроили таргет, отсеяли нецелевой трафик — и в первый месяц получили 3 крупные продажи при цене лида меньше $1.30.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "LUKOIL",
      type: "smm",
      text: "Выстроили современную коммуникацию для крупнейшего бренда в нише: Instagram, TikTok, YouTube, дизайн дрифт-кара и х2 рост охватов каждый месяц.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "compass",
      type: "брендинг, сайт",
      text: "Брендинг и сайт для Compass Consulting — одной из крупнейших консалтинговых компаний Узбекистана.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
      href: "#contacts",
    },
    {
      logo: "ВИРАЖ ГРУППА",
      type: "таргет",
      text: "Таргет для автохолдинга Вираж: 40 000+ лидов для FAW Kazakhstan и 10 000+ заявок для UAZ Kazakhstan, стоимость лида от $2.2 до $3.7. Работаем более 3 лет.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "Я ТУТ",
      type: "лого",
      text: "Логотип с тёплой природной эстетикой и глубоким смыслом для базы отдыха.",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "#contacts",
    },
    {
      logo: "METRO",
      type: "продакшн",
      text: "Продакшн рекламных и презентационных роликов для торговой сети: съемки торговых залов, новинок меню и ритейл-эвентов.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
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
                  <img
                    src={item.image}
                    alt={item.logo}
                    className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
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
