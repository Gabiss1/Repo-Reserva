import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { findAllPatients } from "../../api/services/PatientService";
import { Patient } from "../../api/types/entities/Patient";

import "./Patient.css";

export default function Patients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadPatients() {
    try {
      const response = await findAllPatients();

      setPatients(response);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) {
    return (
      <div className="patient-page">
        <div className="patient-card">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <div className="patient-header">
          <div>
            <h1>Pacientes</h1>

            <p>Gerenciamento de pacientes</p>
          </div>

          <div className="patient-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Voltar ao Dashboard
            </button>

            <button
              className="primary-button"
              onClick={() => navigate("/institution/patients/new")}
            >
              Novo Paciente
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>

              <th>CPF</th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={3}>Nenhum paciente encontrado.</td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>

                  <td>{patient.cpf}</td>

                  <td>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        navigate(`/institution/patients/${patient.id}`)
                      }
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
