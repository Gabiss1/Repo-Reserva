import { useEffect, useState } from "react";
import { getInstitutionDashboard } from "../../api/services/DashboardService";
import { InstitutionDashboard } from "../../api/types/dashboard/InstitutionDashboard";
import { useAuth } from "../../contexts/AuthContexts";
import "./dashboard.css";

export default function InstitutionDashboardPage() {

    const { user } = useAuth();

    const [dashboard, setDashboard] =
        useState<InstitutionDashboard | null>(null);

    useEffect(() => {

        async function load() {

            if (!user) return;

            const data =
                await getInstitutionDashboard(user.id);

            setDashboard(data);

        }

        load();

    }, [user]);

    if (!dashboard)
        return <p>Carregando...</p>;

    return (

        <div className="page">

            <h1>Dashboard da Instituição</h1>

            <div className="grid">

                <div className="card">

                    <h2>Pacientes</h2>

                    <h1>{dashboard.statistics.totalPatients}</h1>

                </div>

                <div className="card">

                    <h2>Tratamentos</h2>

                    <h1>{dashboard.statistics.activeTreatments}</h1>

                </div>

                <div className="card">

                    <h2>Doses Hoje</h2>

                    <h1>{dashboard.statistics.todayDoses}</h1>

                </div>

            </div>

        </div>

    );

}