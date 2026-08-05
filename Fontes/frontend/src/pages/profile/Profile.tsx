import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import { getUser, updateUser } from "../../api/services/UserService";

import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;

      const data = await getUser(user.id);

      setName(data.name);

      setEmail(data.email);
    }

    load();
  }, []);

  async function save() {
    if (!user) return;

    await updateUser(user.id, {
      name,
      email,
    });

    alert("Perfil atualizado!");
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Meu Perfil</h1>

        <label>Nome</label>

        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>

        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <button onClick={save}>Salvar alterações</button>
      </div>
    </div>
  );
}