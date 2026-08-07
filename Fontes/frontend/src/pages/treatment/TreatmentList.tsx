import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./treatment.css";

import { findAllTreatments } from "../../api/services/TreatmentService";
import { Treatment } from "../../api/types/entities/Treatment";

export default function TreatmentList() {
  const navigate = useNavigate();

  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadTreatments() {
    try {
      const response = await findAllTreatments();

      setTreatments(response);
    } catch (error) {
      console.error("Erro ao carregar tratamentos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTreatments();
  }, []);

  if (loading) {
    return (
      <div className="treatment-page">
        <div className="treatment-card">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="treatment-page">
      <div className="treatment-card">
        <div className="treatment-header">
          <div>
            <h1>Tratamentos</h1>

            <p>Gerenciamento de tratamentos</p>
          </div>

          <div className="treatment-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Voltar ao Dashboard
            </button>

            <button
              className="primary-button"
              onClick={() => navigate("/institution/treatments/new")}
            >
              Novo Tratamento
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Paciente</th>

              <th>Medicamento</th>

              <th>Intervalo</th>

              <th>Duração</th>

              <th>Início</th>

              <th>Status</th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {treatments.length === 0 ? (
              <tr>
                <td colSpan={7}>Nenhum tratamento encontrado.</td>
              </tr>
            ) : (
              treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.patient?.name ?? "Meu tratamento"}</td>

                  <td>{treatment.medication?.name ?? "—"}</td>

                  <td>A cada {treatment.intervalHours} horas</td>

                  <td>{treatment.durationDays} dias</td>

                  <td>
                    {new Date(treatment.startDate).toLocaleDateString("pt-BR")}
                  </td>

                  <td>{treatment.status}</td>

                  <td>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        navigate(`/institution/treatments/${treatment.id}/edit`)
                      }
                    >
                      Editar
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
