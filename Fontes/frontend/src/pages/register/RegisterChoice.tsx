import { useNavigate } from "react-router-dom";

import "./register.css";

export default function RegisterChoice() {

    const navigate = useNavigate();

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>MedicApp</h1>

                <h2>Criar nova conta</h2>

                <div className="register-options">

                    <button
                        className="primary-button"
                        onClick={() => navigate("/register/user")}
                    >
                        Conta de Usuário
                    </button>

                    <button
                        className="secondary-button"
                        onClick={() => navigate("/register/institution")}
                    >
                        Conta de Instituição
                    </button>

                </div>

                <p
                    className="link"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    ← Voltar para Login
                </p>

            </div>

        </div>

    );

}