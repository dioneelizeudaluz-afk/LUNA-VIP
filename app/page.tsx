'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [botOnline, setBotOnline] = useState(false);

  useEffect(() => {
    fetch('/api/bot-status')
      .then(r => r.json())
      .then(d => setBotOnline(d.status === 'online'))
      .catch(() => setBotOnline(false));
  }, []);

  const menu = [
    { title: 'Mensagens', desc: 'Editar mensagens do bot', path: '/mensagens', icon: '💬', color: '#8b5cf6' },
    { title: 'Conteúdos', desc: 'Gerir conteúdos', path: '/conteudos', icon: '📁', color: '#60a5fa' },
    { title: 'Botões', desc: 'Configurar botões', path: '/botoes', icon: '🔘', color: '#22c55e' },
    { title: 'Utilizadores', desc: 'Ver utilizadores', path: '/utilizadores', icon: '👥', color: '#a78bfa' },
    { title: 'Definições', desc: 'Configurar bot', path: '/configuracoes', icon: '⚙️', color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-[#8b5cf6]/30" style={{ background: 'rgba(10,10,15,0.95)' }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, boxShadow: '0 0 20px rgba(139,92,246,0.5)' }}>L</div>
            <div>
              <h1 style={{ fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LUNA VIP</h1>
              <p style={{ fontSize: 10, color: '#6b7280' }}>PAINEL ADMINISTRATIVO</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: botOnline ? '#22c55e' : '#ef4444', animation: botOnline ? 'pulse 2s infinite' : 'none' }}></div>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{botOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-10">
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>Dashboard</h2>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Controle total do seu bot Telegram</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'UTILIZADORES', value: '0', color: '#8b5cf6' },
            { label: 'ATIVOS', value: '0', color: '#22c55e' },
            { label: 'CONTEÚDOS', value: '0', color: '#60a5fa' },
            { label: 'MENSAGENS', value: '3', color: '#a78bfa' },
          ].map((s, i) => (
            <div key={i} className="card">
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#6b7280', marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Gestão</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {menu.map((item, i) => (
            <a key={i} href={item.path} className="card" style={{ textAlign: 'center', textDecoration: 'none', color: 'white' }}>
              <div style={{ width: 48, height: 48, margin: '0 auto 12px', borderRadius: 14, background: item.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{item.icon}</div>
              <p style={{ fontWeight: 800, fontSize: 14 }}>{item.title}</p>
              <p style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>{item.desc}</p>
            </a>
          ))}
        </div>

        {/* Status */}
        <div className="card mt-10">
          <h3 style={{ fontWeight: 800, marginBottom: 16, background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Estado do Sistema</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: botOnline ? '#22c55e' : '#ef4444' }}></div>
              <span style={{ color: '#9ca3af' }}>Telegram Bot</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ color: '#9ca3af' }}>Supabase (não configurado)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}