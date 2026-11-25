import { useState } from 'react';
import { AlertCircle, ChefHat, CheckCircle2 } from 'lucide-react';

export default function AlertaBuffet() {
  const [notificado, setNotificado] = useState(false);

  // Lista de itens do buffet com status simulado (baseado em sensores de peso)
  const itensBuffet = [
    { id: 1, nome: 'Picanha', status: 'vazio', peso: '0.2 kg', nivel: 10 },
    { id: 2, nome: 'Arroz Branco', status: 'baixo', peso: '1.5 kg', nivel: 30 },
    { id: 3, nome: 'Salada Caesar', status: 'cheio', peso: '3.0 kg', nivel: 80 },
    { id: 4, nome: 'Feijão Tropeiro', status: 'cheio', peso: '2.8 kg', nivel: 75 },
  ];

  const notificarCozinha = () => {
    setNotificado(true);
    setTimeout(() => setNotificado(false), 5000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ChefHat className="text-orange-400" /> Monitor de Reposição do Buffet
        </h2>
        <span className="text-sm text-gray-400">Sensores IoT de Peso</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {itensBuffet.map((item) => (
          <div 
            key={item.id} 
            className={`p-4 rounded-lg border-2 transition-all ${
              item.status === 'vazio' ? 'border-red-500 bg-red-500/10 animate-pulse' : 
              item.status === 'baixo' ? 'border-yellow-500 bg-yellow-500/10' : 
              'border-gray-700 bg-gray-700/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{item.nome}</h3>
              {item.status === 'vazio' && <AlertCircle className="text-red-500 w-5 h-5 animate-bounce" />}
              {item.status === 'baixo' && <AlertCircle className="text-yellow-500 w-5 h-5" />}
              {item.status === 'cheio' && <CheckCircle2 className="text-green-500 w-5 h-5" />}
            </div>
            <p className="text-sm text-gray-400 mb-2">Peso atual: {item.peso}</p>
            {/* Barra de Nível */}
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  item.status === 'vazio' ? 'bg-red-500' : 
                  item.status === 'baixo' ? 'bg-yellow-500' : 'bg-green-500'
                }`} 
                style={{ width: `${item.nivel}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerta de Ação */}
      {itensBuffet.some(item => item.status === 'vazio') && !notificado && (
        <div className="bg-red-900/40 border border-red-700 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-500 w-8 h-8 animate-pulse" />
            <div>
              <p className="font-bold text-red-300">Atenção: Cuba de Picanha Vazia!</p>
              <p className="text-sm text-gray-300">Os clientes estão na fila e a reposição não foi feita.</p>
            </div>
          </div>
          <button 
            onClick={notificarCozinha}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg w-full md:w-auto"
          >
            Notificar Cozinha
          </button>
        </div>
      )}

      {/* Feedback de Sucesso (Toast interno) */}
      {notificado && (
        <div className="bg-green-900/40 border border-green-700 p-4 rounded-lg flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="text-green-500 w-8 h-8" />
          <div>
            <p className="font-bold text-green-300">Notificação Enviada!</p>
            <p className="text-sm text-gray-300">A cozinha foi avisada e já está repondo a Picanha.</p>
          </div>
        </div>
      )}
    </div>
  );
}