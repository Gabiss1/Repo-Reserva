import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./medication.css";

import {
  getMedication,
  updateMedication,
} from "../../api/services/MedicationService";

import { getCategories } from "../../api/services/CategoryService";

import { Category } from "../../api/types/entities/Category";
import { PharmaceuticalForm } from "../../api/types/enums/PharmaceuticalForm";

export default function EditMedication() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");

  const [dosage, setDosage] = useState("");

  const [pharmaceuticalForm, setPharmaceuticalForm] =
    useState<PharmaceuticalForm>(PharmaceuticalForm.TABLET);

  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function load() {
      if (!id) return;

      const medication = await getMedication(id);

      const categoryList = await getCategories();

      setCategories(categoryList);

      setName(medication.name);

      setDosage(medication.dosage);

      setPharmaceuticalForm(medication.pharmaceuticalForm);

      setCategoryId(medication.category.id);
    }

    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    await updateMedication(id, {
      name,

      dosage,

      pharmaceuticalForm,

      categoryId,
    });

    navigate("/medications");
  }

  return (
    <div className="crud-page">
      <div className="crud-card">
        <h2>Editar Medicamento</h2>

        <form className="crud-form" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
          />

          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Dosagem"
          />

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

          <button className="primary-button" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
