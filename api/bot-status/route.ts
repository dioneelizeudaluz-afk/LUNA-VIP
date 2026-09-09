import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ status: 'offline', message: 'Token não configurado' });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ status: 'online', bot: data.result });
    }
    return NextResponse.json({ status: 'offline' });
  } catch {
    return NextResponse.json({ status: 'offline' });
  }
}