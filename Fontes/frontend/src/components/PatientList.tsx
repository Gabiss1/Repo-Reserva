import React from 'react';
import { MoreVertical, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

const patients = [
  { id: 1, name: "Arnaldo Antunes", info: "Hipertensão • 62 anos", cpf: "123.***.***-45", status: "Em dia", adherence: 85 },
  { id: 2, name: "Beatriz Ferreira", info: "Diabetes Tipo 2 • 45 anos", cpf: "987.***.***-10", status: "Atrasado", adherence: 42 },
  { id: 3, name: "Carlos Silveira", info: "Pós-Operatório • 29 anos", cpf: "456.***.***-78", status: "Alerta", adherence: 68 },
  { id: 4, name: "Daniela Souza", info: "Asma Crônica • 34 anos", cpf: "321.***.***-12", status: "Em dia", adherence: 98 },
];

export const PatientList: React.FC = () => {
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Em dia': return 'bg-green-50 text-green-700 border-green-100';
      case 'Atrasado': return 'bg-red-50 text-red-700 border-red-100';
      case 'Alerta': return 'bg-orange-50 text-orange-700 border-orange-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nome do Paciente</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">CPF</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status de Adesão</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Progresso do Tratamento</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{patient.name}</p>
                    <p className="text-[11px] text-gray-500">{patient.info}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs text-gray-400 font-medium">{patient.cpf}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(patient.status)}`}>
                  {patient.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-32">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        patient.adherence > 80 ? 'bg-green-500' : patient.adherence > 50 ? 'bg-orange-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${patient.adherence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-900">{patient.adherence}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};