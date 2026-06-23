import { NextRequest, NextResponse } from "next/server";

// Helper function to escape HTML special characters for Telegram HTML mode
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, comment, source } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Имя обязательно для заполнения" },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Телефон обязателен для заполнения" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment variables");
      return NextResponse.json(
        { error: "Ошибка конфигурации сервера (переменные Telegram не настроены)" },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeComment = comment && typeof comment === "string" && comment.trim()
      ? escapeHtml(comment.trim())
      : "Не указан";
    const safeSource = source && typeof source === "string" && source.trim()
      ? escapeHtml(source.trim())
      : "Не указан";

    const text = [
      "⚡️ <b>Новая заявка с сайта</b>",
      `👤 <b>Имя:</b> ${safeName}`,
      `📞 <b>Телефон:</b> ${safePhone}`,
      `💬 <b>Проект:</b> ${safeComment}`,
      `📍 <b>Источник:</b> ${safeSource}`
    ].join("\n");

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // 1. Prepare Telegram request promise
    const telegramPromise = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    // 2. Prepare Trello request promise if credentials are provided
    const trelloKey = process.env.TRELLO_API_KEY;
    const trelloToken = process.env.TRELLO_TOKEN;
    const trelloListId = process.env.TRELLO_LIST_ID;

    let trelloPromise = Promise.resolve();
    if (trelloKey && trelloToken && trelloListId) {
      const trelloUrl = new URL("https://api.trello.com/1/cards");
      trelloUrl.searchParams.append("key", trelloKey);
      trelloUrl.searchParams.append("token", trelloToken);
      trelloUrl.searchParams.append("idList", trelloListId);

      const trelloDesc = [
        `Имя: ${name.trim()}`,
        `Телефон: ${phone.trim()}`,
        `Комментарий: ${comment && typeof comment === "string" ? comment.trim() : "Не указан"}`,
        `Источник: ${source && typeof source === "string" ? source.trim() : "Не указан"}`
      ].join("\n");

      trelloPromise = fetch(trelloUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Заявка от ${name.trim()}`,
          desc: trelloDesc,
          pos: "top",
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          console.error("Trello API Error Response:", errMsg);
        } else {
          console.log("Successfully created Trello card for client:", name.trim());
        }
      }).catch((err) => {
        console.error("Failed to submit request to Trello:", err);
      });
    } else {
      console.warn("Trello integration is skipped: TRELLO_API_KEY, TRELLO_TOKEN or TRELLO_LIST_ID is missing");
    }

    // 3. Execute both requests concurrently, but await completion to keep serverless function active
    const [telegramResponse] = await Promise.all([
      telegramPromise,
      trelloPromise
    ]);

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Telegram API Error Response:", errorData);
      return NextResponse.json(
        { error: "Не удалось отправить сообщение в Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
