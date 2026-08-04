import { useAuth } from "../contexts/AuthContexts";

export default function InstitutionDashboard() {

    const { user } = useAuth();

    return (

        <div>

            <h1>
                Dashboard da Instituição
            </h1>

            <p>

                Bem-vindo,
                {" "}
                {user?.name}

            </p>

        </div>

    );

}