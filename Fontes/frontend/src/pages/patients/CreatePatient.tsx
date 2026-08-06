import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPatient } from "../../api/services/PatientService";
import { useAuth } from "../../contexts/AuthContexts";

import "./createPatient.css";

export default function CreatePatient() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [name, setName] = useState("");

  const [cpf, setCpf] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!user) return;

      if (user.role !== "institution") {
        setError("Apenas instituições podem cadastrar pacientes.");

        return;
      }

      await createPatient(user.id, {
        name,
        cpf,
      });

      navigate("/institution");
    } catch {
      setError("Não foi possível cadastrar o paciente.");
    }
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <h1>Novo Paciente</h1>

        <form className="patient-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          {error && <span className="error">{error}</span>}

          <button type="submit" className="primary-button">
            Cadastrar Paciente
          </button>
        </form>
      </div>
    </div>
  );
}
