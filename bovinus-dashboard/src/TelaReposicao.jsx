import { ArrowLeft, Scale, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export default function TelaReposicao({ onVoltar }) {
  const itens = [
    { id: 1, nome: 'Picanha', pesoAtual: 1.2, pesoIdeal: 3.0, status: 'critico' },
    { id: 2, nome: 'Arroz Branco', pesoAtual: 2.5, pesoIdeal: 4.0, status: 'alerta' },
    { id: 3, nome: 'Feijão', pesoAtual: 4.0, pesoIdeal: 4.0, status: 'ok' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <header className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
        <button onClick={onVoltar} className="bg-gray-700 hover:bg-gray-600 p-3 rounded-xl transition-colors shadow-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="bg-blue-500 p-3 rounded-xl">
          <Scale className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Monitoramento de Cubas</h1>
          <p className="text-gray-400">Controle de peso em tempo real</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itens.map((item) => (
          <div key={item.id} className={`p-6 rounded-2xl border-2 bg-gray-800 ${
            item.status === 'critico' ? 'border-red-500' : 
            item.status === 'alerta' ? 'border-yellow-500' : 'border-green-500'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-black">{item.nome}</h2>
              {item.status === 'critico' && <AlertCircle className="w-8 h-8 text-red-500" />}
              {item.status === 'alerta' && <AlertCircle className="w-8 h-8 text-yellow-500" />}
              {item.status === 'ok' && <CheckCircle className="w-8 h-8 text-green-500" />}
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Peso Atual:</span>
                <span className="font-bold text-white">{item.pesoAtual} kg</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Peso Ideal:</span>
                <span className="font-bold text-white">{item.pesoIdeal} kg</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                <div 
                  className={`h-3 rounded-full ${
                    item.status === 'critico' ? 'bg-red-500' : 
                    item.status === 'alerta' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${(item.pesoAtual / item.pesoIdeal) * 100}%` }}
                ></div>
              </div>
            </div>

            <button className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              item.status === 'ok' 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            }`}>
              <RefreshCw className="w-5 h-5" /> 
              {item.status === 'ok' ? 'Nível OK' : 'Repor Cuba'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}