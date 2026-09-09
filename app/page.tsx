'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [botOnline, setBotOnline] = useState(false);

  useEffect(() => {
    fetch('/api/bot-status')
      .then(r => r.json())
      .then(d => setBotOnline(d.status === 'online'))
      .catch(() => {});
  }, []);

  const navItems = [
    { label: 'Dashboard', path: '/', active: true },
    { label: 'Mensagens', path: '/mensagens', active: false },
    { label: 'Conteúdos', path: '/conteudos', active: false },
    { label: 'Botões', path: '/botoes', active: false },
    { label: 'Utilizadores', path: '/utilizadores', active: false },
    { label: 'Configurações', path: '/configuracoes', active: false },
  ];

  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar flex flex-col">
        <div className="p-5 border-b border-[#2a2d3a]">
          <h1 className="text-lg font-bold text-white">LUNA VIP</h1>
          <p className="text-xs text-gray-500">Painel Admin</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item, i) => (
            <a key={i} href={item.path} className={`nav-item ${item.active ? 'active' : ''}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-5 border-t border-[#2a2d3a]">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${botOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs text-gray-400">{botOnline ? 'Bot Online' : 'Bot Offline'}</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-gray-500">Visão geral do seu bot</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-xs text-gray-500 mb-2">TOTAL UTILIZADORES</p>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 mb-2">ATIVOS</p>
            <p className="text-2xl font-bold text-green-400">0</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 mb-2">CONTEÚDOS</p>
            <p className="text-2xl font-bold text-blue-400">0</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 mb-2">MENSAGENS</p>
            <p className="text-2xl font-bold text-purple-400">3</p>
          </div>
        </div>

        {/* Bot Status */}
        <div className="card mb-8">
          <h3 className="font-semibold text-white mb-4">Status do Bot</h3>
          <div className="flex items-center gap-4">
            <span className={`badge ${botOnline ? 'badge-green' : 'badge-red'}`}>
              {botOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
            <span className="text-sm text-gray-400">
              {botOnline ? 'Bot conectado e funcionando' : 'Configure o token na Vercel'}
            </span>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden grid grid-cols-3 gap-2">
          <a href="/mensagens" className="btn text-center">Mensagens</a>
          <a href="/conteudos" className="btn text-center">Conteúdos</a>
          <a href="/utilizadores" className="btn text-center">Utilizadores</a>
        </div>
      </main>
    </div>
  );
}