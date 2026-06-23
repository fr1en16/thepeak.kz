"use client";

import React from "react";
import { MorphingText } from "@/components/ui/liquid-text";

interface ServiceItem {
  title: string;
  description: string;
  price: string;
  shape: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "Smm & Digital",
    description:
      "Превращаем социальные сети в инструмент привлечения клиентов. Разрабатываем контент-стратегию, создаем контент, организуем инфлюенс-маркетинг и выстраиваем регулярную коммуникацию с аудиторией. Работаем на рост узнаваемости бренда, вовлеченности и количества обращений.",
    shape: "/shapes/shape-smm.svg",
  },
  {
    title: "Маркетинг и стратегия",
    description:
      "Начинаем с аудита бизнеса и маркетинга, чтобы увидеть реальные точки роста. Формируем стратегию на 6–12 месяцев, выстраиваем путь клиента и определяем инструменты, которые помогут привлекать больше клиентов и масштабировать продажи.",

    shape: "/shapes/shape-marketing.svg",
  },
  {
    title: "Таргет и реклама",
    description:
      "Запускаем рекламу, которая работает в связке с маркетинговой стратегией. Анализируем аудиторию, создаём рекламные связки, тестируем гипотезы и оптимизируем кампании на основе данных. Наша задача не просто привести трафик, а превратить его в заявки и продажи.",

    shape: "/shapes/shape-target.svg",
  },
  {
    title: "Дизайн и брендинг",
    description:
      "Создаём визуальную систему, которая помогает бизнесу выглядеть профессионально и запоминаться. Разрабатываем фирменный стиль, рекламные материалы, презентации и носители бренда, сохраняя единый образ на всех площадках.",

    shape: "/shapes/shape-design.svg",
  },
  {
    title: "Продакшн",
    description:
      "Берём на себя полный цикл создания контента: от идеи, сценария и подбора команды до съёмки, монтажа, графики и адаптации под рекламные площадки. Управляем всеми этапами производства, чтобы каждый материал работал на маркетинговые цели бизнеса и усиливал бренд.",

    shape: "/shapes/shape-production.svg",
  },
  {
    title: "Разработка и web",
    description:
      "Быстрые конверсионные сайты с продуманным UX/UI. Экспресс-лендинги для теста ниши, и корпоративные сайты.",

    shape: "/shapes/shape-web.svg",
  },
  {
    title: "Организация и сопровождение",
    description:
      "Технический надзор, аудит digital-процессов и контроль подрядчиков. Долгосрочная поддержка сайта и консалтинг по оптимизации маркетинга.",

    shape: "/shapes/shape-organization.svg",
  },
];

export default function Services() {
  const handleScrollToContacts = () => {
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] py-[clamp(3.5rem,7vw,7rem)] border-b border-brand-gray/10 bg-white"
      id="services"
    >
      {/* Section Header aligning with Swiss Grid columns */}
      <div className="swiss-grid mb-[clamp(2.5rem,5vw,4.5rem)]">
        <h2 className="col-span-12 font-headline font-black text-brand-gray text-[clamp(1.02rem,2.24vw,1.92rem)] leading-[1.1] uppercase select-none no-invert">
          <span className="inverttext">Услуги, которые</span> <br />
          <span className="inverttext">приносят </span>
          <span className="inline-block relative h-[1.1em] align-bottom text-brand-red select-none">
            <MorphingText
              texts={[
                "результат",
                "гордость",
                "узнаваемость",
                "клиентов",
                "прибыль",
              ]}
              className="absolute left-0 bottom-0 text-left font-headline font-black uppercase text-[clamp(1.02rem,2.24vw,1.92rem)] leading-[1.1]"
            />
          </span>
        </h2>
      </div>

      {/* Nested Grid aligning with Swiss Grid columns */}
      <div className="swiss-grid w-full">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-brand-gray/15 rounded-none w-full">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="isometric-group group relative flex flex-col justify-between p-[clamp(1.5rem,2.5vw,3rem)] bg-white border-r border-b border-brand-gray/15 hover:bg-brand-light-gray/30 transition-colors duration-300 min-h-[clamp(16rem,22vw,25rem)] rounded-none"
            >
              <div>
                {/* Shape Icon */}
                {service.shape && (
                  <div className="mb-[clamp(1rem,1.8vw,2.2rem)] select-none">
                    <img
                      src={service.shape}
                      alt=""
                      className="w-[clamp(1.2rem,1.8vw,2rem)] h-[clamp(1.2rem,1.8vw,2rem)] object-contain"
                    />
                  </div>
                )}
                {/* Title */}
                <h3 className="font-headline font-bold text-brand-gray text-[clamp(0.6rem,0.76vw,0.8rem)] uppercase mb-[clamp(0.75rem,1.5vw,1.5rem)] tracking-wide">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="font-sans font-medium text-brand-gray/75 text-[clamp(0.75rem,0.9vw,0.95rem)] leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Bottom Price & Call-To-Action Arrow Row */}
              <div className="flex justify-between items-end mt-auto pt-4">
                <div className="font-sans text-[clamp(0.85rem,1vw,1.1rem)] font-extrabold text-brand-red uppercase tracking-wider">
                  {service.price}
                </div>
                <div className="p-2 cursor-pointer bg-brand-light-gray group-hover:bg-brand-red group-hover:text-white text-brand-red transition-all duration-300 rounded-none">
                  <svg
                    className="w-3 h-3 transition-transform duration-300 text-current group-hover:translate-x-1"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 6.24873V6.24602L12.4992 6.24737L12.5 6.24873Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.4975 6.24813L12.498 6.2474L12.4975 6.24664V6.24813Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.5 6.19718L9.25837 2.65334e-06L6.28415 0L6.40883 0.242867L9.48923 6.1318L9.45671 6.18785L5.6713 12.4979L6.32043 12.5L8.84349 12.5L12.5 6.19718L12.4116 6.14639Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.8287 6.24875V6.24604L6.82788 6.24739L6.8287 6.24875Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.82622 6.24816L6.82674 6.24742L6.82622 6.24666V6.24816Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.8287 6.1972L3.58707 2.51224e-05L0.612845 2.24691e-05L0.737528 0.242889L3.81792 6.13182L3.78541 6.18787L0 12.4979L0.649126 12.5L3.17219 12.5L6.8287 6.1972L6.7403 6.14641Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Last slot: Elegant CTA card */}
          <div
            onClick={handleScrollToContacts}
            className="group relative flex flex-col justify-between p-[clamp(1.5rem,2.5vw,3rem)] bg-brand-red hover:bg-brand-gray text-white border-r border-b border-brand-gray/15 transition-all duration-300 min-h-[clamp(16rem,22vw,25rem)] cursor-pointer rounded-none"
          >
            <div>
              <h3 className="font-headline font-black text-[clamp(0.7rem,0.89vw,0.96rem)] uppercase tracking-wide mb-[clamp(0.75rem,1.5vw,1.5rem)]">
                Есть индивидуальный запрос?
              </h3>
              <p className="font-sans font-medium text-[clamp(0.75rem,0.9vw,0.95rem)] opacity-85 leading-relaxed">
                Расскажите нам о ваших бизнес-целях. Мы подготовим индивидуальную
                стратегию продвижения и сделаем расчет стоимости под ваши
                требования.
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4">
              <span className="font-sans font-bold uppercase tracking-wider text-[clamp(0.75rem,0.9vw,0.9rem)]">
                Обсудить проект
              </span>
              <div className="p-2 bg-white/20 text-white rounded-none">
                <svg
                  className="w-3 h-3 transition-transform duration-300 text-current group-hover:translate-x-1"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 6.24873V6.24602L12.4992 6.24737L12.5 6.24873Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.4975 6.24813L12.498 6.2474L12.4975 6.24664V6.24813Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.5 6.19718L9.25837 2.65334e-06L6.28415 0L6.40883 0.242867L9.48923 6.1318L9.45671 6.18785L5.6713 12.4979L6.32043 12.5L8.84349 12.5L12.5 6.19718L12.4116 6.14639Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.8287 6.24875V6.24604L6.82788 6.24739L6.8287 6.24875Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.82622 6.24816L6.82674 6.24742L6.82622 6.24666V6.24816Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.8287 6.1972L3.58707 2.51224e-05L0.612845 2.24691e-05L0.737528 0.242889L3.81792 6.13182L3.78541 6.18787L0 12.4979L0.649126 12.5L3.17219 12.5L6.8287 6.1972L6.7403 6.14641Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
