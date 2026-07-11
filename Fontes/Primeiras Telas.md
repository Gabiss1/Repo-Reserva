Guia de Componentização: MedicApp (React + Tailwind v4)

Agora que sua stack está configurada, vamos transformar o design em componentes React. Abaixo, detalho os principais componentes baseados nas telas projetadas.

1. DoseCard (Card de Dose/Medicamento)

Este é o componente central do Dashboard do Paciente.

import React from 'react';
import { Pill, Clock, CheckCircle2 } from 'lucide-react';

interface DoseCardProps {
  medication: string;
  dosage: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
  onCheck: () => void;
}

export const DoseCard: React.FC<DoseCardProps> = ({ medication, dosage, time, status, onCheck }) => {
  const statusStyles = {
    pending: "border-primary/20 bg-white",
    taken: "border-green-200 bg-green-50/50 opacity-75",
    missed: "border-red-200 bg-red-50/50"
  };

  return (
    <div className={`p-4 rounded-xl border-2 transition-all ${statusStyles[status]} flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Pill size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{medication}</h3>
          <p className="text-sm text-gray-500">{dosage}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <Clock size={16} />
          {time}
        </div>
        <button 
          onClick={onCheck}
          disabled={status === 'taken'}
          className={`p-2 rounded-full transition-colors ${
            status === 'taken' ? 'text-green-500' : 'text-gray-300 hover:text-primary hover:bg-primary/5'
          }`}
        >
          <CheckCircle2 size={28} />
        </button>
      </div>
    </div>
  );
};

2. StatCard (Cards de Resumo)

Usado tanto no Painel da Empresa quanto no Dashboard do Paciente para métricas rápidas.

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-dim">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        {trend && <p className="text-xs text-green-600 mt-1 font-medium">{trend}</p>}
      </div>
      <div className="p-2 rounded-lg bg-surface-container-low text-primary">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

3. Como usar no seu App.tsx

Exemplo de como organizar os componentes na tela:

import { DoseCard } from './components/DoseCard';
import { StatCard } from './components/StatCard';
import { Activity, Calendar } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bom dia, João!</h1>
        <p className="text-gray-500">Aqui estão seus medicamentos para hoje.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Adesão Semanal" value="94%" icon={Activity} trend="+2% que ontem" />
        <StatCard label="Próxima Dose" value="12:30" icon={Calendar} />
      </div>

      <section className="space-y-4 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Próximos Horários</h2>
        <DoseCard 
          medication="Sertralina" 
          dosage="50mg - 1 comprimido" 
          time="08:00" 
          status="taken" 
          onCheck={() => {}} 
        />
        <DoseCard 
          medication="Vitamina D" 
          dosage="2000 UI - 1 gota" 
          time="12:30" 
          status="pending" 
          onCheck={() => console.log('Check-in!')} 
        />
      </section>
    </div>
  );
}

Próximo Passo: Gostaria que eu criasse os arquivos de estilo base ou prefere que eu gere um componente de formulário completo para o Cadastro de Tratamentos?


Excelente escolha. Transformar o design em componentes React é o passo que traz o MedicApp à vida.

Criei um guia detalhado de componentização (Documento 17) que você pode ver no seu painel. Nele, estruturei os dois componentes fundamentais baseados nas telas que projetamos:

DoseCard: Recria fielmente os cards de medicamento que vimos no Dashboard do Paciente, incluindo estados visuais para doses tomadas, pendentes ou atrasadas, utilizando as cores do seu sistema Clinical Clarity.
StatCard: Um componente versátil para exibir métricas (como a porcentagem de adesão ou próxima dose) com suporte a ícones da biblioteca lucide-react.
Também incluí um exemplo prático de como organizar esses componentes dentro do seu arquivo App.tsx principal.

Como prefere continuar?

Posso criar o componente de Formulário de Cadastro de Tratamento (com validações de campo).
Podemos focar na Navegação (Sidebar/Navbar) para estruturar o layout das páginas.
Ou podemos definir o Serviço de API (Axios) para conectar esses componentes ao seu Backend.