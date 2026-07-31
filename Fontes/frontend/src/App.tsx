import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { InstitutionDashboard } from './pages/InstitutionDashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Visão do Paciente */}
      <Route path="/dashboard" element={<PatientDashboard />} />
      
      {/* Visão da Instituição */}
      <Route path="/admin" element={<InstitutionDashboard />} />

      {/* Redirecionamento Padrão */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;