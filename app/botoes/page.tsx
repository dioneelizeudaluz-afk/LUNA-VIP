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

  return (
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-luna-purple">Botões</h1>
        <a href="/" className="text-sm text-gray-400">Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <button onClick={() => setShowForm(true)} className="w-full bg-luna-purple rounded-xl p-4 font-bold mb-4">
          ADICIONAR BOTÃO
        </button>

        {buttons.length === 0 ? (
          <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-8 text-center">
            <p className="text-gray-400">Nenhum botão configurado.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {buttons.map(b => (
              <div key={b.id} className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{b.text}</h3>
                  <p className="text-gray-400 text-sm">{b.action} • {b.target || 'Sem destino'}</p>
                </div>
                <button onClick={() => toggleActive(b.id)} className={`px-3 py-1 rounded-full text-xs font-bold ${b.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {b.active ? 'ATIVO' : 'INATIVO'}
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-luna-dark border border-luna-purple rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Novo Botão</h3>
              <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" placeholder="Nome interno" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" placeholder="Texto exibido" value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} />
              <select className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" value={form.action} onChange={(e) => setForm({...form, action: e.target.value})}>
                <option value="mensagem">Abrir mensagem</option>
                <option value="url">Abrir URL</option>
                <option value="conteudo">Enviar conteúdo</option>
                <option value="suporte">Suporte</option>
              </select>
              <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-4" placeholder="Destino (URL ou comando)" value={form.target} onChange={(e) => setForm({...form, target: e.target.value})} />
              <div className="flex gap-2">
                <button onClick={addButton} className="flex-1 bg-luna-purple rounded-lg p-3 font-bold">ADICIONAR</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-700 rounded-lg p-3 font-bold">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}