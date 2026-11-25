import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function ChatGerente() {
  const [mensagens, setMensagens] = useState([{ id: 1, texto: "Olá, Gerente! Sou o Bovinu'S Brain. Como posso ajudar a otimizar o almoço hoje?", autor: 'bot' }]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);

  const respostas = {
    'picanha': "A Picanha está com 25% de desperdício hoje. O corte está muito alto. Sugiro avisar o churrasqueiro para reduzir o tamanho da fatia e repor a cuba, que está vazia.",
    'fila': "O maior gargalo agora é a Churrasqueira (9 minutos de espera). O Salão Principal está em 65% de ocupação. Sugiro remanejar um garçom do Salão Inferior para ajudar no atendimento.",
    'desperdicio': "O Termômetro de Desperdício aponta a Picanha como campeã (25%). O Arroz está em 10% (normal) e a Salada em 5% (excelente aceitação).",
    'clima': "A nota do almoço está em 4.8/5.0 (Excelente). O feedback mais recente elogiou a picanha, mas reclamou da fila da churrasqueira. A tendência é positiva (+12%).",
    'ranking': "O Carlos da Churrasqueira lidera o ranking com 2 minutos de tempo médio de atendimento. O João do Salão Superior precisa de atenção (5 minutos).",
    'buffet': "A cuba de Picanha está vazia. O arroz está em nível baixo (30%). Salada e Feijão estão cheios. A cozinha já foi notificada sobre a picanha.",
    'default': "Não tenho dados específicos sobre isso, mas posso te ajudar com: Desperdício, Filas, Clima, Ranking, Buffet ou Picanha. O que você precisa?"
  };

  const sugerirResposta = (pergunta) => { const p = pergunta.toLowerCase(); for (const k in respostas) { if (p.includes(k)) return respostas[k]; } return respostas['default']; };
  const enviarMensagem = (texto) => {
    if (!texto.trim()) return;
    setMensagens(prev => [...prev, { id: Date.now(), texto: texto, autor: 'user' }]);
    setInput(''); setCarregando(true);
    setTimeout(() => { setMensagens(prev => [...prev, { id: Date.now() + 1, texto: sugerirResposta(texto), autor: 'bot' }]); setCarregando(false); }, 1000);
  };
  const sugestoes = ["Como está o desperdício?", "Onde está a fila?", "Qual a nota do clima?", "Como está o buffet?"];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4"><Sparkles className="text-purple-400 w-6 h-6" /><h2 className="text-xl font-bold">Bovinu'S Brain (IA Generativa)</h2></div>
      <div className="h-64 overflow-y-auto mb-4 space-y-4 pr-2">
        {mensagens.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.autor === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.autor === 'bot' && (<div className="bg-purple-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-white" /></div>)}
            <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.autor === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-700 text-gray-200 rounded-tl-none'}`}>{msg.texto}</div>
            {msg.autor === 'user' && (<div className="bg-blue-600 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-white" /></div>)}
          </div>
        ))}
        {carregando && (<div className="flex gap-3"><div className="bg-purple-600 p-2 rounded-full h-8 w-8 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div><div className="bg-gray-700 p-3 rounded-lg rounded-tl-none flex gap-1 items-center"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span></div></div>)}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {sugestoes.map((s, i) => (<button key={i} onClick={() => enviarMensagem(s)} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors">{s}</button>))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarMensagem(input)} placeholder="Pergunte algo à IA sobre o restaurante..." className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600" />
        <button onClick={() => enviarMensagem(input)} disabled={carregando} className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg transition-colors disabled:opacity-50"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  );
}