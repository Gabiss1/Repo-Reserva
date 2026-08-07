import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCategory } from "../../api/services/CategoryService";

import "./category.css";

export default function CreateCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createCategory({
        name,

        description,
      });

      navigate("/institution/categories");
    } catch {
      setError("Não foi possível cadastrar a categoria.");
    }
  }

  return (
    <div className="category-page">
      <div className="category-card">
        <h1>Nova Categoria</h1>

        <form className="category-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          <div className="button-group">
            <button type="submit" className="primary-button">
              Salvar
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/institution/categories")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
