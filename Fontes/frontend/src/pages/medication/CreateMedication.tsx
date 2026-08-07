import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./medication.css";

import { createMedication } from "../../api/services/MedicationService";
import { findAllCategories } from "../../api/services/CategoryService";

import { Category } from "../../api/types/entities/Category";
import { PharmaceuticalForm } from "../../api/types/enums/PharmaceuticalForm";

export default function CreateMedication() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [dosage, setDosage] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [pharmaceuticalForm, setPharmaceuticalForm] =
    useState<PharmaceuticalForm>(PharmaceuticalForm.TABLET);

  const [categories, setCategories] = useState<Category[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await findAllCategories();

      setCategories(response);

      if (response.length > 0) {
        setCategoryId(response[0].id);
      }
    } catch {
      setError("Não foi possível carregar as categorias.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createMedication({
        name,

        dosage,

        pharmaceuticalForm,

        categoryId,
      });

      navigate("/institution/medications");
    } catch {
      setError("Não foi possível cadastrar o medicamento.");
    }
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="page-title">Novo Medicamento</h1>

        <form className="crud-form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <label>Nome</label>

          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Categoria</label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Forma Farmacêutica</label>

          <select
            value={pharmaceuticalForm}
            onChange={(e) =>
              setPharmaceuticalForm(e.target.value as PharmaceuticalForm)
            }
          >
            {Object.values(PharmaceuticalForm).map((form) => (
              <option key={form} value={form}>
                {form}
              </option>
            ))}
          </select>

          <label>Dosagem</label>

          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Ex.: 500 mg"
          />

          <div className="button-group">
            <button type="submit" className="primary-button">
              Salvar
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/institution/medications")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
