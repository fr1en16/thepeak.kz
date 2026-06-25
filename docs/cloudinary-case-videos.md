# Интеграция видео кейсов через Cloudinary

Видео загружены в Cloudinary в папку `cases`, внутри нее каждый кейс лежит в папке со своим slug:

```text
cases/
  ark/
  avtopilot/
  bazisa/
  blink/
  bossxo/
  cadillac/
  diskokras/
  double-coffee/
  gippo/
  invictus-academy/
  lukoil/
  mindofbody/
  onmacabim/
  puma/
  racoon/
  ris/
  sensata/
  velmar/
```

Локальная папка `/public/cases` используется как рабочая копия и запасной источник файлов. Она добавлена в `.gitignore`, поэтому новые видео и фото из этой папки не должны попадать в репозиторий.

## Целевая схема

На сайте у каждого кейса есть slug, например `ark`, `gippo`, `sensata`. Для галереи видео нужно получать список файлов из Cloudinary по папке:

```text
cases/{slug}
```

Пример:

```text
cases/ark
cases/gippo
cases/sensata
```

Видео в Cloudinary лежат прямо внутри папки кейса, без дополнительной папки `video`.

Фото для галереи можно добавлять локально прямо в:

```text
public/cases/{slug}
```

Поддерживаемые локальные форматы: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.mp4`, `.webm`, `.mov`, `.m4v`.

## Что нужно добавить в окружение

В `.env.local` для локальной разработки и в переменные окружения Vercel нужно добавить:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`API_SECRET` должен использоваться только на сервере. Не передавать его в клиентские компоненты и не добавлять переменные с префиксом `NEXT_PUBLIC_`.

## Серверный API для сайта

Текущий компонент галереи уже запрашивает:

```text
/api/case-videos?slug={slug}
```

Поэтому оптимальная интеграция: оставить клиентский компонент как есть, а внутри `src/app/api/case-videos/route.ts` заменить чтение локальной папки на запрос к Cloudinary Admin API.

Логика route handler:

1. Принять `slug` из query string.
2. Проверить slug регуляркой `^[a-z0-9-]+$`.
3. Запросить из Cloudinary ресурсы с `type: "upload"`, `resource_type: "video"` и `prefix: "cases/{slug}/"`.
4. Отфильтровать только видео, которые находятся прямо в `cases/{slug}`, без вложенных подпапок.
5. Вернуть массив `media`; `videos` остается как совместимый fallback:

```ts
{
  media: [
    {
      src: "https://res.cloudinary.com/.../video/upload/...",
      name: "Название файла",
      type: "video",
      width: 1080,
      height: 1920
    },
    {
      src: "/cases/ark/photo.webp",
      name: "photo",
      type: "image"
    }
  ],
  videos: []
}
```

Клиентская галерея `CaseVideoGallery` принимает видео и фото в одном массиве и строит masonry-сетку с сохранением исходных пропорций.

Для качества видео route handler добавляет Cloudinary-трансформацию:

```text
q_auto:best
```

Итоговый URL выглядит так:

```text
https://res.cloudinary.com/{cloud}/video/upload/q_auto:best/v.../cases/{slug}/{file}.mp4
```

Это менее агрессивное автоматическое сжатие Cloudinary. Если исходный файл сам загружен в низком разрешении или с сильной компрессией, трансформация не восстановит детали выше качества оригинала.

## Резервный локальный режим

Локальный fallback для разработки без Cloudinary работает так:

1. Сначала пробовать получить список видео из Cloudinary.
2. Если Cloudinary вернул видео, добавить к ним локальные фото из:

```text
public/cases/{slug}
```

3. Если Cloudinary не настроен, вернул ошибку или не нашел видео, читать локальные фото и видео из той же папки.
4. Возвращать локальные URL в формате:

```text
/cases/{slug}/{fileName}
```

Важно: старая схема `public/cases/{slug}/video` больше не совпадает с текущей структурой. Если локальные файлы теперь лежат прямо в папке кейса, route handler тоже должен читать именно `public/cases/{slug}`.

## Как проверить

1. Запустить сайт:

```bash
npm run dev
```

2. Открыть API вручную:

```text
http://localhost:3000/api/case-videos?slug=ark
```

3. Проверить, что ответ содержит `videos` с Cloudinary URL.
4. Открыть страницу кейса:

```text
http://localhost:3000/cases/ark
```

5. Убедиться, что галерея показывает видео и видео запускаются по клику.

## Деплой

Перед деплоем проверить:

1. В Vercel добавлены `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
2. В Git не попали файлы из `/public/cases`.
3. API `/api/case-videos?slug=ark` возвращает Cloudinary URL в production.
4. Страницы кейсов открываются без локальных видеофайлов в репозитории.
