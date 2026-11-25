import { useState, useEffect } from 'react';
import { ArrowLeft, Armchair, UserCheck, Trash2, CheckCircle2, X } from 'lucide-react';

export default function DetalheMesas({ salao, quantidade, letra, onVoltar }) {
  const [mesas, setMesas] = useState([]);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  useEffect(() => {
    const gerarMesas = () => {
      return Array.from({ length: quantidade }, (_, i) => {
        const status = Math.floor(Math.random() * 3); // 0=Livre, 1=Ocupada, 2=Limpando
        return { id: `${i + 1}${letra}`, status };
      });
    };
    setMesas(gerarMesas());
  }, [quantidade, letra]);

  const definirStatus = (id, novoStatus) => {
    setMesas(prev => prev.map(mesa => mesa.id === id ? { ...mesa, status: novoStatus } : mesa));
    setMesaSelecionada(null); // Fecha o modal
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 0: return { texto: 'Livre', cor: 'border-green-500 bg-green-500/10 text-green-400', icone: <Armchair className="w-5 h-5" /> };
      case 1: return { texto: 'Ocupada', cor: 'border-red-500 bg-red-500/10 text-red-400', icone: <UserCheck className="w-5 h-5" /> };
      case 2: return { texto: 'Limpando', cor: 'border-yellow-500 bg-yellow-500/10 text-yellow-400 animate-pulse', icone: <Trash2 className="w-5 h-5" /> };
      default: return { texto: 'Livre', cor: 'border-green-500 bg-green-500/10 text-green-400', icone: <Armchair className="w-5 h-5" /> };
    }
  };

  const disponiveis = mesas.filter(m => m.status === 0).length;
  const ocupadas = mesas.filter(m => m.status === 1).length;
  const limpando = mesas.filter(m => m.status === 2).length;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <div className="flex items-center gap-4">
            <button onClick={onVoltar} className="bg-gray-700 hover:bg-gray-600 p-3 rounded-xl transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-black">{salao}</h1>
              <p className="text-gray-400">{quantidade} mesas - Identificação {letra}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm font-semibold">
            <span className="flex items-center gap-2 text-green-400"><div className="w-3 h-3 bg-green-500 rounded-full"></div> {disponiveis} Livres</span>
            <span className="flex items-center gap-2 text-red-400"><div className="w-3 h-3 bg-red-500 rounded-full"></div> {ocupadas} Ocupadas</span>
            <span className="flex items-center gap-2 text-yellow-400"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> {limpando} Limpando</span>
          </div>
        </div>

        {/* Grid de Mesas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {mesas.map((mesa) => {
            const info = getStatusInfo(mesa.status);
            return (
              <div 
                key={mesa.id} 
                onClick={() => setMesaSelecionada(mesa)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 hover:scale-105 ${info.cor}`}
              >
                <span className="text-lg font-black">Mesa {mesa.id}</span>
                <div>{info.icone}</div>
                <span className="text-xs font-bold uppercase tracking-wider">{info.texto}</span>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-gray-500 mt-8 text-sm">Clique em uma mesa para alterar o status.</p>
      </div>

      {/* MODAL DE SELEÇÃO DE STATUS */}
      {mesaSelecionada && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-600 relative">
            
            <button 
              onClick={() => setMesaSelecionada(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white">Mesa {mesaSelecionada.id}</h2>
              <p className="text-gray-400 mt-2">Selecione o novo status da mesa</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => definirStatus(mesaSelecionada.id, 0)}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <Armchair className="w-6 h-6" /> Mesa Disponível (Livre)
              </button>

              <button 
                onClick={() => definirStatus(mesaSelecionada.id, 2)}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <Trash2 className="w-6 h-6" /> Limpando Mesa
              </button>

              <button 
                onClick={() => definirStatus(mesaSelecionada.id, 1)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <UserCheck className="w-6 h-6" /> Mesa Ocupada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}