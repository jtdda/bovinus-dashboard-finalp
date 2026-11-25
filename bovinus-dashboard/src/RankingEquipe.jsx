import { useState, useEffect } from 'react';
import { Trophy, Clock, Star } from 'lucide-react';

export default function RankingEquipe({ periodo = 'hoje' }) { // <-- Proteção adicionada aqui
  const [equipe, setEquipe] = useState([]);

  // Efeito que roda sempre que o 'periodo' mudar
  useEffect(() => {
    // Multiplicador para simular dados diferentes
    const multiplicador = periodo === 'hoje' ? 1 : periodo === 'ontem' ? 0.8 : 1.2;

    const novosDados = [
      { id: 1, nome: 'Carlos (Churrasqueira)', tempoBase: 2, mesasBase: 45, estrelas: 5 },
      { id: 2, nome: 'Mariana (Salão Principal)', tempoBase: 3, mesasBase: 38, estrelas: 4 },
      { id: 3, nome: 'João (Salão Superior)', tempoBase: 5, mesasBase: 22, estrelas: 3 },
      { id: 4, nome: 'Ana (Buffet)', tempoBase: 4, mesasBase: 30, estrelas: 4 },
    ].map(membro => ({
      ...membro,
      tempoMedio: `${(membro.tempoBase * multiplicador).toFixed(0)} min`,
      mesasLimpas: Math.floor(membro.mesasBase * multiplicador)
    }));

    setEquipe(novosDados);
  }, [periodo]);

  // Proteção para caso o periodo chegue indefinido (evita o erro do charAt)
  const periodoSeguro = periodo || 'hoje';
  const periodoTitulo = periodoSeguro.charAt(0).toUpperCase() + periodoSeguro.slice(1);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="text-yellow-400" /> Ranking de Agilidade ({periodoTitulo})
        </h2>
        <span className="text-sm text-gray-400">Baseado no tempo de limpeza e atendimento</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700">
              <th className="pb-3 px-2">Posição</th>
              <th className="pb-3 px-2">Funcionário</th>
              <th className="pb-3 px-2 text-center">Tempo Médio</th>
              <th className="pb-3 px-2 text-center">Mesas Limpas</th>
              <th className="pb-3 px-2 text-center">Avaliação</th>
              <th className="pb-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {equipe.map((membro, index) => (
              <tr key={membro.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-2 font-bold text-lg">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                </td>
                <td className="py-4 px-2 font-semibold">{membro.nome}</td>
                <td className="py-4 px-2 text-center text-green-400 font-bold flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" /> {membro.tempoMedio}
                </td>
                <td className="py-4 px-2 text-center">{membro.mesasLimpas}</td>
                <td className="py-4 px-2 text-center">
                  <div className="flex justify-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < membro.estrelas ? "currentColor" : "none"} className={i < membro.estrelas ? "text-yellow-400" : "text-gray-600"} />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    parseInt(membro.tempoMedio) <= 2 ? 'bg-green-500/20 text-green-400' : 
                    parseInt(membro.tempoMedio) <= 4 ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {parseInt(membro.tempoMedio) <= 2 ? 'Excelente' : 
                     parseInt(membro.tempoMedio) <= 4 ? 'Bom' : 'Atenção'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}