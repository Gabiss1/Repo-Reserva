import { useEffect, useState } from "react";
import { getPatients } from "../../api/services/PatientService";
import { Patient } from "../../api/types/entities/Patient";
import "./Patient.css";

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function load() {
      const response = await getPatients();

      setPatients(response);
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>Pacientes</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>

            <th>CPF</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>

              <td>{patient.cpf}</td>

              <td>
                <button>Abrir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
