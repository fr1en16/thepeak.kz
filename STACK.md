# Технологический стек thepeak.kz

## Основа

- **Next.js 16.2.9** — App Router, Server Components, Route Handlers, SSG и динамические серверные маршруты.
- **React 19.2.4** и **React DOM 19.2.4**.
- **TypeScript 5** — строгий режим (`strict: true`), алиас `@/*` указывает на `src/*`.
- **Node.js 20.9+** — минимальная версия, требуемая текущей версией Next.js.
- **npm** — менеджер пакетов; версии зависимостей фиксируются в `package-lock.json`.
- **Turbopack** — сборщик для разработки и production-сборки Next.js.

## Интерфейс и стили

- **Tailwind CSS 4** через `@tailwindcss/postcss`.
- **shadcn 4** с компонентами на базе **Radix UI** и CSS-переменных.
- **tw-animate-css** — CSS-анимации.
- **tailwind-merge**, **clsx**, **class-variance-authority** — формирование и объединение CSS-классов.
- **styled-components 6** — доступен для компонентных стилей.
- **Inter Display** — локальный шрифт через `next/font/local`.
- Иконки: **Lucide React**, **Tabler Icons React** и **React Icons**.

## Анимация и интерактивность

- **Framer Motion / Motion** — переходы страниц и анимации компонентов.
- **Lenis** — плавная прокрутка.
- **Three.js**, **React Three Fiber** и **React Three Drei** — 3D-графика и интерактивные визуализации.
- **GSAP** и `@gsap/react` установлены как дополнительные инструменты анимации.

## Контент и медиа

- Кейсы и метаданные хранятся в TypeScript-файлах внутри `src/data`.
- Локальные изображения и видео находятся в `public`.
- **Cloudinary** используется для видео кейсов; серверный Route Handler получает список ресурсов через Cloudinary API.
- **React Player** и нативное HTML-видео доступны для воспроизведения медиа.
- **react-masonry-css** используется для masonry-раскладок.
- **Notion API Client** установлен, но прямое использование в текущем `src` не обнаружено.

## Серверная часть и интеграции

Backend реализован Route Handlers внутри `src/app/api`:

- `POST /api/contact` отправляет заявку в **Telegram Bot API** и создаёт карточку в **Trello API**.
- `GET /api/case-videos` объединяет медиа из **Cloudinary**, локальных файлов и статического manifest-файла.
- Для работы с файловой системой маршрут медиа использует Node.js runtime.

## SEO и аналитика

- Metadata API Next.js.
- Open Graph и Twitter Card metadata.
- Canonical URL, `robots.txt` и `sitemap.xml`.
- JSON-LD со структурированными данными сайта и организации.
- **Meta Pixel** подключён через `next/script`.

## Развёртывание

- Проект связан с **Vercel** через локальную папку `.vercel`.
- Production-сборка создаётся командой `npm run build`.
- Статические страницы генерируются заранее, API-маршруты выполняются на сервере по запросу.

## Переменные окружения

Секреты должны храниться в `.env.local` локально и в настройках окружения Vercel. Они не должны попадать в Git.

```dotenv
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

TRELLO_API_KEY=
TRELLO_TOKEN=
TRELLO_LIST_ID=
```

## Структура проекта

```text
src/
  app/          страницы, layouts и API Route Handlers
  components/   UI-компоненты и интерактивные блоки
  config/       общая конфигурация приложения
  data/         данные кейсов и manifest медиа
  lib/          SEO и общие вспомогательные функции
  utils/        утилиты, включая русскую типографику
public/         статические изображения, видео и логотипы
docs/           техническая документация проекта
```

## Основные команды

```bash
npm install       # установить зависимости
npm run dev       # запустить локальную разработку
npm run build     # проверить и собрать production-версию
npm run start     # запустить собранную production-версию
npm run lint      # запустить ESLint
```
