'use client';

import { useState, useEffect } from 'react';

export default function Configuracoes() {
  const [settings, setSettings] = useState({ botName: 'Luna VIP', welcomeMessage: 'Bem-vindo ao Luna VIP!', supportMessage: 'Como posso ajudar?' });
  const [saved, setSaved] = useState(false);
  const [botInfo, setBotInfo] = useState<any>(null);

  useEffect(() => {
    const s = localStorage.getItem('luna_settings');
    if (s) setSettings(JSON.parse(s));
    checkBot();
  }, []);

  const checkBot = async () => {
    try {
      const res = await fetch('/api/bot-status');
      if (res.ok) {
        const data = await res.json();
        if (data.bot) setBotInfo(data.bot);
      }
    } catch {}
  };

  const saveSettings = () => {
    localStorage.setItem('luna_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gradient">Definições</h1>
            <p className="text-xs text-gray-500">Configurar o bot</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {botInfo && (
          <div className="glass rounded-2xl p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center font-black">
              {botInfo.first_name?.charAt(0) || 'B'}
            </div>
            <div>
              <h3 className="font-bold">{botInfo.first_name || 'Bot'}</h3>
              <p className="text-gray-400 text-sm">@{botInfo.username || 'sem username'}</p>
            </div>
            <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">CONECTADO</span>
          </div>
        )}

        <div className="glass rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-bold">NOME DO BOT</label>
            <input className="input-field" value={settings.botName} onChange={(e) => setSettings({...settings, botName: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-bold">MENSAGEM DE BOAS-VINDAS</label>
            <textarea className="input-field" rows={3} value={settings.welcomeMessage} onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-bold">MENSAGEM DE SUPORTE</label>
            <textarea className="input-field" rows={3} value={settings.supportMessage} onChange={(e) => setSettings({...settings, supportMessage: e.target.value})} />
          </div>
          <button onClick={saveSettings} className={`w-full rounded-xl p-4 font-black transition ${saved ? 'bg-green-500' : 'btn-primary'}`}>
            {saved ? 'SALVO COM SUCESSO!' : 'SALVAR DEFINIÇÕES'}
          </button>
        </div>
      </main>
    </div>
  );
}