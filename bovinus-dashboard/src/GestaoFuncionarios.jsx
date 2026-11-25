import { useState } from 'react';
import { Users, UserPlus, Trash2, ShieldCheck, ShieldOff, Search } from 'lucide-react';

export default function GestaoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'Carlos Silva', cargo: 'Churrasqueiro', status: 'ativo', acesso: true },
    { id: 2, nome: 'Mariana Souza', cargo: 'Gerente', status: 'ativo', acesso: true },
    { id: 3, nome: 'João Pedro', cargo: 'Garçom', status: 'inativo', acesso: false },
    { id: 4, nome: 'Ana Costa', cargo: 'Cozinheira', status: 'ativo', acesso: true },
  ]);

  const [busca, setBusca] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novoCargo, setNovoCargo] = useState('Garçom');

  const adicionarFuncionario = (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const novoId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
    setFuncionarios([...funcionarios, { 
      id: novoId, 
      nome: novoNome, 
      cargo: novoCargo, 
      status: 'ativo', 
      acesso: true 
    }]);
    setNovoNome('');
    setNovoCargo('Garçom');
  };

  const removerFuncionario = (id) => {
    if (window.confirm("Tem certeza que deseja remover este funcionário?")) {
      setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
  };

  const toggleAcesso = (id) => {
    setFuncionarios(funcionarios.map(f => {
      if (f.id === id) {
        return { ...f, acesso: !f.acesso, status: !f.acesso ? 'ativo' : 'inativo' };
      }
      return f;
    }));
  };

  const funcionariosFiltrados = funcionarios.filter(f => 
    f.nome.toLowerCase().includes(busca.toLowerCase()) || 
    f.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  const ativos = funcionarios.filter(f => f.acesso).length;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="text-blue-400" /> Gestão de Funcionários
        </h2>
        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {ativos} Online
        </div>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={adicionarFuncionario} className="flex flex-col md:flex-row gap-3 mb-6 bg-gray-700/30 p-4 rounded-lg border border-gray-700">
        <input 
          type="text" 
          placeholder="Nome do Funcionário" 
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
        <select 
          value={novoCargo}
          onChange={(e) => setNovoCargo(e.target.value)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option>Garçom</option>
          <option>Churrasqueiro</option>
          <option>Cozinheiro</option>
          <option>Gerente</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" /> Cadastrar
        </button>
      </form>

      {/* Barra de Busca */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar por nome ou cargo..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Lista de Funcionários */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700">
              <th className="pb-3 px-2">Nome</th>
              <th className="pb-3 px-2">Cargo</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-center">Acesso ao Sistema</th>
              <th className="pb-3 px-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.map((f) => (
              <tr key={f.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-2 font-semibold">{f.nome}</td>
                <td className="py-3 px-2 text-gray-400">{f.cargo}</td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'ativo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {f.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <button 
                    onClick={() => toggleAcesso(f.id)}
                    className={`p-2 rounded-lg transition-colors ${f.acesso ? 'text-green-400 hover:bg-green-500/20' : 'text-red-400 hover:bg-red-500/20'}`}
                    title={f.acesso ? "Revogar Acesso" : "Conceder Acesso"}
                  >
                    {f.acesso ? <ShieldCheck className="w-5 h-5 mx-auto" /> : <ShieldOff className="w-5 h-5 mx-auto" />}
                  </button>
                </td>
                <td className="py-3 px-2 text-right">
                  <button onClick={() => removerFuncionario(f.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors" title="Remover Funcionário">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {funcionariosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhum funcionário encontrado.</div>
        )}
      </div>
    </div>
  );
}