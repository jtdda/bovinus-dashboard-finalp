import Sidebar from './Sidebar';
import TelaLogin from './TelaLogin';
import TelaConfiguracoes from './TelaConfiguracoes';
import SeletorIcones from './SeletorIcones';
import GestaoFuncionarios from './GestaoFuncionarios';
import PratoInteligente from './PratoInteligente';
import TelaCozinha from './TelaCozinha';
import TelaReposicao from './TelaReposicao'; // <-- IMPORT ADICIONADO AQUI
import AdicionarIngrediente from './AdicionarIngrediente';
import AlertaMesaPronta from './AlertaMesaPronta';
import ChatGerente from './ChatGerente';
import AlertaBuffet from './AlertaBuffet';
import TermometroDesperdicio from './TermometroDesperdicio';
import RadarClima from './RadarClima';
import RankingEquipe from './RankingEquipe';
import MapaCalor from './MapaCalor';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, DollarSign, Clock, Users, Tv, MonitorOff, TrendingUp, ChefHat, Loader2, Menu, Utensils } from 'lucide-react';
import { gerarDadosMix, gerarDadosTempo } from './mockData';

function App() {
  const [logado, setLogado] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [dadosMix, setDadosMix] = useState([]);
  const [dadosTempo, setDadosTempo] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [modoTv, setModoTv] = useState(false);
  const [periodo, setPeriodo] = useState('hoje');
  const [telaCozinha, setTelaCozinha] = useState(false);
  const [telaReposicao, setTelaReposicao] = useState(false);
  const [telaConfig, setTelaConfig] = useState(false);
  const [telaAdicionar, setTelaAdicionar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Estado dos ingredientes (necessário para a Tela da Cozinha)
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nome: 'Picanha', categoria: 'Churrasco', status: 'pendente' },
    { id: 2, nome: 'Arroz Branco', categoria: 'Acompanhamento', status: 'pendente' },
  ]);

  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => {
      setDadosMix(gerarDadosMix(periodo));
      setDadosTempo(gerarDadosTempo(periodo));
      setCarregando(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [periodo]);

  const chamarReforco = () => {
    setMensagem('✅ Notificação enviada para o Smartwatch do churrasqueiro! Reforço a caminho.');
    setTimeout(() => setMensagem(''), 5000);
  };

  // Funções da Tela da Cozinha
  const adicionarIngrediente = (novoItem) => {
    const novoId = ingredientes.length > 0 ? Math.max(...ingredientes.map(i => i.id)) + 1 : 1;
    setIngredientes([...ingredientes, { ...novoItem, id: novoId }]);
    setTelaAdicionar(false);
  };

  const concluirIngrediente = (id) => {
    setIngredientes(ingredientes.map(item => 
      item.id === id ? { ...item, status: 'concluido' } : item
    ));
  };

  // --- LÓGICA DE LOGIN ---
  if (!logado) return <TelaLogin onLogin={() => setLogado(true)} />;

  // --- LÓGICA DA TELA DA COZINHA (Passando as props corretas) ---
  if (telaCozinha) return <TelaCozinha 
    onVoltar={() => setTelaCozinha(false)} 
    ingredientes={ingredientes}
    onConcluirIngrediente={concluirIngrediente}
    onAbrirAdicionar={() => setTelaAdicionar(true)}
  />;

  // --- LÓGICA DA TELA DE CONFIGURAÇÕES ---
  if (telaConfig) return <TelaConfiguracoes onVoltar={() => setTelaConfig(false)} />;
  if (telaAdicionar) return <AdicionarIngrediente onVoltar={() => setTelaAdicionar(false)} onAdicionar={adicionarIngrediente} />;

  // --- LÓGICA DO MODO TV ---
  if (modoTv) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col font-sans">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-5xl font-black text-orange-500">Bovinu'S <span className="text-white">| Painel do Salão</span></h1>
          <button onClick={() => setModoTv(false)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg text-lg font-bold transition-colors"><MonitorOff className="w-6 h-6" /> Sair do Modo TV</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-900/40 p-8 rounded-2xl border-l-8 border-red-500 flex items-center gap-6"><AlertTriangle className="text-red-500 w-16 h-16 animate-pulse" /><div><h3 className="font-black text-3xl text-red-400">CHURRASQUEIRA</h3><p className="text-2xl text-gray-300 mt-2">Tempo de espera: <strong className="text-white">9 minutos</strong></p></div></div>
          <div className="bg-blue-900/40 p-8 rounded-2xl border-l-8 border-blue-500 flex items-center gap-6"><Users className="text-blue-500 w-16 h-16" /><div><h3 className="font-black text-3xl text-blue-400">SALÃO PRINCIPAL</h3><p className="text-2xl text-gray-300 mt-2">Ocupação: <strong className="text-white">65%</strong> (3 mesas para limpar)</p></div></div>
        </div>
        <div className="flex-1"><MapaCalor /></div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO DO CONTEÚDO CONFORME A ABA ---
  const renderConteudo = () => {
    // Verificação da Tela de Reposição (mantém o menu lateral)
    if (telaReposicao) {
      return <TelaReposicao onVoltar={() => setTelaReposicao(false)} />;
    }

    switch (abaAtiva) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-red-500 flex items-start gap-4"><AlertTriangle className="text-red-500 w-8 h-8" /><div><h3 className="font-bold text-lg">Alerta de Lucro</h3><p className="text-sm text-gray-400">Consumo de carne 25% acima da média. Margem caiu para 18%.</p></div></div>
              <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-yellow-500 flex items-start gap-4"><Clock className="text-yellow-500 w-8 h-8" /><div><h3 className="font-bold text-lg">Gargalo na Churrasqueira</h3><p className="text-sm text-gray-400">Tempo de espera atual: <strong>9 minutos</strong>.</p><button onClick={chamarReforco} className="mt-3 bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-md">Chamar Reforço</button></div></div>
              <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-blue-500 flex items-start gap-4"><Users className="text-blue-500 w-8 h-8" /><div><h3 className="font-bold text-lg">Mesas Ocupadas</h3><p className="text-sm text-gray-400">65% do salão principal. 3 mesas aguardando limpeza.</p></div></div>
              <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-4 rounded-xl border-l-4 border-green-500 flex items-start gap-4 shadow-[0_0_15px_rgba(34,197,94,0.2)]"><TrendingUp className="text-green-400 w-8 h-8 animate-pulse" /><div><h3 className="font-bold text-lg text-green-400">Economia Gerada Hoje</h3><p className="text-2xl font-black text-white mt-1">R$ 450,00</p><p className="text-xs text-green-300 font-semibold mt-1">↓ 15% de desperdício reduzido</p></div></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><DollarSign className="text-green-400" /> Mix do Prato Servido ({periodo.charAt(0).toUpperCase() + periodo.slice(1)})</h2>
                <div className="h-64 relative">
                  {carregando ? (<div className="absolute inset-0 flex flex-col items-center justify-center text-orange-500"><Loader2 className="w-10 h-10 animate-spin mb-2" /><span className="text-sm font-semibold animate-pulse">Carregando...</span></div>) : (
                    <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={dadosMix} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{dadosMix.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.cor} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
                  )}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="text-yellow-400" /> Tempo de Espera ({periodo.charAt(0).toUpperCase() + periodo.slice(1)})</h2>
                <div className="h-64 relative">
                  {carregando ? (<div className="absolute inset-0 flex flex-col items-center justify-center text-orange-500"><Loader2 className="w-10 h-10 animate-spin mb-2" /><span className="text-sm font-semibold animate-pulse">Carregando...</span></div>) : (
                    <ResponsiveContainer width="100%" height="100%"><LineChart data={dadosTempo}><CartesianGrid strokeDasharray="3 3" stroke="#374151" /><XAxis dataKey="hora" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}/><Legend /><Line type="monotone" dataKey="buffet" stroke="#10b981" name="Buffet" strokeWidth={3} /><Line type="monotone" dataKey="churrasqueira" stroke="#ef4444" name="Churrasqueira" strokeWidth={3} /><Line type="monotone" dataKey="mesa" stroke="#3b82f6" name="Atendimento Mesa" strokeWidth={3} /></LineChart></ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            <MapaCalor />
            <RadarClima />
            <ChatGerente />
            <AlertaMesaPronta />
            <PratoInteligente />
            <SeletorIcones />
          </>
        );
      case 'mesas':
        return <MapaCalor />;
      case 'equipe':
        return (
          <>
            <GestaoFuncionarios />
            <RankingEquipe />
          </>
        );
      case 'operacao':
        return (
          <div className="space-y-8">
            <AlertaBuffet />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
                <ChefHat className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Tela da Cozinha (KDS)</h3>
                <p className="text-sm text-gray-400 mb-4">Veja os pedidos de reposição e reforço em tempo real.</p>
                <button onClick={() => setTelaCozinha(true)} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full">Abrir Tela</button>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center">
                <Utensils className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Tela de Reposição</h3>
                <p className="text-sm text-gray-400 mb-4">Monitore o peso das cubas e reponha os itens críticos.</p>
                <button onClick={() => setTelaReposicao(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full">Abrir Tela</button>
              </div>
            </div>
          </div>
        );
      case 'desperdicio':
        return <TermometroDesperdicio />;
      case 'ia':
        return <ChatGerente />;
      default:
        return <div className="text-gray-400">Selecione uma opção no menu.</div>;
    }
  };

  // --- LAYOUT COM SIDEBAR ---
  return (
    <div className="min-h-screen font-sans bg-gray-950 text-white flex">
      <Sidebar 
        abaAtiva={abaAtiva} 
        setAbaAtiva={setAbaAtiva} 
        isOpen={sidebarAberta} 
        setIsOpen={setSidebarAberta} 
        onLogout={() => setLogado(false)} 
        onConfig={() => setTelaConfig(true)} 
      />

      <div className="flex-1 md:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarAberta(true)} className="md:hidden text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold capitalize">{abaAtiva === 'ia' ? 'Bovinu\'S Brain' : abaAtiva}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button onClick={() => setPeriodo('hoje')} className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${periodo === 'hoje' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>Hoje</button>
              <button onClick={() => setPeriodo('ontem')} className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${periodo === 'ontem' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>Ontem</button>
              <button onClick={() => setPeriodo('semana')} className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${periodo === 'semana' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>Semana</button>
            </div>
            <button onClick={() => setModoTv(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded-lg text-xs font-bold transition-colors"><Tv className="w-4 h-4" /> Modo TV</button>
            <div className="bg-green-500/20 text-green-400 px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>Online</div>
          </div>
        </header>

        <main className="p-6">
          {mensagem && (<div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">{mensagem}</div>)}
          {renderConteudo()}
        </main>
      </div>
    </div>
  );
}

export default App;