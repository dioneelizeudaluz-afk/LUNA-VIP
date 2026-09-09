'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ users: 0, activeUsers: 0, contents: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [botStatus, setBotStatus] = useState('checking');

  useEffect(() => {
    fetchStats();
    checkBot();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Erro stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkBot = async () => {
    try {
      const res = await fetch('/api/bot-status');
      if (res.ok) {
        const data = await res.json();
        setBotStatus(data.status || 'offline');
      } else {
        setBotStatus('offline');
      }
    } catch {
      setBotStatus('offline');
    }
  };

  const menuItems = [
    { title: 'Mensagens', desc: 'Editar mensagens do bot', icon: 'M', path: '/mensagens', color: '#8b5cf6' },
    { title: 'Conteúdos', desc: 'Gerir conteúdos', icon: 'C', path: '/conteudos', color: '#60a5fa' },
    { title: 'Botões', desc: 'Configurar botões', icon: 'B', path: '/botoes', color: '#22c55e' },
    { title: 'Utilizadores', desc: 'Ver utilizadores', icon: 'U', path: '/utilizadores', color: '#a78bfa' },
    { title: 'Definições', desc: 'Configurar bot', icon: 'S', path: '/configuracoes', color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center font-black text-lg shadow-lg shadow-[#8b5cf6]/40">L</div>
            <div>
              <h1 className="text-lg font-black text-gradient">LUNA VIP</h1>
              <p className="text-[10px] text-gray-500">Painel Administrativo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${botStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs text-gray-400">{botStatus === 'online' ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-1">Dashboard</h2>
          <p className="text-gray-400 text-sm">Controle total do seu bot Telegram</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Utilizadores', value: stats.users, color: '#8b5cf6' },
              { label: 'Ativos', value: stats.activeUsers, color: '#22c55e' },
              { label: 'Conteúdos', value: stats.contents, color: '#60a5fa' },
              { label: 'Mensagens', value: stats.messages, color: '#a78bfa' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 card-hover transition-all duration-300">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">{s.label}</p>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {menuItems.map((item, i) => (
            <a key={i} href={item.path} className="glass rounded-2xl p-5 card-hover transition-all duration-300 text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center font-black text-base" style={{ background: item.color + '20', color: item.color }}>
                {item.icon}
              </div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="font-black mb-4 text-gradient">Estado do Sistema</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-400">Telegram Bot</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="text-gray-400">Supabase (não configurado)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}