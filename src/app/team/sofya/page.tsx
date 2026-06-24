"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// --- Данные проектов ---
const projects = [
  {
    id: "the-peak",
    title: "The Peak",
    role: "Основатель и руководитель агентства",
    logo: "https://static.tildacdn.pro/tild3665-3235-4964-a261-646361656534/Frame_427320961-2.webp",
    description: "Маркетинговое агентство полного цикла с офисом в Алматы, которое объединяет маркетинг, digital, брендинг, разработку сайтов, продакшн и консалтинг. Агентство реализует проекты для бизнеса в Казахстане и за его пределами, помогая компаниям выстраивать маркетинг как полноценную систему роста.",
    listTitle: "Основные направления",
    list: [
      "Маркетинговый консалтинг", "Разработка сайтов и приложений", "SMM и развитие социальных сетей",
      "Контекстная и таргетированная реклама", "Брендинг и фирменный стиль", "Фото- и видеопродакшн",
      "Дизайн и полиграфия", "Построение маркетинговых отделов"
    ],
    brandsTitle: "Среди реализованных кейсов",
    brands: ["UAZ Kazakhstan", "FAW Kazakhstan", "Dodo Pizza Kazakhstan", "Compass Consulting", "Lukoil Lubricants", "Gippo", "KenFasad", "Cadillac Kazakhstan", "METRO"],
  },
  {
    id: "avtopilot",
    title: "Avtopilot Motoshop",
    role: "Сооснователь и руководитель развития проекта",
    logo: "https://static.tildacdn.pro/tild3130-6165-4337-b530-353435343465/Frame_427320966.webp",
    description: "Участие в развитии одного из крупнейших мотопроектов Казахстана.",
    listTitle: "Основные задачи",
    list: [
      "Развитие розничных и онлайн-продаж", "Построение маркетинговой системы", "Развитие e-commerce направления",
      "Развитие бренда и сообщества вокруг мотоспорта", "Организация спортивных мероприятий"
    ],
    footer: "Сегодня Avtopilot Motoshop является одним из крупнейших магазинов Казахстана по ассортименту мотоэкипировки и товаров для мотоспорта.",
    subProject: {
      title: "Пампасы",
      role: "Соорганизатор и продюсер эндуро гонок",
      description: "Организация и проведение крупнейших эндуро-гонок Казахстана.",
      listTitle: "В рамках проекта",
      list: [
        "Разработка концепции мероприятия", "Привлечение партнеров и спонсоров", "Маркетинговое сопровождение",
        "Медиапродюсирование", "Работа с участниками и комьюнити", "Развитие узнаваемости эндуро-спорта в Казахстане"
      ],
      footer: "Соревнования проходят два раза в год и собирают более 150 спортсменов, более 500 зрителей и любителей, партнеров и представителей мотосообщества со всей страны."
    }
  },
  {
    id: "sport-films",
    title: "Спортивные фильмы и медиапроекты",
    role: "Автор и продюсер спортивных фильмов",
    logo: "",
    description: "Реализовала три спортивных документальных проекта:",
    list: [
      "Два фильма об эндуро-культуре и гонках Казахстана",
      "Фильм о развитии вейкбординга в Казахстане"
    ],
    footer: "Фильмы стали инструментом популяризации спорта, привлечения новой аудитории, партнеров и брендов в индустрию."
  },
  {
    id: "lucky-cent",
    title: "Lucky Cent Promotion",
    role: "Один из ключевых маркетологов промоутерской компании",
    logo: "https://static.tildacdn.pro/tild3161-3762-4330-b062-306135316638/Frame_427320967.webp",
    description: "Участие в организации и продвижении профессионального вечера бокса, который состоялся 24 декабря 2022 года в SADU Arena.",
    listTitle: "Основные задачи",
    list: [
      "Маркетинговая стратегия мероприятия", "Продвижение события", "Медиасопровождение",
      "Работа с аудиторией", "Формирование информационного поля вокруг проекта", "Взаимодействие с партнерами и спортивным сообществом"
    ]
  },
  {
    id: "lukoil",
    title: "Lukoil Lubricants Central Asia",
    role: "Разработка и запуск дрифт-команды",
    logo: "https://static.tildacdn.pro/tild3964-6235-4163-b064-303566633861/Frame_427320961.webp",
    description: "Участие в разработке и запуске гоночной команды совместно с Lukoil Lubricants Central Asia.",
    listTitle: "В рамках проекта",
    list: [
      "Разработка концепции команды", "Создание бренд-платформы", "Маркетинговое сопровождение",
      "Интеграция бренда в автоспортивную среду", "Развитие медийного присутствия команды"
    ]
  },
  {
    id: "bereke",
    title: "Береке Халал Ет (Актау)",
    role: "Построение маркетинга и операционной системы",
    logo: "https://static.tildacdn.pro/tild3161-6463-4637-b834-356633623831/Frame_427320964.webp",
    description: "Участие в запуске и масштабировании бренда.",
    listTitle: "Реализовано",
    list: [
      "Создание фирменного стиля", "Разработка визуальной идентичности бренда", "Построение маркетинговой стратегии",
      "Внедрение операционных процессов", "Формирование системы развития бизнеса"
    ]
  },
  {
    id: "kenfasad",
    title: "KenFasad",
    role: "Один из крупнейших производственно-строительных проектов в портфеле",
    logo: "https://static.tildacdn.pro/tild3831-3730-4261-a434-663533313966/Frame_427320969.webp",
    description: "Результаты работы над проектом:",
    listTitle: "Ключевые достижения",
    list: [
      "Более 20 000 лидов", "Более 90 000 посещений сайта за месяц", "Рост продаж через сайт на 35% за год",
      "Рост конверсии онлайн-каналов на 143%", "Создание полноценного отдела маркетинга", "Полный ребрендинг компании"
    ],
    footer: "Успешное масштабирование бизнеса позволило компании выйти на новые международные рынки."
  },
  {
    id: "gippo",
    title: "Gippo",
    role: "Первый стритфуд-бренд Казахстана",
    logo: "https://static.tildacdn.pro/tild6661-3235-4466-b835-303966303638/Frame_427320961-1.webp",
    description: "Результаты работы над проектом:",
    listTitle: "Ключевые достижения",
    list: [
      "Более 3 000 000 охватов за первые месяцы работы", "Рост переходов на сайт и приложение на 43%",
      "Обновление фирменного стиля"
    ]
  },
  {
    id: "taxi-kolesa",
    title: "Taxi Kolesa",
    role: "Один из крупнейших таксопарков Казахстана",
    logo: "https://static.tildacdn.pro/tild3262-6566-4738-b435-346235376268/Frame_427320968.webp",
    description: "Результаты работы над проектом:",
    listTitle: "Ключевые достижения",
    list: [
      "Создание лендингов с конверсией от 8% до 32%", "Более 60% конверсии выхода водителей и курьеров на линию"
    ]
  },
  {
    id: "business-cars",
    title: "Business Cars",
    role: "Премиальная аренда автомобилей",
    logo: "https://static.tildacdn.pro/tild6262-3033-4266-a434-343235346264/Frame_427320963_1.webp",
    description: "Результаты работы над проектом:",
    listTitle: "Ключевые достижения",
    list: [
      "Создание маркетинговой стратегии", "Внедрение операционной системы", "Достижение 90% загрузки автопарка"
    ]
  },
  {
    id: "takara-sushi",
    title: "Takara Sushi",
    role: "Сеть ресторанов японской кухни",
    logo: "https://static.tildacdn.pro/tild6463-3564-4962-b138-663437623836/Frame_427320962.webp",
    description: "Результаты работы над проектом:",
    listTitle: "Ключевые достижения",
    list: [
      "Увеличение возврата клиентов до 2,4 раза в месяц", "Ребрендинг упаковки доставки"
    ]
  }
];

export default function SofyaPage() {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-7xl mx-auto px-6">
      {/* 1. Герой */}
      <section className="mb-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <div className="w-full lg:w-5/12 flex-shrink-0">
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-brand-light-gray">
            <Image src="/team/sofa.webp" alt="Софья Коломеец" fill className="object-cover" priority />
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <div className="flex flex-wrap gap-2 mb-6">
            {["Маркетолог", "Продюсер", "Бренд-стратег"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 border border-brand-gray text-xs uppercase tracking-wider font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8">Коломеец <br /> Софья</h1>
          <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            <p>Маркетолог-практик с опытом запуска, упаковки и масштабирования бизнесов.</p>
            <p>Основатель маркетингового агентства The Peak.</p>
          </div>
        </div>
      </section>

      {/* 2. Кейсы */}
      <section className="w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 border-b border-brand-gray/20 pb-6">Реализованные кейсы</h2>
        <div className="flex flex-col border-t border-brand-gray/20">
          {projects.map((item) => (
            <div key={item.id} className="border-b border-brand-gray/20">
              <button onClick={() => toggleProject(item.id)} className="w-full py-8 flex items-center justify-between gap-6 text-left">
                <div className="flex items-center gap-6">
                  {item.logo && (
                    <div className="w-16 h-16 relative flex-shrink-0 bg-brand-light-gray p-2">
                      <Image src={item.logo} alt={item.title} fill className="object-contain p-1" />
                    </div>
                  )}
                  <div>
                    <span className="text-brand-red text-xs font-semibold uppercase tracking-wider block mb-1">{item.role}</span>
                    <h3 className="text-2xl font-medium">{item.title}</h3>
                  </div>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openProject === item.id ? "rotate-180" : ""}`} />
              </button>

              <div className={`grid transition-all duration-300 ${openProject === item.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden pb-8">
                  <div className="max-w-3xl ml-0 lg:ml-[5.5rem]">
                    <p className="text-lg font-medium mb-6">{item.description}</p>
                    <ul className="space-y-2 mb-6">
                      {item.list.map((li, idx) => <li key={idx} className="flex gap-3 text-lg">✦ {li}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}