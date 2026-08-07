import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCategoryById,
  updateCategory,
} from "../../api/services/CategoryService";

import "./category.css";

export default function EditCategory() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategory() {
      if (!id) {
        navigate("/institution/categories");

        return;
      }

      try {
        const category = await getCategoryById(id);

        setName(category.name);

        setDescription(category.description ?? "");
      } catch {
        setError("Não foi possível carregar a categoria.");
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [id, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    try {
      await updateCategory(id, {
        name,
        description,
      });

      navigate("/institution/categories");
    } catch {
      setError("Não foi possível atualizar a categoria.");
    }
  }

  if (loading) {
    return <div className="category-page">Carregando...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-card">
        <h1>Editar Categoria</h1>

        <form className="category-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" className="primary-button">
              Salvar Alterações
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
