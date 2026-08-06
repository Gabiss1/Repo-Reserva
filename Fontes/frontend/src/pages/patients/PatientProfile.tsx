import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../../api/services/PatientService";
import { Patient } from "../../api/types/entities/Patient";
import "./Patient.css";

export default function PatientProfile() {

    const { id } = useParams();

    const [patient, setPatient] =
        useState<Patient>();

    useEffect(() => {

        async function load() {

            if (!id) return;

            const response =
                await getPatientById(id);

            setPatient(response);

        }

        load();

    }, [id]);

    if (!patient)
        return <p>Carregando...</p>;

    return (

        <div className="page">

            <h1>{patient.name}</h1>

            <div className="card">

                <p>CPF: {patient.cpf}</p>

                <p>Instituição: {patient.institution?.name}</p>

            </div>

            <div className="card">

                <button>

                    Novo Tratamento

                </button>

                <button>

                    Editar Paciente

                </button>

                <button>

                    Excluir Paciente

                </button>

            </div>

        </div>

    );

}