import { useState, useEffect } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function AlertaMesaPronta() {
  const [alerta, setAlerta] = useState(null);
  
  // Lista de mesas reais do sistema (A, B e C)
  const mesas = [
    'Mesa 12A', 'Mesa 05A', 'Mesa 23A', 'Mesa 08A', 'Mesa 17A', // Salão Principal
    'Mesa 03B', 'Mesa 15B', 'Mesa 07B', 'Mesa 19B', 'Mesa 10B', // Salão Inferior
    'Mesa 30C', 'Mesa 12C', 'Mesa 40C', 'Mesa 22C', 'Mesa 05C'  // Salão Superior
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!alerta) {
        const mesaAleatoria = mesas[Math.floor(Math.random() * mesas.length)];
        setAlerta({
          id: Date.now(),
          mesa: mesaAleatoria,
          tempo: 'agora mesmo'
        });
      }
    }, 15000); // Aparece a cada 15 segundos
    return () => clearInterval(interval);
  }, [alerta]);

  const confirmarLimpeza = () => {
    setAlerta(null); // Remove o alerta
  };

  if (!alerta) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-4 min-w-[300px]">
        <div className="bg-white/20 p-2 rounded-full">
          <Bell className="w-6 h-6 animate-swing" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Cliente Pagou!</p>
          <h4 className="font-bold text-lg">{alerta.mesa} liberada</h4>
          <p className="text-xs text-blue-100">Aguardando limpeza para novo cliente.</p>
        </div>
        <button 
          onClick={confirmarLimpeza}
          className="bg-white text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors shadow-sm"
          title="Confirmar Limpeza"
        >
          <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}