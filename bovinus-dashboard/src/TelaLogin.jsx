import { useState } from 'react';
import { Lock, User, LogIn, ChefHat } from 'lucide-react';

export default function TelaLogin({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    // Simula a autenticação (usuário: admin, senha: 1234)
    setTimeout(() => {
      if (usuario === 'admin' && senha === '1234') {
        onLogin(); // Chama a função do App para liberar o acesso
      } else {
        setErro('Usuário ou senha incorretos. Tente: admin / 1234');
        setCarregando(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Efeitos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 relative z-10">
        
        {/* Logo e Título */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-500 p-4 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Bovinu'S</h1>
          <p className="text-gray-400 text-sm mt-1">Grill & Beer - Unidade Augusta</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>
          </div>

          {erro && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center font-semibold animate-pulse">
              {erro}
            </div>
          )}

          <button 
            type="submit" 
            disabled={carregando}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Entrar no Dashboard
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Acesso restrito. Usuário de teste: <strong>admin</strong> / Senha: <strong>1234</strong></p>
        </div>
      </div>
    </div>
  );
}