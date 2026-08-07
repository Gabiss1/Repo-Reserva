import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./medication.css";
import {
  deleteMedication,
  findAllMedications,
} from "../../api/services/MedicationService";
import { Medication } from "../../api/types/entities/Medication";

export default function MedicationList() {
  const navigate = useNavigate();

  const [medications, setMedications] = useState<Medication[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadMedications() {
    try {
      const response = await findAllMedications();

      setMedications(response);
    } catch {
      alert("Não foi possível carregar os medicamentos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedications();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir esta categoria?",
    );

    if (!confirmed) {
      return;
    }

    await deleteMedication(id);

    loadMedications();
  }

  if (loading) {
    return <div className="category-page">Carregando...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-card">
        <div className="page-header">
          <h1>Medicamentos</h1>

          <div className="page-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Voltar ao Dashboard
            </button>

            <button
              className="primary-button"
              onClick={() => navigate("/institution/medications/new")}
            >
              Novo Medicamento
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Forma Farmacêutica</th>
              <th>Dosagem</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {medications.map((medication) => (
              <tr key={medication.id}>
                <td>{medication.name}</td>
                <td>{medication.category?.name}</td>
                <td>{medication.pharmaceuticalForm}</td>
                <td>{medication.dosage}</td>

                <td>
                  <button
                    className="secondary-button"
                    onClick={() =>
                      navigate(`/medications/${medication.id}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => handleDelete(medication.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
