import { useState, useEffect } from 'react';
import { Armchair, UserCheck, Trash2, Receipt, Plus, X } from 'lucide-react';

export default function PainelMesas() {
  const [mesas, setMesas] = useState([
    { id: 1, status: 0, garcom: 'Carlos' },
    { id: 2, status: 1, garcom: 'Mariana' },
    { id: 3, status: 2, garcom: 'João' },
    { id: 4, status: 0, garcom: 'Carlos' },
    { id: 5, status: 1, garcom: 'Ana' },
    { id: 6, status: 3, garcom: 'Mariana' },
    { id: 7, status: 0, garcom: 'João' },
    { id: 8, status: 1, garcom: 'Carlos' },
  ]);

  // Simula a mudança de status das mesas a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMesas(prevMesas => {
        const novasMesas = [...prevMesas];
        if (novasMesas.length === 0) return novasMesas; // Evita erro se não tiver mesas
        
        const mesaAleatoria = Math.floor(Math.random() * novasMesas.length);
        const statusAtual = novasMesas[mesaAleatoria].status;
        let novoStatus = statusAtual;
        
        if (statusAtual === 0) novoStatus = 1;
        else if (statusAtual === 1) novoStatus = 3;
        else if (statusAtual === 3) novoStatus = 2;
        else if (statusAtual === 2) novoStatus = 0;

        novasMesas[mesaAleatoria].status = novoStatus;
        return novasMesas;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // FUNÇÃO PARA ADICIONAR UMA NOVA MESA
  const adicionarMesa = () => {
    const nomesGarcons = ['Carlos', 'Mariana', 'João', 'Ana', 'Pedro'];
    const garcomAleatorio = nomesGarcons[Math.floor(Math.random() * nomesGarcons.length)];
    const novoId = mesas.length > 0 ? Math.max(...mesas.map(m => m.id)) + 1 : 1;

    setMesas([...mesas, { id: novoId, status: 0, garcom: garcomAleatorio }]);
  };

  // FUNÇÃO PARA REMOVER UMA MESA
  const removerMesa = (id) => {
    if (window.confirm(`Tem certeza que deseja remover a Mesa ${id}?`)) {
      setMesas(mesas.filter(mesa => mesa.id !== id));
    }
  };

  const renderMesa = (mesa) => {
    let corBorda, corFundo, icone, texto, corTexto;

    switch (mesa.status) {
      case 0: corBorda = 'border-green-500'; corFundo = 'bg-green-500/10'; corTexto = 'text-green-400'; icone = <Armchair className="w-8 h-8" />; texto = 'Livre'; break;
      case 1: corBorda = 'border-red-500'; corFundo = 'bg-red-500/10'; corTexto = 'text-red-400'; icone = <UserCheck className="w-8 h-8" />; texto = 'Ocupada'; break;
      case 2: corBorda = 'border-yellow-500'; corFundo = 'bg-yellow-500/10 animate-pulse'; corTexto = 'text-yellow-400'; icone = <Trash2 className="w-8 h-8" />; texto = 'Limpeza'; break;
      case 3: corBorda = 'border-blue-500'; corFundo = 'bg-blue-500/10'; corTexto = 'text-blue-400'; icone = <Receipt className="w-8 h-8" />; texto = 'Conta'; break;
      default: break;
    }

    return (
      <div key={mesa.id} className={`relative p-4 rounded-xl border-2 transition-all duration-500 flex flex-col items-center justify-center gap-2 ${corBorda} ${corFundo}`}>
        
        {/* BOTÃO DE REMOVER (X no canto superior direito) */}
        <button 
          onClick={() => removerMesa(mesa.id)}
          className="absolute top-2 right-2 p-1 bg-gray-900/50 hover:bg-red-600 rounded-full text-gray-400 hover:text-white transition-colors"
          title="Remover Mesa"
        >
          <X className="w-3 h-3" />
        </button>

        <span className="text-xs font-bold text-gray-400">Mesa {mesa.id}</span>
        <div className={corTexto}>{icone}</div>
        <span className={`text-sm font-black ${corTexto}`}>{texto}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{mesa.garcom}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Armchair className="text-blue-400" /> Monitor de Mesas (Salão Principal)
        </h2>
        <div className="flex gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Livre</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Ocupada</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Limpeza</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Conta</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {mesas.length > 0 ? (
          mesas.map(renderMesa)
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Nenhuma mesa cadastrada. Clique em "Adicionar Mesa" para começar.
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-gray-400 bg-gray-700/30 p-3 rounded-lg">
        <span>💡 Este painel é atualizado automaticamente pelo sistema de caixa.</span>
        <button 
          onClick={adicionarMesa}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-bold bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-md"
        >
          <Plus className="w-4 h-4" /> Adicionar Mesa
        </button>
      </div>
    </div>
  );
}