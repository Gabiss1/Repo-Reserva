import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import { AuthProvider } from "./contexts/AuthContexts";

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