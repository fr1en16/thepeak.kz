import { NextRequest, NextResponse } from "next/server";

// Helper function to escape special characters for Telegram MarkdownV2
function escapeMarkdownV2(text: string): string {
  // First escape backslashes, then other markdown special characters
  return text
    .replace(/\\/g, "\\\\")
    .replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
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

    const escapedName = escapeMarkdownV2(name.trim());
    const escapedPhone = escapeMarkdownV2(phone.trim());
    const escapedComment = comment && typeof comment === "string" && comment.trim()
      ? escapeMarkdownV2(comment.trim())
      : "Не указан";
    const escapedSource = source && typeof source === "string" && source.trim()
      ? escapeMarkdownV2(source.trim())
      : "Не указан";

    const text = [
      "⚡️ *Новая заявка с сайта*",
      `👤 *Имя:* ${escapedName}`,
      `📞 *Телефон:* ${escapedPhone}`,
      `💬 *Проект:* ${escapedComment}`,
      `📍 *Источник:* ${escapedSource}`
    ].join("\n");

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const telegramResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "MarkdownV2",
      }),
    });

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
