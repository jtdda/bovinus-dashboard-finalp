import { useState, useEffect } from 'react';
import { Flame, MapPin, Maximize2, X, DoorOpen, ArrowRight } from 'lucide-react';
import DetalheMesas from './DetalheMesas'; // Importa o novo componente

export default function MapaCalor() {
  const [fluxo, setFluxo] = useState({
    salaoInferior: 20, salaoPrincipal: 45, salaoSuperior: 70,
    churrasqueira: 85, saladas: 30, quentes: 40, sobremesas: 15, balanca: 60, caixa: 30,
  });
  const [focado, setFocado] = useState(false);
  
  // NOVO ESTADO: Controla qual salão está aberto no detalhe
  const [salaoAberto, setSalaoAberto] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFluxo(prev => ({
        ...prev,
        churrasqueira: Math.min(100, Math.max(70, prev.churrasqueira + (Math.random() * 10 - 5))),
        salaoPrincipal: Math.min(100, Math.max(30, prev.salaoPrincipal + (Math.random() * 10 - 5))),
        balanca: Math.min(90, Math.max(40, prev.balanca + (Math.random() * 5 - 2))),
        quentes: Math.min(80, Math.max(20, prev.quentes + (Math.random() * 10 - 5))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getCor = (valor) => {
    if (valor >= 80) return 'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]';
    if (valor >= 50) return 'bg-yellow-500 border-yellow-400';
    return 'bg-green-500 border-green-400';
  };

  // Função para abrir o detalhe do salão
  const abrirSalao = (e, salao) => {
    e.stopPropagation(); // Evita que o clique abra o modo foco
    setSalaoAberto(salao);
  };

  const containerClasses = focado 
    ? "fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md p-8 flex flex-col justify-center items-center transition-all duration-500"
    : "bg-gray-800 p-6 rounded-xl shadow-lg mt-8 transition-all duration-500 hover:shadow-2xl";

  const mapaClasses = focado
    ? "relative w-full max-w-7xl h-[85vh] bg-gray-900 border-4 border-orange-500 rounded-2xl p-6 flex transition-all duration-500 shadow-[0_0_50px_rgba(249,115,22,0.3)]"
    : "relative w-full max-w-6xl mx-auto h-[500px] bg-gray-900 border-2 border-gray-700 rounded-lg p-4 flex transition-all duration-500 cursor-pointer hover:border-orange-500/50";

  return (
    <>
      {/* Renderiza a tela de detalhes se algum salão estiver aberto */}
      {salaoAberto === 'principal' && (
        <DetalheMesas salao="Salão Principal" quantidade={30} letra="A" onVoltar={() => setSalaoAberto(null)} />
      )}
      {salaoAberto === 'inferior' && (
        <DetalheMesas salao="Salão Inferior (Pista)" quantidade={20} letra="B" onVoltar={() => setSalaoAberto(null)} />
      )}
      {salaoAberto === 'superior' && (
        <DetalheMesas salao="Salão Superior" quantidade={40} letra="C" onVoltar={() => setSalaoAberto(null)} />
      )}

      {focado && (
        <button onClick={() => setFocado(false)} className="fixed top-8 right-8 z-[60] bg-red-600 hover:bg-red-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
          <X className="w-8 h-8" />
        </button>
      )}

      <div className={containerClasses}>
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="text-blue-400" /> Mapa de Calor da Jornada (Planta Real)
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Livre</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Moderado</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> Gargalo</span>
            </div>
            {!focado && (
              <button onClick={() => setFocado(true)} className="bg-gray-700 hover:bg-orange-600 p-2 rounded-lg text-gray-300 hover:text-white transition-colors" title="Expandir Mapa">
                <Maximize2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className={mapaClasses} onClick={() => !focado && setFocado(true)}>
          
          <div className="w-[15%] h-full flex flex-col gap-2">
            <div className="h-1/4 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-xs text-gray-500">DJ</div>
            <div className="h-3/4 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-xs text-gray-500">Palco</div>
          </div>

          <div className="w-[55%] h-full px-4 flex flex-col justify-between">
            <div className="w-full h-[10%] bg-gray-700/20 border border-dashed border-gray-600 rounded flex items-center justify-center text-xs text-gray-500 mb-2">
              Fundos / Cozinha
            </div>

            <div className="flex-1 flex gap-4">
              
              {/* SALÃO INFERIOR - CLICÁVEL */}
              <div 
                onClick={(e) => abrirSalao(e, 'inferior')}
                className={`w-1/3 h-full rounded border-2 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer hover:ring-4 hover:ring-white/50 ${getCor(fluxo.salaoInferior)}`}
              >
                <span className="text-xs font-bold text-center pointer-events-none">Salão Inferior<br/>(Pista)</span>
                <span className="text-[10px] opacity-80 mt-1 pointer-events-none">~20 mesas</span>
              </div>

              <div className="w-1/3 h-full flex flex-col gap-2 justify-center">
                <div className={`h-1/4 rounded border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${getCor(fluxo.saladas)}`}>Saladas</div>
                <div className={`h-1/4 rounded border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${getCor(fluxo.quentes)}`}>Quentes</div>
                <div className={`h-1/4 rounded border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${getCor(fluxo.sobremesas)}`}>Sobremesas</div>
                <div className={`h-1/4 rounded border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${getCor(fluxo.balanca)}`}>Balança</div>
              </div>

              {/* SALÃO PRINCIPAL - CLICÁVEL */}
              <div 
                onClick={(e) => abrirSalao(e, 'principal')}
                className={`w-1/3 h-full rounded border-2 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer hover:ring-4 hover:ring-white/50 ${getCor(fluxo.salaoPrincipal)}`}
              >
                <span className="text-xs font-bold text-center pointer-events-none">Salão Principal</span>
                <span className="text-[10px] opacity-80 mt-1 pointer-events-none">~30 mesas</span>
              </div>
            </div>

            <div className="w-full h-[15%] mt-2 flex gap-2">
               <div className="w-1/4 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-[10px] text-gray-500">Banheiros</div>
               <div className="w-1/4 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-[10px] text-gray-500">Caixas</div>
               <div className="w-1/2 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-[10px] text-gray-500">Bar / Sala de Espera</div>
            </div>
          </div>

          <div className="w-[30%] h-full flex flex-col gap-2 pl-4 border-l border-gray-700">
            <div className={`w-full h-[20%] rounded border-2 flex flex-col items-center justify-center transition-all duration-500 ${getCor(fluxo.churrasqueira)}`}>
              <span className="text-xs font-bold pointer-events-none">Churrasqueira</span>
              {fluxo.churrasqueira >= 80 && <Flame className="w-4 h-4 animate-bounce mt-1" />}
            </div>

            {/* SALÃO SUPERIOR - CLICÁVEL */}
            <div 
              onClick={(e) => abrirSalao(e, 'superior')}
              className={`w-full flex-1 rounded border-2 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer hover:ring-4 hover:ring-white/50 ${getCor(fluxo.salaoSuperior)}`}
            >
              <span className="text-sm font-bold pointer-events-none">Salão Superior</span>
              <span className="text-xs opacity-80 mt-1 pointer-events-none">~40 mesas</span>
            </div>

            <div className="w-full h-[15%] flex gap-2">
              <div className="w-1/2 bg-orange-500/20 border border-orange-500 rounded flex items-center justify-center text-[10px] text-orange-400 font-bold">
                <DoorOpen className="w-3 h-3 mr-1" /> Entrada
              </div>
              <div className="w-1/2 bg-gray-700/30 border border-gray-600 rounded flex items-center justify-center text-[10px] text-gray-500">
                Saída
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/4 flex items-center text-orange-500 text-xs font-bold gap-1 animate-pulse">
            <span>Caminho do Cliente</span> <ArrowRight className="w-4 h-4" />
          </div>

          {!focado && (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none">
              <span className="bg-gray-900/80 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" /> Clique para expandir
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}