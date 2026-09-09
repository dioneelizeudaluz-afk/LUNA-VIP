'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ users: 0, activeUsers: 0, contents: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [botOnline, setBotOnline] = useState(false);

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
    } catch {}
    setLoading(false);
  };

  const checkBot = async () => {
    try {
      const res = await fetch('/api/bot-status');
      if (res.ok) {
        const data = await res.json();
        setBotOnline(data.status === 'online');
      }
    } catch {}
  };

  const menuItems = [
    { title: 'Mensagens', desc: 'Editar mensagens', path: '/mensagens', color: '#8b5cf6', icon: '💬' },
    { title: 'Conteúdos', desc: 'Gerir conteúdos', path: '/conteudos', color: '#60a5fa', icon: '📁' },
    { title: 'Botões', desc: 'Configurar botões', path: '/botoes', color: '#22c55e', icon: '🔘' },
    { title: 'Utilizadores', desc: 'Ver utilizadores', path: '/utilizadores', color: '#a78bfa', icon: '👥' },
    { title: 'Definições', desc: 'Configurar bot', path: '/configuracoes', color: '#f59e0b', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 sidebar flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center font-black text-xl shadow-lg shadow-[#8b5cf6]/50">L</div>
          <div>
            <h1 className="font-black text-lg text-gradient">LUNA VIP</h1>
            <p className="text-[10px] text-gray-500">ADMIN PANEL</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => (
            <a key={i} href={item.path} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#8b5cf6]/20 transition-all text-gray-300 hover:text-white">
              <span>{item.icon}</span>
              <span className="text-sm font-bold">{item.title}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-xs">
          <span className={`w-2 h-2 rounded-full ${botOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-gray-400">{botOnline ? 'Bot Online' : 'Bot Offline'}</span>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center font-black shadow-lg shadow-[#8b5cf6]/40">L</div>
            <h1 className="font-black text-gradient">LUNA VIP</h1>
          </div>
          <span className={`w-2 h-2 rounded-full ${botOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-black mb-2">Dashboard</h2>
            <p className="text-gray-400">Controle total do seu bot Telegram</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-3 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Utilizadores', value: stats.users, color: '#8b5cf6' },
                  { label: 'Ativos', value: stats.activeUsers, color: '#22c55e' },
                  { label: 'Conteúdos', value: stats.contents, color: '#60a5fa' },
                  { label: 'Mensagens', value: stats.messages, color: '#a78bfa' },
                ].map((s, i) => (
                  <div key={i} className="luna-card p-6">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-bold">{s.label}</p>
                    <p className="text-4xl font-black" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-black mb-4">Gestão</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {menuItems.map((item, i) => (
                  <a key={i} href={item.path} className="luna-card p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl" style={{ background: item.color + '25' }}>
                      {item.icon}
                    </div>
                    <p className="font-black text-sm">{item.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}