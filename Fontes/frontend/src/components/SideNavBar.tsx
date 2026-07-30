import React from 'react';
import { LayoutDashboard, Users, Activity, FileText, Settings, LogOut, UserPlus } from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, active }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
    active 
    ? "bg-primary/10 text-primary font-bold shadow-sm" 
    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
  }`}>
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

export const SideNavBar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
        <span className="text-xl font-bold text-gray-900">MedicApp</span>
      </div>

      {/* Botão Novo Paciente - Mapeado para o Menu Lateral */}
      <button className="w-full flex items-center gap-3 px-4 py-3 mb-6 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all font-bold text-sm">
        <UserPlus size={20} />
        Novo Paciente
      </button>

      <nav className="flex-1 space-y-2">
        <NavItem label="Dashboard" icon={LayoutDashboard} />
        <NavItem label="Pacientes" icon={Users} active />
        <NavItem label="Tratamentos" icon={Activity} />
        <NavItem label="Relatórios" icon={FileText} />
        <NavItem label="Configurações" icon={Settings} />
      </nav>

      <div className="pt-6 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};