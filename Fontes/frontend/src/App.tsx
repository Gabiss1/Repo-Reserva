import { DoseCard } from './components/DoseCard';
import { StatCard } from './components/StatCard';
import { Activity, Calendar } from 'lucide-react';
import React from 'react';

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