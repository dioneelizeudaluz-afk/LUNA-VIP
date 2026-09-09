'use client';

import { useState, useEffect } from 'react';

export default function Conteudos() {
  const [contents, setContents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'texto', content: '' });

  useEffect(() => {
    const saved = localStorage.getItem('luna_contents');
    if (saved) setContents(JSON.parse(saved));
  }, []);

  const addContent = () => {
    if (!form.title || !form.content) { alert('Preencha título e conteúdo'); return; }
    const newContent = { ...form, id: Date.now(), createdAt: new Date().toLocaleDateString('pt-BR'), active: true };
    const updated = [...contents, newContent];
    setContents(updated);
    localStorage.setItem('luna_contents', JSON.stringify(updated));
    setForm({ title: '', description: '', type: 'texto', content: '' });
    setShowForm(false);
  };

  const removeContent = (id: number) => {
    const updated = contents.filter(c => c.id !== id);
    setContents(updated);
    localStorage.setItem('luna_contents', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-luna-black text-white">
      <header className="bg-luna-dark border-b border-luna-purple/30 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-luna-purple">Conteúdos</h1>
        <a href="/" className="text-sm text-gray-400">Voltar</a>
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <button onClick={() => setShowForm(true)} className="w-full bg-luna-purple rounded-xl p-4 font-bold mb-4">
          ADICIONAR CONTEÚDO
        </button>

        {contents.length === 0 ? (
          <div className="bg-luna-dark border border-luna-purple/30 rounded-xl p-8 text-center">
            <p className="text-gray-400">Nenhum conteúdo adicionado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contents.map(c => (
              <div key={c.id} className="bg-luna-dark border border-luna-purple/30 rounded-xl p-4">
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-gray-400 text-sm">{c.description || 'Sem descrição'}</p>
                <p className="text-luna-glow text-xs mt-2">{c.type} • {c.createdAt}</p>
                <button onClick={() => removeContent(c.id)} className="mt-3 bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">
                  REMOVER
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-luna-dark border border-luna-purple rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Novo Conteúdo</h3>
              <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" placeholder="Título" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
              <input className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" placeholder="Descrição (opcional)" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              <select className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-3" value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                <option value="texto">Texto</option>
                <option value="imagem">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
              </select>
              <textarea className="w-full bg-luna-black border border-luna-purple/30 rounded-lg p-3 mb-4" rows={3} placeholder="Conteúdo ou URL" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} />
              <div className="flex gap-2">
                <button onClick={addContent} className="flex-1 bg-luna-purple rounded-lg p-3 font-bold">ADICIONAR</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-700 rounded-lg p-3 font-bold">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}