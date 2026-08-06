import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContexts";

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

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                margin: "100px auto",
                gap: "12px",
            }}
        >

            <h2>MedicApp</h2>

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
                <span
                    style={{
                        color: "red",
                    }}
                >
                    {error}
                </span>
            }

            <button
                onClick={handleLogin}
            >
                Entrar
            </button>

        </div>

    );

}