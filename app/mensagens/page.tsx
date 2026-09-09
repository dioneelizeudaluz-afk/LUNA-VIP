'use client';

import { useState, useEffect } from 'react';

export default function Mensagens() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [toast, setToast] = useState('');

  const defaultMessages = [
    { command: '/start', title: 'Bem-vindo ao Luna VIP', text: 'Olá! Bem-vindo ao Luna VIP. Escolha uma opção abaixo para começar.', active: true },
    { command: '/vip', title: 'Área VIP', text: 'Conteúdo exclusivo para membros VIP. Em breve teremos novidades!', active: true },
    { command: '/suporte', title: 'Suporte', text: 'Precisa de ajuda? Nossa equipe está pronta para te atender.', active: true },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('luna_messages');
    if (saved) setMessages(JSON.parse(saved));
    else {
      setMessages(defaultMessages);
      localStorage.setItem('luna_messages', JSON.stringify(defaultMessages));
    }
    setLoading(false);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const saveMessage = () => {
    if (!editing) return;
    const updated = messages.map(m => m.command === editing.command ? editing : m);
    setMessages(updated);
    localStorage.setItem('luna_messages', JSON.stringify(updated));
    setEditing(null);
    showToast('Mensagem salva com sucesso!');
  };

  const toggleActive = (command: string) => {
    const updated = messages.map(m => m.command === command ? { ...m, active: !m.active } : m);
    setMessages(updated);
    localStorage.setItem('luna_messages', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gradient">Mensagens</h1>
            <p className="text-xs text-gray-500">Edite as mensagens do bot</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.command} className="glass rounded-2xl p-5 transition-all duration-300 hover:border-[#8b5cf6] hover:shadow-lg hover:shadow-[#8b5cf6]/20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="inline-block bg-[#8b5cf6]/20 text-[#a78bfa] text-xs font-bold px-3 py-1 rounded-full">{msg.command}</span>
                  <h3 className="font-bold mt-2">{msg.title}</h3>
                </div>
                <button
                  onClick={() => toggleActive(msg.command)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${msg.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {msg.active ? 'ATIVO' : 'INATIVO'}
                </button>
              </div>
              <p className="text-gray-400 text-sm">{msg.text}</p>
              <button
                onClick={() => setEditing(msg)}
                className="mt-4 bg-[#8b5cf6] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#7c3aed] transition-all active:scale-95"
              >
                EDITAR
              </button>
            </div>
          ))}
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-black mb-4 text-gradient">Editar {editing.command}</h3>
              <label className="block text-xs text-gray-400 mb-1">Título</label>
              <input
                className="input-field mb-3"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
              <label className="block text-xs text-gray-400 mb-1">Texto</label>
              <textarea
                className="input-field mb-4"
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                rows={4}
              />
              <div className="flex gap-2">
                <button onClick={saveMessage} className="flex-1 btn-primary">SALVAR</button>
                <button onClick={() => setEditing(null)} className="flex-1 btn-secondary">CANCELAR</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-5 py-3 rounded-xl font-bold text-sm z-50 animate-bounce">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}