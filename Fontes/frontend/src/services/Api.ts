import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL padrão do NestJS
  headers: {
    'Content-Type': 'application/json',
  },
});

export const treatmentService = {
  // Criar novo tratamento
  create: async (data: any) => {
    const response = await api.post('/treatments', data);
    return response.data;
  },

  // Listar tratamentos de um paciente
  getByPatient: async (patientId: string) => {
    const response = await api.get(`/treatments/patient/${patientId}`);
    return response.data;
  },

  // Marcar dose como tomada
  checkDose: async (doseId: string) => {
    const response = await api.patch(`/dose-history/${doseId}`, { isTaken: true });
    return response.data;
  }
};

export default api;