import React, { useState } from 'react';
import { treatmentService } from '../services/Api';

export const TreatmentForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        medicationName: '',
        dosage: '',
        frequency: 1,
        intervalHours: 24,
        durationDays: 7,
        startDate: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await treatmentService.create(formData);
            alert('Tratamento cadastrado no banco de dados com sucesso!');
            // Opcional: Limpar formulário ou redirecionar
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Falha ao conectar com o servidor. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {/* Ícone de Pílula + Plus (SVG Inline) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 7v10M7 12h10" />
                        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Novo Tratamento</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do Medicamento */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>Nome do Medicamento</label>
                    <input
                        type="text"
                        placeholder="Ex: Sertralina, Vitamina D..."
                        className={inputClasses}
                        value={formData.medicationName}
                        onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                        required
                    />
                </div>

                {/* Posologia */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>Posologia (Dose)</label>
                    <input
                        type="text"
                        placeholder="Ex: 50mg - 1 comprimido"
                        className={inputClasses}
                        value={formData.dosage}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        required
                    />
                </div>

                {/* Frequência */}
                <div>
                    <label className={labelClasses}>Vezes ao dia</label>
                    <input
                        type="number"
                        className={inputClasses}
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
                        min="1"
                    />
                </div>

                {/* Intervalo */}
                <div>
                    <label className={labelClasses}>Intervalo</label>
                    <select
                        className={inputClasses}
                        value={formData.intervalHours}
                        onChange={(e) => setFormData({ ...formData, intervalHours: parseInt(e.target.value) })}
                    >
                        <option value={4}>De 4 em 4 horas</option>
                        <option value={6}>De 6 em 6 horas</option>
                        <option value={8}>De 8 em 8 horas</option>
                        <option value={12}>De 12 em 12 horas</option>
                        <option value={24}>Uma vez ao dia (24h)</option>
                    </select>
                </div>

                {/* Duração */}
                <div>
                    <label className={labelClasses}>Duração (Dias)</label>
                    <input
                        type="number"
                        className={inputClasses}
                        value={formData.durationDays}
                        onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
                        min="1"
                    />
                </div>

                {/* Data de Início */}
                <div>
                    <label className={labelClasses}>Data de Início</label>
                    <input
                        type="date"
                        className={inputClasses}
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                </div>

                {/* Observações */}
                <div className="md:col-span-2">
                    <label className={labelClasses}>Observações Adicionais</label>
                    <textarea
                        className={`${inputClasses} h-24 resize-none`}
                        placeholder="Ex: Tomar após o café da manhã..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
            >
                Finalizar Cadastro
            </button>
        </form>
    );
};