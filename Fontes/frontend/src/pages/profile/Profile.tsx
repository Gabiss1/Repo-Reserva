import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContexts";

import {
  getInstitution,
  updateInstitution,
  updateInstitutionPassword,
} from "../../api/services/InstitutionService";

import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInstitution() {
      if (!user) {
        return;
      }

      try {
        const institution = await getInstitution(user.id);

        setName(institution.name);
        setCnpj(institution.cnpj);
      } catch (error) {
        console.error("Erro ao carregar instituição:", error);

        setError("Não foi possível carregar os dados da instituição.");
      } finally {
        setLoading(false);
      }
    }

    loadInstitution();
  }, [user]);

  async function handleUpdateProfile(event: React.FormEvent) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setError("");
    setMessage("");
    setSaving(true);

    try {
      await updateInstitution(user.id, {
        name,
        cnpj,
      });

      setMessage("Perfil atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      setError("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePassword(event: React.FormEvent) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setError("");
    setMessage("");

    if (!oldPassword || !newPassword) {
      setError("Preencha os dois campos de senha.");

      return;
    }

    setPasswordSaving(true);

    try {
      await updateInstitutionPassword(user.id, {
        oldPassword,
        newPassword,
      });

      setOldPassword("");
      setNewPassword("");

      setMessage("Senha alterada com sucesso.");
    } catch (error) {
      console.error("Erro ao alterar senha:", error);

      setError("Não foi possível alterar a senha.");
    } finally {
      setPasswordSaving(false);
    }
  }

  if (!user || loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <h1 className="profile-title">Meu Perfil</h1>

            <p className="profile-subtitle">Informações da instituição</p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Voltar ao Dashboard
          </button>
        </div>

        {error && <p className="profile-error">{error}</p>}

        {message && <p className="profile-success">{message}</p>}

        <div className="profile-section">
          <h2>Informações da instituição</h2>

          <form className="profile-form" onSubmit={handleUpdateProfile}>
            <label>
              Nome
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

            <label>
              CNPJ
              <input
                type="text"
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
                required
              />
            </label>

            <div className="profile-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>

        <hr className="profile-divider" />

        <div className="profile-section">
          <h2>Alterar Senha</h2>

          <form className="profile-form" onSubmit={handleUpdatePassword}>
            <label>
              Senha atual
              <input
                type="password"
                placeholder="Senha atual"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                required
              />
            </label>

            <label>
              Nova senha
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </label>

            <div className="profile-actions">
              <button type="submit" disabled={passwordSaving}>
                {passwordSaving ? "Alterando..." : "Alterar senha"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
