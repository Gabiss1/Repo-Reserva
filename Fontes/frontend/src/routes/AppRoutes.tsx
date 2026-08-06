import { Routes, Route, Navigate } from "react-router-dom";

import PatientDashboard from "../pages/PatientDashboard";
import PrivateRoute from "./PrivateRoutes";
import InstitutionDashboard from "../pages/dashboard/InstitutionDashboard";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

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

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
