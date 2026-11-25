import { useState } from 'react';
import { Settings, Save, Bell, Store, Key, Shield, CheckCircle2, ArrowLeft, Mail, Smartphone, AlertTriangle, Clock } from 'lucide-react';

export default function TelaConfiguracoes({ onVoltar }) {
  const [salvo, setSalvo] = useState(false);
  const [config, setConfig] = useState({
    nomeRestaurante: "Bovinu'S Grill & Beer",
    unidade: "Augusta",
    notificacoesEmail: true,
    notificacoesPush: false,
    alertaLucro: true,
    alertaFila: true,
    apiKey: "sk-bovinus-2024-xxxx",
  });

  const handleSalvar = () => {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-10">
      
      {/* Header da Página */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={onVoltar} 
            className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors border border-gray-700"
            title="Voltar ao Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <Settings className="text-orange-500 w-8 h-8" /> Configurações
            </h1>
            <p className="text-gray-400 mt-1">Gerencie as preferências do sistema e integrações.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Card: Dados do Restaurante */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <Store className="text-orange-400 w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Dados do Restaurante</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Nome do Restaurante</label>
              <input 
                type="text" 
                value={config.nomeRestaurante}
                onChange={(e) => setConfig({...config, nomeRestaurante: e.target.value})}
                className="w-full bg-gray-950 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Unidade</label>
              <input 
                type="text" 
                value={config.unidade}
                onChange={(e) => setConfig({...config, unidade: e.target.value})}
                className="w-full bg-gray-950 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Card: Notificações */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Bell className="text-blue-400 w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Notificações</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4">
                <Mail className="text-gray-500 w-6 h-6" />
                <div>
                  <p className="font-semibold text-white">Notificações por E-mail</p>
                  <p className="text-xs text-gray-400">Receber resumo diário no e-mail</p>
                </div>
              </div>
              <button 
                onClick={() => setConfig({...config, notificacoesEmail: !config.notificacoesEmail})}
                className={`w-14 h-7 rounded-full transition-colors relative ${config.notificacoesEmail ? 'bg-green-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${config.notificacoesEmail ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4">
                <Smartphone className="text-gray-500 w-6 h-6" />
                <div>
                  <p className="font-semibold text-white">Notificações Push</p>
                  <p className="text-xs text-gray-400">Alertas em tempo real no celular</p>
                </div>
              </div>
              <button 
                onClick={() => setConfig({...config, notificacoesPush: !config.notificacoesPush})}
                className={`w-14 h-7 rounded-full transition-colors relative ${config.notificacoesPush ? 'bg-green-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${config.notificacoesPush ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Card: Alertas do Sistema */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-lg">
              <Shield className="text-red-400 w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Alertas do Sistema</h2>
          </div>
          <div className="p-6 space-y-3">
            <label className="flex items-center gap-4 p-4 bg-gray-950 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors">
              <input 
                type="checkbox" 
                checked={config.alertaLucro} 
                onChange={(e) => setConfig({...config, alertaLucro: e.target.checked})}
                className="w-6 h-6 accent-orange-500 rounded"
              />
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" /> Alerta de Lucro
                </p>
                <p className="text-xs text-gray-400">Notificar quando a margem de lucro cair abaixo do esperado.</p>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 bg-gray-950 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors">
              <input 
                type="checkbox" 
                checked={config.alertaFila} 
                onChange={(e) => setConfig({...config, alertaFila: e.target.checked})}
                className="w-6 h-6 accent-orange-500 rounded"
              />
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" /> Alerta de Fila
                </p>
                <p className="text-xs text-gray-400">Notificar quando o tempo de espera passar de 5 minutos.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Card: Integração com IA */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex items-center gap-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Key className="text-purple-400 w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Integração com IA (Bovinu'S Brain)</h2>
          </div>
          <div className="p-6">
            <label className="block text-sm font-bold text-gray-400 mb-2">Chave de API (OpenAI / Gemini)</label>
            <input 
              type="password" 
              value={config.apiKey}
              onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">Esta chave é usada para alimentar o assistente de IA do gerente.</p>
          </div>
        </div>

        {/* Botão Salvar Fixo no Final */}
        <div className="sticky bottom-6 z-10 flex justify-end">
          <button 
            onClick={handleSalvar}
            className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] flex items-center gap-3 text-lg border border-orange-400/50"
          >
            {salvo ? (
              <><CheckCircle2 className="w-6 h-6 animate-bounce" /> Salvo com Sucesso!</>
            ) : (
              <><Save className="w-6 h-6" /> Salvar Configurações</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}