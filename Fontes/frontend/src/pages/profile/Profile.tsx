import { useAuth } from "../../contexts/AuthContexts";
import "./Profile.css";

export default function Profile() {

    const { user } = useAuth();

    if (!user) return null;

    return (

        <div className="page">

            <h1>Meu Perfil</h1>

            <div className="card">

                <label>Nome</label>

                <input defaultValue={user.name}/>

                <label>Email</label>

                <input defaultValue={user.email}/>

                <button>

                    Salvar

                </button>

            </div>

            <div className="card">

                <h2>Alterar Senha</h2>

                <input
                    placeholder="Senha atual"
                    type="password"
                />

                <input
                    placeholder="Nova senha"
                    type="password"
                />

                <button>

                    Alterar senha

                </button>

            </div>

        </div>

    );

}