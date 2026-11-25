import { useState } from 'react';
import { 
  Trophy, Smile, Trash2, ChefHat, Armchair, Scale, MessageSquare, 
  AlertTriangle, Users, MapPin, Star, Heart, ThumbsUp, Zap, Target, 
  Coffee, Pizza, Flame, CheckCircle2
} from 'lucide-react';

const iconesDisponiveis = [
  { id: 'trophy', icone: Trophy, nome: 'Troféu' },
  { id: 'smile', icone: Smile, nome: 'Clima' },
  { id: 'trash', icone: Trash2, nome: 'Lixo' },
  { id: 'chef', icone: ChefHat, nome: 'Chef' },
  { id: 'armchair', icone: Armchair, nome: 'Mesa' },
  { id: 'scale', icone: Scale, nome: 'Balança' },
  { id: 'message', icone: MessageSquare, nome: 'Chat' },
  { id: 'alert', icone: AlertTriangle, nome: 'Alerta' },
  { id: 'users', icone: Users, nome: 'Equipe' },
  { id: 'map', icone: MapPin, nome: 'Mapa' },
  { id: 'star', icone: Star, nome: 'Estrela' },
  { id: 'heart', icone: Heart, nome: 'Coração' },
  { id: 'thumbsup', icone: ThumbsUp, nome: 'Joinha' },
  { id: 'zap', icone: Zap, nome: 'Raio' },
  { id: 'target', icone: Target, nome: 'Alvo' },
  { id: 'coffee', icone: Coffee, nome: 'Café' },
  { id: 'pizza', icone: Pizza, nome: 'Pizza' },
  { id: 'flame', icone: Flame, nome: 'Fogo' },
  { id: 'check', icone: CheckCircle2, nome: 'Check' },
];

export default function SeletorIcones() {
  const [iconesSelecionados, setIconesSelecionados] = useState({
    ranking: 'trophy', clima: 'smile', desperdicio: 'trash', buffet: 'chef',
    mesas: 'armchair', prato: 'scale', chat: 'message', alertas: 'alert',
  });
  const [moduloAberto, setModuloAberto] = useState(null);

  const modulos = [
    { id: 'ranking', nome: 'Ranking da Equipe' },
    { id: 'clima', nome: 'Radar de Clima' },
    { id: 'desperdicio', nome: 'Termômetro de Desperdício' },
    { id: 'buffet', nome: 'Monitor de Buffet' },
    { id: 'mesas', nome: 'Painel de Mesas' },
    { id: 'prato', nome: 'Prato Inteligente' },
    { id: 'chat', nome: 'Chat Gerente (IA)' },
    { id: 'alertas', nome: 'Alertas Gerais' },
  ];

  const selecionarIcone = (moduloId, iconeId) => {
    setIconesSelecionados(prev => ({ ...prev, [moduloId]: iconeId }));
    setModuloAberto(null);
  };

  const renderIcone = (moduloId) => {
    const iconeId = iconesSelecionados[moduloId];
    const iconeObj = iconesDisponiveis.find(i => i.id === iconeId);
    if (!iconeObj) return null;
    const IconeComponente = iconeObj.icone;
    return <IconeComponente className="w-6 h-6 text-orange-400" />;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
        <Star className="text-yellow-400 w-6 h-6" />
        <h2 className="text-xl font-bold">Personalização de Ícones</h2>
      </div>
      <p className="text-sm text-gray-400 mb-6">Escolha o ícone que melhor representa cada módulo do seu Dashboard.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="relative">
            <div onClick={() => setModuloAberto(moduloAberto === modulo.id ? null : modulo.id)} className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-orange-500 cursor-pointer transition-all flex flex-col items-center gap-3">
              <div className="bg-gray-800 p-3 rounded-full">{renderIcone(modulo.id)}</div>
              <span className="text-xs font-semibold text-center text-gray-300">{modulo.nome}</span>
            </div>
            {moduloAberto === modulo.id && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-600 rounded-xl shadow-2xl p-3 z-50">
                <div className="grid grid-cols-5 gap-2">
                  {iconesDisponiveis.map((icone) => {
                    const IconeComponente = icone.icone;
                    return (
                      <button key={icone.id} onClick={() => selecionarIcone(modulo.id, icone.id)} title={icone.nome} className={`p-2 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-700 ${iconesSelecionados[modulo.id] === icone.id ? 'bg-orange-500/20 text-orange-400 border border-orange-500' : 'text-gray-400'}`}>
                        <IconeComponente className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}