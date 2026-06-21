'use client';

import React from "react";
import { MorphingText } from "@/components/ui/liquid-text";
import { IconHover3D } from "@/components/ui/icon-hover-3d";

interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "Smm & Digital",
    description:
      "Превращаем социальные сети в инструмент привлечения клиентов. Разрабатываем контент-стратегию, создаем контент, организуем инфлюенс-маркетинг и выстраиваем регулярную коммуникацию с аудиторией. Работаем на рост узнаваемости бренда, вовлеченности и количества обращений.",
    price: "от 350 000 ₸",
  },
  {
    title: "Маркетинг и стратегия",
    description:
      "Начинаем с аудита бизнеса и маркетинга, чтобы увидеть реальные точки роста. Формируем стратегию на 6–12 месяцев, выстраиваем путь клиента и определяем инструменты, которые помогут привлекать больше клиентов и масштабировать продажи.",
    price: "от 600 000 ₸",
  },
  {
    title: "Таргет и реклама",
    description:
      "Запускаем рекламу, которая работает в связке с маркетинговой стратегией. Анализируем аудиторию, создаём рекламные связки, тестируем гипотезы и оптимизируем кампании на основе данных. Наша задача не просто привести трафик, а превратить его в заявки и продажи.",
    price: "от 200 000 ₸",
  },
  {
    title: "Дизайн и брендинг",
    description:
      "Создаём визуальную систему, которая помогает бизнесу выглядеть профессионально и запоминаться. Разрабатываем фирменный стиль, рекламные материалы, презентации и носители бренда, сохраняя единый образ на всех площадках.",
    price: "от 100 000 ₸",
  },
  {
    title: "Продакшн",
    description:
      "Берём на себя полный цикл создания контента: от идеи, сценария и подбора команды до съёмки, монтажа, графики и адаптации под рекламные площадки. Управляем всеми этапами производства, чтобы каждый материал работал на маркетинговые цели бизнеса и усиливал бренд.",
    price: "Расчет индивидуально",
  },
  {
    title: "Разработка и web",
    description:
      "Быстрые конверсионные сайты с продуманным UX/UI. Экспресс-лендинги для теста ниши, и корпоративные сайты.",
    price: "от 250 000 ₸",
  },
  {
    title: "Организация и сопровождение",
    description:
      "Технический надзор, аудит digital-процессов и контроль подрядчиков. Долгосрочная поддержка сайта и консалтинг по оптимизации маркетинга.",
    price: "от 150 000 ₸",
  },
  {
    title: "Индивидуальный проект",
    description:
      "Разрабатываем и реализуем уникальные маркетинговые и технологические решения под специфические бизнес-задачи вашего бренда.",
    price: "Расчет индивидуально",
  },
];

export default function ServicesDuplicate() {
  return (
    <section
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] py-[clamp(3.5rem,7vw,7rem)] border-b border-brand-gray/10 bg-brand-light-gray/10"
      id="services-interactive"
    >
      {/* Section Header aligning with Swiss Grid columns */}
      <div className="swiss-grid mb-[clamp(2.5rem,5vw,4.5rem)]">
        <h2 className="col-span-12 font-headline font-black text-brand-gray text-[clamp(1.02rem,2.24vw,1.92rem)] leading-[1.1] uppercase select-none no-invert">
          <span className="inverttext">Интерактивный</span> <br />
          <span className="inverttext">формат </span>
          <span className="inline-block relative h-[1.1em] align-bottom text-brand-red select-none">
            <MorphingText
              texts={[
                "услуг",
                "опыта",
                "развития",
                "дизайна",
                "будущего",
              ]}
              className="absolute left-0 bottom-0 text-left font-headline font-black uppercase text-[clamp(1.02rem,2.24vw,1.92rem)] leading-[1.1]"
            />
          </span>
        </h2>
      </div>

      {/* Grid wrapper for the custom interactive 3D Hover cards */}
      <div className="swiss-grid w-full">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <IconHover3D
              key={index}
              heading={service.title}
              text={service.description}
              price={service.price}
              height="auto"
              style={{
                height: "100%",
                minHeight: "260px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
