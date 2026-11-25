import { AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function PratoSustentavel() {
  // Aqui simulamos os dados que viriam das lixeiras inteligentes da cozinha
  const dadosDesperdicio = [
    { nome: 'Arroz', desperdicio: 15, status: 'ok', cor: 'bg-green-500' },
    { nome: 'Feijão', desperdicio: 5, status: 'excelente', cor: 'bg-green-500' },
    { nome: 'Carne', desperdicio: 35, status: 'critico', cor: 'bg-red-500' },
    { nome: 'Salada', desperdicio: 20, status: 'alerta', cor: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingDown className="text-orange-500" /> Análise do Prato Inteligente (Bento Box)
          </h2>
          <p className="text-sm text-gray-400 mt-1">Monitoramento de sobras por divisória</p>
        </div>
        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          Alerta na Carne!
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dadosDesperdicio.map((item) => (
          <div key={item.nome} className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-white mb-2">{item.nome}</span>
            
            {/* Barra de progresso do desperdício */}
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2 relative overflow-hidden">
              <div 
                className={`h-4 rounded-full ${item.cor}`} 
                style={{ width: `${item.desperdicio}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between w-full text-sm mt-1">
              <span className="text-gray-400">Sobra:</span>
              <span className="font-bold text-white">{item.desperdicio}%</span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs font-bold">
              {item.status === 'critico' ? (
                <span className="text-red-400 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Ajustar Porção</span>
              ) : (
                <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Nível Aceitável</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}