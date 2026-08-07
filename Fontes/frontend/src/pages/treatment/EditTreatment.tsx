import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getTreatmentById,
  updateTreatment,
} from "../../api/services/TreatmentService";

import { findAllMedications } from "../../api/services/MedicationService";

import { Treatment } from "../../api/types/entities/Treatment";
import { Medication } from "../../api/types/entities/Medication";
import { UpdateTreatmentDTO } from "../../api/types/updates/UpdateTreatmentDTO";

import "./treatment.css";

export default function EditTreatment() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [treatment, setTreatment] = useState<Treatment | null>(null);

  const [medications, setMedications] = useState<Medication[]>([]);

  const [medicationId, setMedicationId] = useState("");

  const [intervalHours, setIntervalHours] = useState("");

  const [durationDays, setDurationDays] = useState("");

  const [startDate, setStartDate] = useState("");

  const [status, setStatus] = useState<"ACTIVE" | "FINISHED" | "CANCELLED">(
    "ACTIVE",
  );

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!id) {
        return;
      }

      try {
        const [treatmentResponse, medicationResponse] = await Promise.all([
          getTreatmentById(id),

          findAllMedications(),
        ]);

        setTreatment(treatmentResponse);

        setMedications(medicationResponse);

        setMedicationId(treatmentResponse.medication.id);

        setIntervalHours(String(treatmentResponse.intervalHours));

        setDurationDays(String(treatmentResponse.durationDays));

        setStartDate(treatmentResponse.startDate.slice(0, 10));

        setStatus(treatmentResponse.status);
      } catch (error) {
        console.error("Erro ao carregar tratamento:", error);

        setError("Não foi possível carregar o tratamento.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!id) {
      return;
    }

    setError("");

    setSaving(true);

    try {
      const data: UpdateTreatmentDTO = {
        medicationId,

        intervalHours: Number(intervalHours),

        durationDays: Number(durationDays),

        startDate,

        status,
      };

      await updateTreatment(id, data);

      navigate("/institution/treatments");
    } catch (error) {
      console.error("Erro ao atualizar tratamento:", error);

      setError("Não foi possível atualizar o tratamento.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="treatment-page">
        <div className="treatment-container">Carregando...</div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="treatment-page">
        <div className="treatment-container">
          <p>{error || "Tratamento não encontrado."}</p>

          <button
            className="secondary-button"
            onClick={() => navigate("/institution/treatments")}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="treatment-page">
      <div className="treatment-container">
        <div className="treatment-header">
          <div>
            <h1>Editar Tratamento</h1>

            <p>Atualize as informações do tratamento.</p>
          </div>
        </div>

        <form className="treatment-form" onSubmit={handleSubmit}>
          <label>
            Medicamento
            <select
              value={medicationId}
              onChange={(event) => setMedicationId(event.target.value)}
              required
            >
              <option value="">Selecione um medicamento</option>

              {medications.map((medication) => (
                <option key={medication.id} value={medication.id}>
                  {medication.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Intervalo em horas
            <input
              type="number"
              min="1"
              value={intervalHours}
              onChange={(event) => setIntervalHours(event.target.value)}
              required
            />
          </label>

          <label>
            Duração em dias
            <input
              type="number"
              min="1"
              value={durationDays}
              onChange={(event) => setDurationDays(event.target.value)}
              required
            />
          </label>

          <label>
            Data de início
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as "ACTIVE" | "FINISHED" | "CANCELLED",
                )
              }
            >
              <option value="ACTIVE">Ativo</option>

              <option value="FINISHED">Finalizado</option>

              <option value="CANCELLED">Cancelado</option>
            </select>
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/institution/treatments")}
            >
              Cancelar
            </button>

            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
