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
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(defaultMessages);
    }
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
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-luna-purple">Mensagens</h1>
        <a href="/" className="text-sm text-gray-400">Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.command} className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-luna-glow">{msg.command}</h3>
                <button
                  onClick={() => toggleActive(msg.command)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${msg.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {msg.active ? 'ATIVO' : 'INATIVO'}
                </button>
              </div>
              <p className="text-sm font-semibold">{msg.title}</p>
              <p className="text-gray-400 text-sm">{msg.text}</p>
              <button
                onClick={() => setEditing(msg)}
                className="mt-3 bg-luna-purple text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                EDITAR
              </button>
            </div>
          ))}
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-luna-dark border border-luna-purple rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Editar {editing.command}</h3>
              <input
                className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Título"
              />
              <textarea
                className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-4"
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                rows={4}
                placeholder="Texto da mensagem"
              />
              <div className="flex gap-2">
                <button onClick={saveMessage} className="flex-1 bg-luna-purple rounded-lg p-3 font-bold">SALVAR</button>
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-700 rounded-lg p-3 font-bold">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}