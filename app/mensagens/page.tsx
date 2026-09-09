'use client';

import { useState, useEffect } from 'react';

export default function Mensagens() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  const defaultMessages = [
    { command: '/start', title: 'Bem-vindo ao Luna VIP', text: 'Mensagem configurável pelo administrador.', active: true },
    { command: '/vip', title: 'Área VIP', text: 'Conteúdo exclusivo para membros VIP.', active: true },
    { command: '/suporte', title: 'Suporte', text: 'Entre em contato com a nossa equipe.', active: true },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('luna_messages');
    if (saved) setMessages(JSON.parse(saved));
    else setMessages(defaultMessages);
    setLoading(false);
  }, []);

  const saveMessage = () => {
    if (!editing) return;
    const updated = messages.map(m => m.command === editing.command ? editing : m);
    setMessages(updated);
    localStorage.setItem('luna_messages', JSON.stringify(updated));
    setEditing(null);
    alert('Mensagem salva!');
  };

  const toggleActive = (command: string) => {
    const updated = messages.map(m => m.command === command ? { ...m, active: !m.active } : m);
    setMessages(updated);
    localStorage.setItem('luna_messages', JSON.stringify(updated));
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#8b5cf6]/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-black text-gradient">Mensagens</h1>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.command} className="glass rounded-2xl p-6 hover:border-[#8b5cf6] transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-[#a78bfa]">{msg.command}</h3>
                <button
                  onClick={() => toggleActive(msg.command)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${msg.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {msg.active ? 'ATIVO' : 'INATIVO'}
                </button>
              </div>
              <p className="text-sm font-semibold mb-1">{msg.title}</p>
              <p className="text-gray-400 text-sm">{msg.text}</p>
              <button
                onClick={() => setEditing(msg)}
                className="mt-4 bg-[#8b5cf6] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#7c3aed] transition"
              >
                EDITAR
              </button>
            </div>
          ))}
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-black mb-4 text-gradient">Editar {editing.command}</h3>
              <input
                className="w-full bg-[#0a0a0f] border border-[#8b5cf6]/30 rounded-xl p-3 mb-3 focus:border-[#8b5cf6] outline-none"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Título"
              />
              <textarea
                className="w-full bg-[#0a0a0f] border border-[#8b5cf6]/30 rounded-xl p-3 mb-4 focus:border-[#8b5cf6] outline-none"
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                rows={4}
                placeholder="Texto da mensagem"
              />
              <div className="flex gap-2">
                <button onClick={saveMessage} className="flex-1 bg-[#8b5cf6] rounded-xl p-3 font-bold hover:bg-[#7c3aed] transition">SALVAR</button>
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-700 rounded-xl p-3 font-bold hover:bg-gray-600 transition">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}