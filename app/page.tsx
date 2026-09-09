'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ users: 0, activeUsers: 0, contents: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        setError('Configure o Supabase para ver dados reais');
      }
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-luna-purple to-luna-glow bg-clip-text text-transparent">
          LUNA VIP
        </h1>
      </header>

      <main className="p-4 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        {loading ? (
          <p className="text-gray-400">Carregando...</p>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Total de Utilizadores</p>
              <p className="text-3xl font-bold text-luna-purple">{stats.users}</p>
            </div>
            <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Utilizadores Ativos</p>
              <p className="text-3xl font-bold text-luna-purple">{stats.activeUsers}</p>
            </div>
            <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Conteúdos</p>
              <p className="text-3xl font-bold text-luna-purple">{stats.contents}</p>
            </div>
            <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Mensagens</p>
              <p className="text-3xl font-bold text-luna-purple">{stats.messages}</p>
            </div>
          </div>
        )}

        <nav className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <a href="/mensagens" className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 text-center hover:border-luna-purple transition">
            Mensagens
          </a>
          <a href="/conteudos" className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 text-center hover:border-luna-purple transition">
            Conteúdos
          </a>
          <a href="/botoes" className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 text-center hover:border-luna-purple transition">
            Botões
          </a>
          <a href="/utilizadores" className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 text-center hover:border-luna-purple transition">
            Utilizadores
          </a>
          <a href="/configuracoes" className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 text-center hover:border-luna-purple transition">
            Configurações
          </a>
        </nav>
      </main>
    </div>
  );
}