import { useState, useEffect } from 'react';
import { Trash2, AlertCircle, TrendingDown, DollarSign, ChefHat, CheckCircle2 } from 'lucide-react';

export default function TermometroDesperdicio({ periodo }) { // <-- RECEBE A PROP
  const [abaAtiva, setAbaAtiva] = useState('churrasco');
  const [notificado, setNotificado] = useState(false);
  
  // Estado inicial vazio, será preenchido pelo useEffect
  const [dados, setDados] = useState({
    churrasco: [],
    acompanhamentos: [],
    saladas: []
  });

  // Efeito que roda sempre que o 'periodo' mudar
  useEffect(() => {
    // Define um multiplicador: Hoje = 1, Ontem = 0.8 (menos desperdício), Semana = 1.2 (mais desperdício)
    const fator = periodo === 'hoje' ? 1 : periodo === 'ontem' ? 0.8 : 1.2;

    setDados({
      churrasco: [
        { id: 1, nome: 'Picanha (Corte Alto)', porcentagem: 25 * fator, peso: `${(1.2 * fator).toFixed(1)}kg`, custo: `R$ ${(54 * fator).toFixed(2)}`, cor: 'bg-red-500', alerta: 'Corte muito grande.' },
        { id: 2, nome: 'Fraldinha', porcentagem: 12 * fator, peso: `${(0.5 * fator).toFixed(1)}kg`, custo: `R$ ${(20 * fator).toFixed(2)}`, cor: 'bg-yellow-500', alerta: 'Dentro do esperado.' },
        { id: 3, nome: 'Linguiça', porcentagem: 5 * fator, peso: `${(0.2 * fator).toFixed(1)}kg`, custo: `R$ ${(5 * fator).toFixed(2)}`, cor: 'bg-green-500', alerta: 'Excelente aceitação!' },
      ],
      acompanhamentos: [
        { id: 4, nome: 'Arroz Branco', porcentagem: 10 * fator, peso: `${(2.0 * fator).toFixed(1)}kg`, custo: `R$ ${(16 * fator).toFixed(2)}`, cor: 'bg-yellow-500', alerta: 'Dentro do esperado.' },
        { id: 5, nome: 'Feijão Tropeiro', porcentagem: 8 * fator, peso: `${(1.5 * fator).toFixed(1)}kg`, custo: `R$ ${(15 * fator).toFixed(2)}`, cor: 'bg-green-500', alerta: 'Boa aceitação.' },
      ],
      saladas: [
        { id: 6, nome: 'Salada de Maionese', porcentagem: 5 * fator, peso: `${(0.8 * fator).toFixed(1)}kg`, custo: `R$ ${(10 * fator).toFixed(2)}`, cor: 'bg-green-500', alerta: 'Excelente aceitação!' },
        { id: 7, nome: 'Alface e Tomate', porcentagem: 3 * fator, peso: `${(0.4 * fator).toFixed(1)}kg`, custo: `R$ ${(5 * fator).toFixed(2)}`, cor: 'bg-green-500', alerta: 'Excelente aceitação!' },
      ]
    });
  }, [periodo]); // O array de dependências garante que ele rode ao mudar o período

  // Simula atualização dos dados (dinamismo) - Mantido igual
  useEffect(() => {
    const interval = setInterval(() => {
      setDados(prev => {
        const novosDados = { ...prev };
        Object.keys(novosDados).forEach(cat => {
          // Só mexe se a categoria tiver itens (evita erro na primeira renderização)
          if (novosDados[cat].length > 0) {
            novosDados[cat] = novosDados[cat].map(item => ({
              ...item,
              porcentagem: Math.min(30, Math.max(1, item.porcentagem + (Math.random() * 2 - 1)))
            }));
          }
        });
        return novosDados;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Verifica se há dados antes de calcular (evita erro de undefined)
  const itensAtuais = dados[abaAtiva] || [];
  const todosItens = Object.values(dados).flat();
  
  // Cálculos de resumo
  const totalDesperdicio = todosItens.length > 0 
    ? todosItens.reduce((acc, item) => acc + item.porcentagem, 0) / todosItens.length 
    : 0;
    
  const custoEstimado = todosItens.reduce((acc, item) => {
    // Converte a string "R$ 54.00" para número 54.00
    const valorNumerico = parseFloat(item.custo.replace('R$ ', '').replace(',', '.'));
    return acc + valorNumerico;
  }, 0);

  const notificarChef = () => {
    setNotificado(true);
    setTimeout(() => setNotificado(false), 5000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
      
      {/* Header e Cards de Resumo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-700 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Trash2 className="text-red-400 w-6 h-6" />
          <h2 className="text-xl font-bold">Termômetro de Desperdício</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
            <TrendingDown className="text-orange-400 w-5 h-5" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Média Rejeição</p>
              <p className="text-lg font-black text-white">{totalDesperdicio.toFixed(1)}%</p>
            </div>
          </div>
          <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
            <DollarSign className="text-red-400 w-5 h-5" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Prejuízo Estimado</p>
              <p className="text-lg font-black text-white">R$ {custoEstimado.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Categorias */}
      <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setAbaAtiva('churrasco')} 
          className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${abaAtiva === 'churrasco' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Churrasco
        </button>
        <button 
          onClick={() => setAbaAtiva('acompanhamentos')} 
          className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${abaAtiva === 'acompanhamentos' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Acompanhamentos
        </button>
        <button 
          onClick={() => setAbaAtiva('saladas')} 
          className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${abaAtiva === 'saladas' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Saladas
        </button>
      </div>

      {/* Lista de Itens */}
      <div className="space-y-6">
        {itensAtuais.map((item) => (
          <div key={item.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{item.nome}</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{item.peso} desperdiçado</span>
              </div>
              <span className={`font-black text-lg ${item.porcentagem > 20 ? 'text-red-400' : item.porcentagem > 10 ? 'text-yellow-400' : 'text-green-400'}`}>
                {item.porcentagem.toFixed(0)}% rejeitado
              </span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div className={`h-3 rounded-full transition-all duration-500 ${item.cor}`} style={{ width: `${item.porcentagem * 3}%` }}></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{item.alerta}</span>
              <span className="font-bold text-red-300">Custo: {item.custo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alerta de Ação */}
      {itensAtuais.some(item => item.porcentagem > 20) && !notificado && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-red-900/30 p-4 rounded-lg border border-red-700/50">
          <div className="flex items-center gap-3 text-red-300">
            <AlertCircle className="w-6 h-6 animate-pulse" />
            <p className="text-sm font-semibold">Atenção: Um item está com alta rejeição. O Chef precisa ser notificado!</p>
          </div>
          <button onClick={notificarChef} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            <ChefHat className="w-4 h-4" /> Notificar Chef
          </button>
        </div>
      )}

      {/* Feedback de Sucesso */}
      {notificado && (
        <div className="mt-6 flex items-center gap-3 bg-green-900/30 p-4 rounded-lg border border-green-700/50 animate-pulse">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <p className="text-sm font-semibold text-green-300">Chef notificado com sucesso! O ajuste será feito na próxima reposição.</p>
        </div>
      )}

    </div>
  );
}