import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  getPatientById,
  updatePatient,
} from "../../api/services/PatientService";

import "./createPatient.css";

export default function EditPatient() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");

  const [cpf, setCpf] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatient() {
      if (!id) return;

      try {
        const patient = await getPatientById(id);

        setName(patient.name);

        setCpf(patient.cpf);
      } catch {
        setError("Paciente não encontrado.");
      }
    }

    loadPatient();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    try {
      await updatePatient(
        id,

        {
          name,

          cpf,
        }
      );

      navigate(`/institution/patients/${id}`);
    } catch {
      setError("Não foi possível atualizar o paciente.");
    }
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <h1>Editar Paciente</h1>

        <form className="patient-form" onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <input value={cpf} onChange={(e) => setCpf(e.target.value)} />

          {error && <span className="error">{error}</span>}

          <button className="primary-button">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
