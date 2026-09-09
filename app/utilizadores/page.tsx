'use client';

import { useState, useEffect } from 'react';

export default function Utilizadores() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('luna_users');
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-luna-purple">Utilizadores</h1>
        <a href="/" className="text-sm text-gray-400">Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        {users.length === 0 ? (
          <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-8 text-center">
            <p className="text-gray-400">Nenhum utilizador registrado ainda.</p>
            <p className="text-gray-500 text-sm mt-2">Os utilizadores aparecerão aqui quando interagirem com o bot.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4">
                <h3 className="font-bold">{u.firstName || u.username}</h3>
                <p className="text-gray-400 text-sm">@{u.username || 'sem username'}</p>
                <p className="text-gray-500 text-xs">ID: {u.id}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}