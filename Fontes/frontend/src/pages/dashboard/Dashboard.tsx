import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

import { useAuth } from "../../contexts/AuthContexts";
import { getInstitutionDashboard } from "../../api/services/InstitutionDashboardService";
import { InstitutionDashboard } from "../../api/types/dashboard/InstitutionDashboard";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const isInstitution = user?.role === "institution";

  const [dashboard, setDashboard] = useState<InstitutionDashboard | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      if (!user || !isInstitution) {
        setLoading(false);
        return;
      }

      try {
        const response = await getInstitutionDashboard(user.id);

        setDashboard(response);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);

        setError("Não foi possível carregar os dados da instituição.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user, isInstitution]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">Carregando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>MedicApp</h1>

            <p>Painel principal</p>
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/profile")}
          >
            Meu Perfil
          </button>
        </header>

        <main className="dashboard-content">
          <h2>Olá, {dashboard?.institution.name || user?.name}</h2>

          {dashboard && (
            <>
              <p className="dashboard-cnpj">
                CNPJ: {dashboard.institution.cnpj}
              </p>

              <section className="dashboard-statistics">
                <div className="dashboard-stat-card">
                  <strong>{dashboard.statistics.totalPatients}</strong>

                  <span>Pacientes</span>
                </div>

                <div className="dashboard-stat-card">
                  <strong>{dashboard.statistics.activeTreatments}</strong>

                  <span>Tratamentos ativos</span>
                </div>

                <div className="dashboard-stat-card">
                  <strong>{dashboard.statistics.todayDoses}</strong>

                  <span>Doses hoje</span>
                </div>

                <div className="dashboard-stat-card">
                  <strong>{dashboard.statistics.missedToday}</strong>

                  <span>Doses atrasadas</span>
                </div>

                <div className="dashboard-stat-card">
                  <strong>{dashboard.statistics.adherencePercentage}%</strong>

                  <span>Adesão</span>
                </div>
              </section>
            </>
          )}

          <h2 className="dashboard-section-title">Acesso rápido</h2>

          <div className="dashboard-grid">
            {isInstitution && (
              <>
                <button
                  className="dashboard-option"
                  onClick={() => navigate("/institution/patients")}
                >
                  <strong>Pacientes</strong>

                  <span>Gerenciar pacientes</span>
                </button>

                <button
                  className="dashboard-option"
                  onClick={() => navigate("/institution/treatments")}
                >
                  <strong>Tratamentos</strong>

                  <span>Gerenciar tratamentos</span>
                </button>

                <button
                  className="dashboard-option"
                  onClick={() => navigate("/institution/medications")}
                >
                  <strong>Medicamentos</strong>

                  <span>Gerenciar medicamentos</span>
                </button>

                <button
                  className="dashboard-option"
                  onClick={() => navigate("/institution/categories")}
                >
                  <strong>Categorias</strong>

                  <span>Gerenciar categorias</span>
                </button>
              </>
            )}

            {!isInstitution && (
              <>
                <button
                  className="dashboard-option"
                  onClick={() => navigate("/treatments")}
                >
                  <strong>Meus Tratamentos</strong>

                  <span>Consultar seus tratamentos</span>
                </button>

                <button
                  className="dashboard-option"
                  onClick={() => navigate("/patient-dashboard")}
                >
                  <strong>Meu Dashboard</strong>

                  <span>Consultar suas informações</span>
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
