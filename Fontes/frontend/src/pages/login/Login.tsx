import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContexts";

import "./Login.css"

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleLogin() {

        try {

            const response = await login(
                email,
                password,
            );

            if (
                response.user.role === "institution"
            ) {

                navigate("/institution");

            } else {

                navigate("/dashboard");

            }

        } catch {

            setError(
                "E-mail ou senha inválidos."
            );

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    MedicApp
                </h1>

                <p className="login-subtitle">
                    Controle inteligente da administração de medicamentos
                </p>

                <form
                    className="login-form"
                    onSubmit={(e) => {

                        e.preventDefault();

                        handleLogin();

                    }}
                >

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    {

                        error &&

                        <span className="error-message">

                            {error}

                        </span>

                    }

                    <button
                        type="submit"
                    >
                        Entrar
                    </button>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Criar conta
                    </button>

                </form>

            </div>

        </div>

    );

}