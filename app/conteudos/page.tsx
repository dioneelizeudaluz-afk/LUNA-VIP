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
    const updated = [newContent, ...contents];
    setContents(updated);
    localStorage.setItem('luna_contents', JSON.stringify(updated));
    setForm({ title: '', description: '', type: 'texto', content: '' });
    setShowForm(false);
  };

  const removeContent = (id: number) => {
    if (!confirm('Remover este conteúdo?')) return;
    const updated = contents.filter(c => c.id !== id);
    setContents(updated);
    localStorage.setItem('luna_contents', JSON.stringify(updated));
  };

  const typeColor: Record<string, string> = {
    texto: '#8b5cf6',
    imagem: '#60a5fa',
    video: '#22c55e',
    audio: '#f59e0b',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/25">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gradient">Conteúdos</h1>
            <p className="text-xs text-gray-500">Gerir conteúdos do bot</p>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Voltar</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <button onClick={() => setShowForm(true)} className="btn-primary w-full mb-6">
          + ADICIONAR CONTEÚDO
        </button>

        {contents.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center text-2xl">📁</div>
            <p className="text-gray-400 font-bold">Nenhum conteúdo adicionado</p>
            <p className="text-gray-500 text-sm mt-1">Adicione seu primeiro conteúdo</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contents.map(c => (
              <div key={c.id} className="glass rounded-2xl p-5 transition-all duration-300 hover:border-[#8b5cf6]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: (typeColor[c.type] || '#8b5cf6') + '20', color: typeColor[c.type] }}>
                    {c.type.toUpperCase()}
                  </span>
                  <button onClick={() => removeContent(c.id)} className="text-gray-500 hover:text-red-400 transition">✕</button>
                </div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-gray-400 text-sm">{c.description || 'Sem descrição'}</p>
                <p className="text-gray-500 text-xs mt-3">{c.createdAt}</p>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-black mb-4 text-gradient">Novo Conteúdo</h3>
              <label className="block text-xs text-gray-400 mb-1">Título</label>
              <input className="input-field mb-3" placeholder="Título do conteúdo" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
              <label className="block text-xs text-gray-400 mb-1">Descrição</label>
              <input className="input-field mb-3" placeholder="Descrição (opcional)" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              <label className="block text-xs text-gray-400 mb-1">Tipo</label>
              <select className="input-field mb-3" value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                <option value="texto">Texto</option>
                <option value="imagem">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
              </select>
              <label className="block text-xs text-gray-400 mb-1">Conteúdo ou URL</label>
              <textarea className="input-field mb-4" rows={3} placeholder="Conteúdo ou URL do ficheiro" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} />
              <div className="flex gap-2">
                <button onClick={addContent} className="flex-1 btn-primary">ADICIONAR</button>
                <button onClick={() => setShowForm(false)} className="flex-1 btn-secondary">CANCELAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}