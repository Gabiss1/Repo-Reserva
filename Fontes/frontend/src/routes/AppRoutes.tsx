import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import PatientDashboard from "../pages/PatientDashboard";
import PrivateRoute from "./PrivateRoutes";
import InstitutionDashboard from "../pages/InstitutionDashboard";
import Login from "../pages/Login";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <PatientDashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/institution"
                element={
                    <PrivateRoute>
                        <InstitutionDashboard />
                    </PrivateRoute>
                }
            />

        </Routes>

    );

}