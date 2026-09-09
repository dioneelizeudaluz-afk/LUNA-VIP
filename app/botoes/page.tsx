'use client';

import { useState, useEffect } from 'react';

export default function Botoes() {
  const [buttons, setButtons] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', text: '', action: 'mensagem', target: '', order: 1 });

  useEffect(() => {
    const saved = localStorage.getItem('luna_buttons');
    if (saved) setButtons(JSON.parse(saved));
  }, []);

  const addButton = () => {
    if (!form.name || !form.text) { alert('Preencha nome e texto'); return; }
    const newBtn = { ...form, id: Date.now(), active: true };
    const updated = [...buttons, newBtn];
    setButtons(updated);
    localStorage.setItem('luna_buttons', JSON.stringify(updated));
    setForm({ name: '', text: '', action: 'mensagem', target: '', order: 1 });
    setShowForm(false);
  };

  const toggleActive = (id: number) => {
    const updated = buttons.map(b => b.id === id ? { ...b, active: !b.active } : b);
    setButtons(updated);
    localStorage.setItem('luna_buttons', JSON.stringify(updated));
  };

  const removeButton = (id: number) => {
    if (!confirm('Remover este botão?')) return;
    const updated = buttons.filter(b => b.id !== id);
    setButtons(updated);
    localStorage.setItem('luna_buttons', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gradient">Botões</h1>
            <p className="text-xs text-gray-500">Configurar botões do bot</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <button onClick={() => setShowForm(true)} className="btn-primary w-full mb-6">
          + ADICIONAR BOTÃO
        </button>

        {buttons.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-gray-400 font-bold">Nenhum botão configurado</p>
            <p className="text-gray-500 text-sm mt-1">Adicione botões para o seu bot</p>
          </div>
        ) : (
          <div className="space-y-3">
            {buttons.map(b => (
              <div key={b.id} className="glass rounded-2xl p-5 flex justify-between items-center transition-all hover:border-[#8b5cf6]">
                <div>
                  <h3 className="font-bold">{b.text}</h3>
                  <p className="text-gray-400 text-xs mt-1">{b.action} → {b.target || 'Sem destino'}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => toggleActive(b.id)} className={`px-3 py-1 rounded-full text-xs font-bold ${b.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {b.active ? 'ON' : 'OFF'}
                  </button>
                  <button onClick={() => removeButton(b.id)} className="text-gray-500 hover:text-red-400 transition">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-black mb-4 text-gradient">Novo Botão</h3>
              <label className="block text-xs text-gray-400 mb-1">Nome interno</label>
              <input className="input-field mb-3" placeholder="Ex: btn_vip" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              <label className="block text-xs text-gray-400 mb-1">Texto exibido</label>
              <input className="input-field mb-3" placeholder="Ex: Área VIP" value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} />
              <label className="block text-xs text-gray-400 mb-1">Ação</label>
              <select className="input-field mb-3" value={form.action} onChange={(e) => setForm({...form, action: e.target.value})}>
                <option value="mensagem">Abrir mensagem</option>
                <option value="url">Abrir URL</option>
                <option value="conteudo">Enviar conteúdo</option>
                <option value="suporte">Suporte</option>
              </select>
              <label className="block text-xs text-gray-400 mb-1">Destino</label>
              <input className="input-field mb-4" placeholder="URL ou comando" value={form.target} onChange={(e) => setForm({...form, target: e.target.value})} />
              <div className="flex gap-2">
                <button onClick={addButton} className="flex-1 btn-primary">ADICIONAR</button>
                <button onClick={() => setShowForm(false)} className="flex-1 btn-secondary">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}