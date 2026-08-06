import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";
import { createUser } from "../../api/services/UserService";

export default function RegisterUser() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    async function handleRegister(
        e: React.FormEvent
    ) {

        e.preventDefault();

        if (password !== confirmPassword) {

            setError("As senhas não coincidem.");

            return;

        }

        await createUser({

            name,

            cpf,

            email,

            password,

        });

        navigate("/login");

    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>MedicApp</h1>

                <h2>Cadastro de Usuário</h2>

                <form onSubmit={handleRegister}>

                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) =>
                            setCpf(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    {

                        error &&

                        <p className="error">

                            {error}

                        </p>

                    }

                    <button
                        className="primary-button"
                    >
                        Cadastrar
                    </button>

                </form>

                <p
                    className="link"
                    onClick={() =>
                        navigate("/register")
                    }
                >
                    ← Voltar
                </p>

            </div>

        </div>

    );

}