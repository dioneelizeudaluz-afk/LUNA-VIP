'use client';

import { useState, useEffect } from 'react';

export default function Utilizadores() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('luna_users');
    if (saved) setUsers(JSON.parse(saved));
    setLoading(false);
  }, []);

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
            <h1 className="text-xl font-black text-gradient">Utilizadores</h1>
            <p className="text-xs text-gray-500">Utilizadores do bot</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {users.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center text-2xl">👤</div>
            <p className="text-gray-400 font-bold">Nenhum utilizador registrado</p>
            <p className="text-gray-500 text-sm mt-1">Os utilizadores aparecerão aqui quando interagirem com o bot no Telegram</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="glass rounded-2xl p-5 flex items-center gap-4 transition-all hover:border-[#8b5cf6]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center font-black">
                  {(u.firstName || 'U').charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{u.firstName || 'Sem nome'}</h3>
                  <p className="text-gray-400 text-sm">@{u.username || 'sem username'}</p>
                  <p className="text-gray-500 text-xs">ID: {u.id}</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">ATIVO</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}