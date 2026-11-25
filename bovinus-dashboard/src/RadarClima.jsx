import { useState, useEffect } from 'react';
import { Smile, Star, TrendingUp, MessageSquare } from 'lucide-react';

export default function RadarClima() {
  const [nota, setNota] = useState(4.8);
  const [comentarios, setComentarios] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setNota(prev => { const novaNota = prev + (Math.random() * 0.1 - 0.05); return Math.min(5.0, Math.max(3.5, parseFloat(novaNota.toFixed(1)))); });
      setComentarios(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatus = () => {
    if (nota >= 4.5) return { cor: 'text-green-400', bg: 'bg-green-500/20', msg: 'Excelente! Clima ótimo.' };
    if (nota >= 4.0) return { cor: 'text-yellow-400', bg: 'bg-yellow-500/20', msg: 'Bom, mas pode melhorar.' };
    return { cor: 'text-red-400', bg: 'bg-red-500/20', msg: 'Atenção! Clima ruim.' };
  };
  const status = getStatus();

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><Smile className="text-blue-400" /> Radar de Clima (Feedback do Cliente)</h2>
        <span className="text-sm text-gray-400">Baseado em avaliações no caixa</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-xl flex flex-col items-center justify-center ${status.bg} border border-gray-600`}>
          <span className="text-gray-400 text-sm font-semibold uppercase mb-2">Nota do Almoço Hoje</span>
          <div className="flex items-end gap-2"><span className={`text-6xl font-black ${status.cor}`}>{nota}</span><span className="text-2xl text-gray-400 mb-2">/ 5.0</span></div>
          <div className="flex gap-1 mt-3 text-yellow-400">{[...Array(5)].map((_, i) => (<Star key={i} size={24} fill={i < Math.round(nota) ? "currentColor" : "none"} className={i < Math.round(nota) ? "text-yellow-400" : "text-gray-600"} />))}</div>
          <p className={`mt-4 font-bold ${status.cor}`}>{status.msg}</p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center gap-4"><div className="bg-blue-500/20 p-3 rounded-full text-blue-400"><MessageSquare size={24} /></div><div><p className="text-sm text-gray-400">Comentários Hoje</p><p className="text-2xl font-bold">{comentarios}</p></div></div>
          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center gap-4"><div className="bg-green-500/20 p-3 rounded-full text-green-400"><TrendingUp size={24} /></div><div><p className="text-sm text-gray-400">Tendência</p><p className="text-lg font-bold text-green-400">+12% vs. Ontem</p></div></div>
          <div className="bg-gray-700/50 p-4 rounded-lg text-sm text-gray-300 italic border-l-4 border-blue-500">"A picanha estava excelente, mas a fila da churrasqueira estava grande." - Cliente Anônimo</div>
        </div>
      </div>
    </div>
  );
}