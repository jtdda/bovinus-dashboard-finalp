import { useState } from 'react';
import { Scale, Beef, Wheat, Salad, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function PratoInteligente() {
  const [peso, setPeso] = useState(0.450); // Peso inicial simulado
  const [ingredientes, setIngredientes] = useState({
    carne: false,
    arroz: false,
    feijao: false,
    salada: false,
  });
  const [resultado, setResultado] = useState(null);

  // Preços de custo por KG (Simulação)
  const custos = {
    carne: 45.00,
    arroz: 8.00,
    feijao: 10.00,
    salada: 12.00,
  };

  // Preço de venda por KG (O que o cliente paga)
  const precoVendaPorKg = 59.90;

  const toggleIngrediente = (item) => {
    setIngredientes(prev => ({ ...prev, [item]: !prev[item] }));
    setResultado(null); // Limpa o resultado anterior
  };

  const calcularLucro = () => {
    // Custo médio ponderado (simulação simplificada)
    const itensSelecionados = Object.keys(ingredientes).filter(k => ingredientes[k]);
    if (itensSelecionados.length === 0) {
      alert("Selecione pelo menos um ingrediente no prato!");
      return;
    }

    // Divide o peso igualmente entre os itens selecionados (simulação)
    const pesoPorItem = peso / itensSelecionados.length;
    
    // Calcula o custo total do prato
    const custoTotal = itensSelecionados.reduce((acc, item) => {
      return acc + (custos[item] * pesoPorItem);
    }, 0);

    // Calcula a receita (o que o cliente paga)
    const receita = peso * precoVendaPorKg;

    // Calcula o lucro
    const lucro = receita - custoTotal;
    const margem = (lucro / receita) * 100;

    setResultado({
      custoTotal: custoTotal.toFixed(2),
      receita: receita.toFixed(2),
      lucro: lucro.toFixed(2),
      margem: margem.toFixed(1),
      lucrativo: lucro > 0
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
        <Scale className="text-blue-400 w-6 h-6" />
        <h2 className="text-xl font-bold">Prato Inteligente (Simulador de Balança)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado Esquerdo: Simulação da Balança */}
        <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-600">
          <h3 className="text-lg font-bold mb-4 text-center text-gray-300">Balança Digital</h3>
          
          <div className="text-center mb-6">
            <span className="text-5xl font-black text-white">{peso.toFixed(3)}</span>
            <span className="text-xl text-gray-400 ml-2">kg</span>
          </div>

          <input 
            type="range" 
            min="0.100" 
            max="1.000" 
            step="0.050" 
            value={peso} 
            onChange={(e) => { setPeso(parseFloat(e.target.value)); setResultado(null); }}
            className="w-full mb-8 accent-orange-500"
          />

          <p className="text-sm text-gray-400 mb-4 text-center">O que você colocou no prato?</p>
          
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toggleIngrediente('carne')} className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all border-2 ${ingredientes.carne ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'}`}>
              <Beef className="w-6 h-6" /> <span className="text-xs font-bold">Carne</span>
            </button>
            <button onClick={() => toggleIngrediente('arroz')} className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all border-2 ${ingredientes.arroz ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'}`}>
              <Wheat className="w-6 h-6" /> <span className="text-xs font-bold">Arroz</span>
            </button>
            <button onClick={() => toggleIngrediente('feijao')} className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all border-2 ${ingredientes.feijao ? 'bg-orange-900/30 border-orange-500 text-orange-400' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'}`}>
              <Wheat className="w-6 h-6" /> <span className="text-xs font-bold">Feijão</span>
            </button>
            <button onClick={() => toggleIngrediente('salada')} className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all border-2 ${ingredientes.salada ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'}`}>
              <Salad className="w-6 h-6" /> <span className="text-xs font-bold">Salada</span>
            </button>
          </div>

          <button onClick={calcularLucro} className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-colors shadow-lg">
            Calcular Lucro
          </button>
        </div>

        {/* Lado Direito: Resultado */}
        <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-600 flex flex-col justify-center">
          {resultado ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Preço Pago (Cliente):</span>
                <span className="text-xl font-bold text-white">R$ {resultado.receita}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Custo dos Ingredientes:</span>
                <span className="text-xl font-bold text-red-400">- R$ {resultado.custoTotal}</span>
              </div>
              
              <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 mt-4 ${resultado.lucrativo ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
                {resultado.lucrativo ? (
                  <><CheckCircle2 className="w-10 h-10 text-green-500" /><span className="text-green-400 font-black text-2xl">R$ {resultado.lucro}</span><span className="text-xs text-green-300 font-bold">LUCRO REAL</span></>
                ) : (
                  <><AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" /><span className="text-red-400 font-black text-2xl">R$ {resultado.lucro}</span><span className="text-xs text-red-300 font-bold">PREJUÍZO!</span></>
                )}
              </div>
              
              <p className={`text-center text-sm font-semibold ${resultado.lucrativo ? 'text-green-400' : 'text-red-400'}`}>
                Margem de Lucro: {resultado.margem}%
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <TrendingUp className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-center">Selecione o peso e os ingredientes e clique em <strong>Calcular Lucro</strong> para ver o resultado.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}