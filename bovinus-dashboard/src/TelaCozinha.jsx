import { ChefHat, AlertCircle, CheckCircle2, Clock, Bell, ArrowLeft, PlusCircle } from 'lucide-react';

export default function TelaCozinha({ onVoltar, ingredientes, onConcluirIngrediente, onAbrirAdicionar }) {
  
  // Filtra apenas os itens pendentes para mostrar como pedidos
  const pedidosPendentes = ingredientes.filter(item => item.status === 'pendente');
  const pedidosConcluidos = ingredientes.filter(item => item.status === 'concluido');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      
      {/* Header da Cozinha com Botão Voltar */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-4 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onVoltar} className="bg-gray-700 hover:bg-gray-600 p-3 rounded-xl transition-colors shadow-lg" title="Voltar ao Dashboard">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-orange-500 p-3 rounded-xl">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Cozinha / Churrasqueira</h1>
            <p className="text-gray-400">Bovinu'S - Unidade Augusta</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onAbrirAdicionar} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <PlusCircle className="w-4 h-4" /> Adicionar Ingrediente
          </button>
          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-bold flex items-center gap-2 animate-pulse">
            <Bell className="w-5 h-5" />
            {pedidosPendentes.length} Pendentes
          </div>
        </div>
      </header>

      {/* Grid de Pedidos Pendentes */}
      <h2 className="text-xl font-bold mb-4 text-orange-400">Pedidos Pendentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {pedidosPendentes.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
            Nenhum pedido pendente no momento. Tudo em dia! ✅
          </div>
        ) : (
          pedidosPendentes.map((pedido) => (
            <div key={pedido.id} className="p-6 rounded-2xl border-2 bg-red-900/20 border-red-500 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                    Reposição
                  </span>
                  <h2 className="text-3xl font-black mt-2">{pedido.nome}</h2>
                  <p className="text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" /> Solicitado agora
                  </p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>

              <button 
                onClick={() => onConcluirIngrediente(pedido.id)}
                className="w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              >
                <CheckCircle2 className="w-6 h-6" /> Concluir Pedido
              </button>
            </div>
          ))
        )}
      </div>

      {/* Grid de Pedidos Concluídos */}
      {pedidosConcluidos.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-green-400">Concluídos Recentemente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidosConcluidos.map((pedido) => (
              <div key={pedido.id} className="p-6 rounded-2xl border-2 bg-green-900/20 border-green-700 opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-700 text-gray-300">
                      Concluído
                    </span>
                    <h2 className="text-2xl font-black mt-2 text-gray-400 line-through">{pedido.nome}</h2>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div className="w-full py-3 rounded-xl font-black text-sm text-green-400 flex items-center justify-center gap-2 bg-green-900/40">
                  <CheckCircle2 className="w-5 h-5" /> Reposto
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}