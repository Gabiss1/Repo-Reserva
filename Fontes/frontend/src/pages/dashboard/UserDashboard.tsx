import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { UserDashboard } from "../../api/services/UserDashboard";
import { getUserDashboard } from "../../api/services/DashboardService";
import "./dashboard.css"

export default function UserDashboardPage() {

    const { user } = useAuth();

    const [dashboard, setDashboard] =
        useState<UserDashboard | null>(null);

    useEffect(() => {

        async function load() {

            if (!user) return;

            const data =
                await getUserDashboard(user.id);

            setDashboard(data);

        }

        load();

    }, [user]);

    if (!dashboard)
        return <p>Carregando...</p>;

    return (

        <div className="page">

            <h1>Meu Dashboard</h1>

            <section className="card">

                <h2>Aderência</h2>

                <h1>{dashboard.adherence.adherencePercentage}%</h1>

            </section>

            <section className="card">

                <h2>Próxima Dose</h2>

                <p>{dashboard.nextDose?.medication}</p>

                <p>{dashboard.nextDose?.scheduledTime}</p>

            </section>

            <section className="card">

                <h2>Tratamentos</h2>

                {dashboard.activeTreatments.map(treatment => (

                    <div key={treatment.id}>

                        {treatment.medication}

                    </div>

                ))}

            </section>

        </div>

    );

}