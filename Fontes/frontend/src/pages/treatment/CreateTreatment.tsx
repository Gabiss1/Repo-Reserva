import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./treatment.css";

import { useAuth } from "../../contexts/AuthContexts";

import { Medication } from "../../api/types/entities/Medication";
import { Patient } from "../../api/types/entities/Patient";
import { createTreatment } from "../../api/services/TreatmentService";
import { findAllMedications } from "../../api/services/MedicationService";
import { findAllPatients } from "../../api/services/PatientService";

export default function CreateTreatment() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [patients, setPatients] = useState<Patient[]>([]);

  const [medications, setMedications] = useState<Medication[]>([]);

  const [patientCpf, setPatientCpf] = useState("");

  const [medicationId, setMedicationId] = useState("");

  const [intervalHours, setIntervalHours] = useState(8);

  const [durationDays, setDurationDays] = useState(7);

  const [startDate, setStartDate] = useState("");

  const isInstitution = user?.role === "institution";

  useEffect(() => {
    async function load() {
      const medicationList = await findAllMedications();

      setMedications(medicationList);

      if (isInstitution) {
        const patientList = await findAllPatients();

        setPatients(patientList);
      }
    }

    load();
  }, [isInstitution]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      return;
    }

    await createTreatment({
      medicationId,

      intervalHours,

      durationDays,

      startDate,

      ...(isInstitution ? { patientCpf } : {}),
    });

    navigate("/institution/treatments");
  }

  return (
    <div className="crud-page">
      <div className="crud-card">
        <h2>Novo Tratamento</h2>

        <form className="crud-form" onSubmit={handleSubmit}>
          {isInstitution && (
            <select
              value={patientCpf}
              onChange={(e) => setPatientCpf(e.target.value)}
              required
            >
              <option value="">Selecione um paciente</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.cpf}>
                  {patient.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={medicationId}
            onChange={(e) => setMedicationId(e.target.value)}
            required
          >
            <option value="">Selecione um medicamento</option>

            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.name}
              </option>
            ))}
          </select>

          <label>
            Intervalo entre doses: <br />
            <input
              type="number"
              value={intervalHours}
              onChange={(event) => setIntervalHours(Number(event.target.value))}
              min={1}
              required
            />
          </label>

          <label>
            Duração do tratamento: <br />
            <input
              type="number"
              value={durationDays}
              onChange={(event) => setDurationDays(Number(event.target.value))}
              min={1}
              required
            />
          </label>

          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <button className="primary-button" type="submit"
          onClick={() => navigate(-1)}
          >
            Criar Tratamento
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
