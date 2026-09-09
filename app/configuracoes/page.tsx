'use client';

import { useState, useEffect } from 'react';

export default function Configuracoes() {
  const [settings, setSettings] = useState({ botName: 'Luna VIP', welcomeMessage: 'Bem-vindo!', supportMessage: 'Como posso ajudar?' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('luna_settings');
    if (s) setSettings(JSON.parse(s));
  }, []);

  const saveSettings = () => {
    localStorage.setItem('luna_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-luna-purple">Configurações</h1>
        <a href="/" className="text-sm text-gray-400">Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nome do Bot</label>
            <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3" value={settings.botName} onChange={(e) => setSettings({...settings, botName: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Mensagem de Boas-vindas</label>
            <textarea className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3" rows={3} value={settings.welcomeMessage} onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Mensagem de Suporte</label>
            <textarea className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3" rows={3} value={settings.supportMessage} onChange={(e) => setSettings({...settings, supportMessage: e.target.value})} />
          </div>
          <button onClick={saveSettings} className={`w-full rounded-lg p-3 font-bold ${saved ? 'bg-green-500' : 'bg-luna-purple'}`}>
            {saved ? 'SALVO!' : 'SALVAR CONFIGURAÇÕES'}
          </button>
        </div>
      </main>
    </div>
  );
}