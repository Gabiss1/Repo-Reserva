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