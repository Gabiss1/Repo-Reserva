import React from 'react';
import { LayoutDashboard, Users, Activity, FileText, Settings, LogOut, UserPlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Pacientes', icon: Users, path: '/admin/patients' },
    { label: 'Tratamentos', icon: Activity, path: '/admin/treatments' },
    { label: 'Relatórios', icon: FileText, path: '/admin/reports' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">M</div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">MedicApp</span>
      </div>

      {/* Botão de Ação Global */}
      <button className="w-full flex items-center justify-center gap-2 py-3.5 mb-8 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all font-bold text-sm">
        <UserPlus size={18} />
        Novo Paciente
      </button>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? "bg-primary/5 text-primary font-bold" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} className={isActive ? "text-primary" : "text-gray-400"} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all mb-2">
          <Settings size={20} />
          <span className="text-sm font-medium">Configurações</span>
        </button>
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};