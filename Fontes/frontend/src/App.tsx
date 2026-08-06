import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientDashboard from "./pages/PatientDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import { AuthProvider } from "./contexts/AuthContexts";
import Login from "./pages/login/Login";

export default function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/dashboard"
                        element={<PatientDashboard />}
                    />

                    <Route
                        path="/institution"
                        element={<InstitutionDashboard />}
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>

    );

}