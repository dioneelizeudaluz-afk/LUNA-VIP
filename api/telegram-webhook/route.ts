import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'TELEGRAM_BOT_TOKEN não configurado' }, { status: 500 });
    }

    const message = body.message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text || '';

    let responseText = 'Mensagem recebida!';

    if (text === '/start') {
      responseText = 'Bem-vindo ao Luna VIP!';
    } else if (text === '/vip') {
      responseText = 'Área VIP em breve!';
    } else if (text === '/suporte') {
      responseText = 'Como posso ajudar?';
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseText,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no webhook' }, { status: 500 });
  }
}