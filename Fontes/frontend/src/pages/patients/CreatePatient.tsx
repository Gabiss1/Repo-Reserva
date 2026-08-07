import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPatient } from "../../api/services/PatientService";

import "./Patient.css";
import { useAuth } from "../../contexts/AuthContexts";

export default function CreatePatient() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [name, setName] = useState("");

  const [cpf, setCpf] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (user?.role !== "institution") {
      return;
    }

    try {
      setLoading(true);

      await createPatient(user!.id, {
        name,
        cpf,
      });

      navigate("/institution/patients");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <div className="patient-header">
          <div>
            <h1>Novo Paciente</h1>

            <p>Cadastre um novo paciente</p>
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/institution/patients")}
          >
            ← Voltar
          </button>
        </div>

        <form className="patient-form" onSubmit={handleSubmit}>
          <label>Nome</label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>CPF</label>

          <input
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/institution/patients")}
            >
              Cancelar
            </button>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Paciente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
