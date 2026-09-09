export function getBotToken(): string {
  return process.env.TELEGRAM_BOT_TOKEN || '';
}

export async function sendMessage(chatId: number, text: string) {
  const token = getBotToken();
  if (!token) throw new Error('Token não configurado');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return res.json();
}

export async function sendAudio(chatId: number, audioUrl: string) {
  const token = getBotToken();
  if (!token) throw new Error('Token não configurado');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendAudio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, audio: audioUrl }),
  });

  return res.json();
}