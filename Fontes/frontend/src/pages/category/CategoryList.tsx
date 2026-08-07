import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  findAllCategories,
  deleteCategory,
} from "../../api/services/CategoryService";

import { Category } from "../../api/types/entities/Category";

import "./category.css";

export default function CategoryList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      const response = await findAllCategories();

      setCategories(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir esta categoria?",
    );

    if (!confirmed) {
      return;
    }

    await deleteCategory(id);

    loadCategories();
  }

  if (loading) {
    return <div className="category-page">Carregando...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-card">
        <div className="page-header">
          <h1>Categorias</h1>

          <div className="page-actions">
            <button
              className="primary-button"
              onClick={() => navigate("/institution/categories/new")}
            >
              Nova Categoria
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Voltar ao Dashboard
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>

              <th>Descrição</th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td>{category.description ?? "-"}</td>

                <td>
                  <button
                    className="secondary-button"
                    onClick={() =>
                      navigate(`/institution/categories/${category.id}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => handleDelete(category.id)}
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
