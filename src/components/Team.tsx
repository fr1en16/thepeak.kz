"use client";

import React from "react";
import { formatTypography } from "@/utils/typography";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Софья Коломеец",
    role: "Основатель, креативный лидер",
    description: "Находит точки роста там, где другие их не видят",
    image: "/team/sofa.webp",
  },
  {
    name: "Сергей Белодедов",
    role: "Арт-директор",
    description: "Создаёт визуал, который выделяет бренды среди конкурентов",
    image: "/team/sergey.webp",
  },
  {
    name: "Софина Хакимова",
    role: "Performance-специалист",
    description:
      "Находит рабочие связки, тестирует гипотезы и превращает рекламу в заявки",
    image: "/team/sofina.webp",
  },
  {
    name: "Яков Пилипюк",
    role: "Сооснователь, дизайнер",
    description: "Наведёт красоту",
    image: "/team/yakov.webp",
  },
];

export default function Team() {
  return (
    <section
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] border-b border-brand-gray/10 bg-brand-light-gray/20 scroll-mt-[clamp(2rem,2.8vw,3.5rem)]"
      id="team"
    >
      {/* 2-Column Swiss Grid Layout */}
      <div className="swiss-grid items-stretch rounded-none w-full">
        {/* Left Column: Philosophical/Intro Text - matches service card width (33.33% on lg, 25% on xl) */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3 text-left pb-[clamp(2.5rem,5vw,4.5rem)] lg:pb-[clamp(3.5rem,7vw,7rem)] pt-0 lg:pr-[var(--grid-gap)] border-solid border-brand-gray/25 border-b lg:border-b-0 lg:border-r self-stretch flex flex-col">
          <div className="max-w-[95%] flex flex-col justify-between flex-grow gap-8 pt-[3rem] md:pt-[var(--page-margin)]">
            <h2 className="no-invert font-headline font-semibold text-brand-gray text-[clamp(1.4rem,2.56vw,1.6rem)] leading-[1.0] select-none">
              {"Каждое"} <br />
              {"направление ThePeak"} <br />
              {"возглавляет специалист"} <br />
              {"с\u00a0практическим опытом"} <br />
              {"в\u00a0своей области"}
            </h2>
            <p className="no-invert description-text text-brand-gray/80">
              {
                "Вы работаете не\u00a0просто с\u00a0безликими подрядчиками, а\u00a0с\u00a0людьми, которые принимают ключевые решения, глубоко погружаются в\u00a0ваш бизнес и\u00a0несут личную ответственность за\u00a0конечный результат."
              }
            </p>
          </div>
        </div>

        {/* Right Column: Grid of Team Members - spans remaining columns (66.67% on lg, 75% on xl) */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 pb-[clamp(2.5rem,5vw,4.5rem)] lg:pb-[clamp(3.5rem,7vw,7rem)] pt-0 lg:pl-[clamp(1.5rem,3vw,3rem)] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 w-full pt-[3rem] md:pt-[var(--page-margin)]">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative w-full aspect-[5/8] sm:aspect-[1/1.68] bg-white border border-brand-gray/15 overflow-hidden rounded-none flex flex-col justify-between group"
              >
                {/* Profile Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                {/* Top Badge: Role */}
                <div className="no-invert absolute top-3 left-3 right-3 z-10 text-white font-sans text-[clamp(0.75rem,0.7vw,0.75rem)] font-bold uppercase tracking-wider leading-tight">
                  {formatTypography(member.role)}
                </div>

                {/* Bottom Info Block */}
                <div className="no-invert mt-auto px-3 pb-3 z-10 text-white flex flex-col items-start gap-2 w-full">
                  <h3 className="no-invert font-headline font-semibold text-[clamp(1rem,1.34vw,1.2rem)] tracking-wide leading-[1.1] w-full">
                    {formatTypography(member.name)}
                  </h3>
                  <p className="no-invert font-sans !text-[0.8rem] md:!text-[clamp(0.8rem,0.85vw,0.85rem)] leading-[1.2] font-medium text-white w-full">
                    {formatTypography(member.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
