import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPatientById } from "../../api/services/PatientService";
import { Patient } from "../../api/types/entities/Patient";

import "./Patient.css";

export default function PatientProfile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatient() {
      if (!id) return;

      try {
        const response = await getPatientById(id);

        setPatient(response);
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="patient-page">
        <div className="patient-card">Carregando paciente...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-page">
        <div className="patient-card">
          <p>Paciente não encontrado.</p>

          <button
            className="secondary-button"
            onClick={() => navigate("/institution/patients")}
          >
            ← Voltar para Pacientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <div className="patient-header">
          <div>
            <h1>{patient.name}</h1>

            <p>Perfil do paciente</p>
          </div>

          <div className="page-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/institution/patients")}
            >
              ← Voltar
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                navigate(`/institution/patients/${patient.id}/edit`)
              }
            >
              Editar
            </button>

            <button
              className="primary-button"
              onClick={() =>
                navigate(`/institution/patients/${patient.id}/treatment`)
              }
            >
              Novo Tratamento
            </button>
          </div>
        </div>

        <div className="patient-info">
          <div className="patient-info-item">
            <span>Nome</span>

            <strong>{patient.name}</strong>
          </div>

          <div className="patient-info-item">
            <span>CPF</span>

            <strong>{patient.cpf}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
