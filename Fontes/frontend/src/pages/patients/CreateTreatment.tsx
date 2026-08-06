import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getPatientById } from "../../api/services/PatientService";

import { createTreatment, getMedications } from "../../api/services/TreatmentService";

import { Patient } from "../../api/types/entities/Patient";
import { Medication } from "../../api/types/entities/Medication";

import "./Patient.css";

export default function CreateTreatment() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);

  const [medications, setMedications] = useState<Medication[]>([]);

  const [medicationId, setMedicationId] = useState("");

  const [intervalHours, setIntervalHours] = useState(8);

  const [durationDays, setDurationDays] = useState(7);

  const [startDate, setStartDate] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        const patientResponse = await getPatientById(id);

        setPatient(patientResponse);

        const medicationsResponse = await getMedications();

        setMedications(medicationsResponse);
      } catch {
        setError("Não foi possível carregar os dados.");
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!patient) {
      setError("Paciente inválido.");

      return;
    }

    try {
      setLoading(true);

      await createTreatment({
        medicationId,

        patientCpf: patient.cpf,

        intervalHours,

        durationDays,

        startDate,
      });

      navigate(`/institution/patients/${patient.id}`);
    } catch {
      setError("Não foi possível criar o tratamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="patient-page">
      <div className="patient-card">
        <h1>Novo Tratamento</h1>

        <p>
          Paciente:
          <strong> {patient?.name}</strong>
        </p>

        <form className="patient-form" onSubmit={handleSubmit}>
          <label>Medicamento</label>

          <select
            value={medicationId}
            onChange={(e) => setMedicationId(e.target.value)}
            required
          >
            <option value="">Selecione...</option>

            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.name}
              </option>
            ))}
          </select>

          <label>Intervalo (horas)</label>

          <input
            type="number"
            min={1}
            value={intervalHours}
            onChange={(e) => setIntervalHours(Number(e.target.value))}
            required
          />

          <label>Duração (dias)</label>

          <input
            type="number"
            min={1}
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            required
          />

          <label>Primeira dose</label>

          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          {error && <span className="error">{error}</span>}

          <button className="primary-button" disabled={loading}>
            {loading ? "Salvando..." : "Criar Tratamento"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
