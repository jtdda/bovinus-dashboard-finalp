import { 
  LayoutDashboard, Users, Armchair, Utensils, Trash2, ChefHat, 
  Bot, Settings, LogOut, Menu, X
} from 'lucide-react';

export default function Sidebar({ abaAtiva, setAbaAtiva, isOpen, setIsOpen, onLogout, onConfig }) {
  
  const menuItems = [
    { id: 'dashboard', nome: 'Dashboard', icone: LayoutDashboard },
    { id: 'mesas', nome: 'Salão e Mesas', icone: Armchair },
    { id: 'equipe', nome: 'Equipe', icone: Users },
    { id: 'operacao', nome: 'Operação (Buffet)', icone: Utensils },
    { id: 'desperdicio', nome: 'Desperdício', icone: Trash2 },
    { id: 'ia', nome: 'Bovinu\'S Brain (IA)', icone: Bot },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-50 transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white leading-tight">Bovinu'S</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Unidade Augusta</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gestão</p>
          
          {menuItems.map((item) => {
            const Icone = item.icone;
            const isActive = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setAbaAtiva(item.id);
                  setIsOpen(false); // Fecha no mobile ao clicar
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-semibold ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-500 border-l-4 border-orange-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <Icone className={`w-5 h-5 ${isActive ? 'text-orange-500' : ''}`} />
                {item.nome}
              </button>
            );
          })}
        </nav>

        {/* Footer do Menu */}
        <div className="p-4 border-t border-gray-800">
          {/* BOTÃO CONFIGURAÇÕES FUNCIONAL */}
          <button 
            onClick={onConfig}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors font-semibold"
          >
            <Settings className="w-5 h-5" /> Configurações
          </button>
          
          {/* BOTÃO SAIR FUNCIONAL */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-semibold mt-1"
          >
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>
    </>
  );
}