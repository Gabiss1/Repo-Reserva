import { useEffect, useState } from "react";

import { getPatientDashboard } from "../api/services/PatientDashboardService";
import { PatientDashboardDTO } from "../api/types/dashboard/PatientDashboardDTO";

export default function PatientDashboard() {

    const [dashboard, setDashboard] =
        useState<PatientDashboardDTO | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response =
                    await getPatientDashboard();

                setDashboard(response);

            } catch {

                setError(
                    "Não foi possível carregar o dashboard."
                );

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return <h2>Carregando...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    if (!dashboard) {

        return <h2>Nenhum dado encontrado.</h2>;

    }

    return (

        <div
            style={{
                padding: "32px",
            }}
        >

            <h1>

                Olá,
                {" "}
                {dashboard.patient.name}

            </h1>

            <hr />

            <h2>Aderência</h2>

            <p>

                {dashboard.adherence.adherencePercentage}% de adesão

            </p>

            <hr />

            <h2>Próxima dose</h2>

            {

                dashboard.nextDose ?

                    <div>

                        <p>

                            Medicamento:
                            {" "}
                            {dashboard.nextDose.medication}

                        </p>

                        <p>

                            Horário:
                            {" "}
                            {
                                new Date(
                                    dashboard.nextDose.scheduledTime
                                ).toLocaleString()
                            }

                        </p>

                    </div>

                    :

                    <p>

                        Nenhuma dose programada.

                    </p>

            }

            <hr />

            <h2>Agenda de Hoje</h2>

            {

                dashboard.todayAgenda.map(
                    agenda => (

                        <div
                            key={agenda.doseId}
                        >

                            <strong>

                                {agenda.medication}

                            </strong>

                            <p>

                                {
                                    new Date(
                                        agenda.scheduledTime
                                    ).toLocaleTimeString()
                                }

                            </p>

                        </div>

                    )
                )

            }

            <hr />

            <h2>Tratamentos ativos</h2>

            {

                dashboard.activeTreatments.map(
                    treatment => (

                        <div
                            key={treatment.id}
                        >

                            <strong>

                                {treatment.medication}

                            </strong>

                            <p>

                                {treatment.dosage}

                            </p>

                        </div>

                    )
                )

            }

        </div>

    );

}