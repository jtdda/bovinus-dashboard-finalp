import { useState } from 'react';
import { ArrowLeft, PlusCircle, ChefHat } from 'lucide-react';

export default function AdicionarIngrediente({ onVoltar, onAdicionar }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Churrasco');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    
    onAdicionar({ nome, categoria, status: 'pendente' });
    setNome('');
    // Opcional: dar um feedback de sucesso
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-10">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onVoltar} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors border border-gray-700">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <ChefHat className="text-orange-500 w-8 h-8" /> Adicionar Ingrediente
            </h1>
            <p className="text-gray-400 mt-1">Cadastre um novo item para ser reposto no buffet.</p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Nome do Ingrediente</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Mandioca Frita, Picanha, Farofa..."
                className="w-full bg-gray-950 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Categoria</label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-gray-950 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500"
              >
                <option>Churrasco</option>
                <option>Acompanhamento</option>
                <option>Salada</option>
                <option>Sobremesa</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              <PlusCircle className="w-6 h-6" /> Adicionar à Lista da Cozinha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}