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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#8b5cf6]/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center font-black text-lg shadow-lg shadow-[#8b5cf6]/40">
              L
            </div>
            <h1 className="text-xl font-black text-gradient">LUNA VIP</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-400">Bot Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2">Dashboard</h2>
          <p className="text-gray-400">Controle total do seu bot Telegram</p>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Utilizadores', value: stats.users, color: '#8b5cf6' },
              { label: 'Ativos', value: stats.activeUsers, color: '#22c55e' },
              { label: 'Conteúdos', value: stats.contents, color: '#60a5fa' },
              { label: 'Mensagens', value: stats.messages, color: '#a78bfa' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:border-[#8b5cf6] transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/20">
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Mensagens', icon: 'M', path: '/mensagens' },
            { title: 'Conteúdos', icon: 'C', path: '/conteudos' },
            { title: 'Botões', icon: 'B', path: '/botoes' },
            { title: 'Utilizadores', icon: 'U', path: '/utilizadores' },
            { title: 'Configurações', icon: 'S', path: '/configuracoes' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="glass rounded-2xl p-6 text-center hover:border-[#8b5cf6] transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/20 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-sm font-bold">{item.title}</p>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#8b5cf6] rounded-xl p-4 font-bold hover:bg-[#7c3aed] transition">
              Enviar Mensagem
            </button>
            <button className="bg-[#131320] border border-[#8b5cf6]/30 rounded-xl p-4 font-bold hover:border-[#8b5cf6] transition">
              Ver Relatórios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}