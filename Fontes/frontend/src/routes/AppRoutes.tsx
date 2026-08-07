import { Routes, Route, Navigate } from "react-router-dom";

import PatientDashboard from "../pages/PatientDashboard";
import PrivateRoute from "./PrivateRoutes";
import InstitutionDashboard from "../pages/dashboard/InstitutionDashboard";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import RegisterChoice from "../pages/register/RegisterChoice";
import RegisterInstitution from "../pages/register/RegisterInstitution";
import RegisterUser from "../pages/register/RegisterUser";
import CreatePatient from "../pages/patients/CreatePatient";
import PatientProfile from "../pages/patients/PatientProfile";
import EditPatient from "../pages/patients/EditPatient";
import CreateTreatment from "../pages/patients/CreateTreatment";
import CategoryList from "../pages/category/CategoryList";
import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";
import CreateMedication from "../pages/medication/CreateMedication";
import MedicationList from "../pages/medication/MedicationList";
import EditMedication from "../pages/medication/EditMedication";

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

      <Route path="/register" element={<RegisterChoice />} />

      <Route path="/register/user" element={<RegisterUser />} />

      <Route path="/register/institution" element={<RegisterInstitution />} />

      <Route
        path="/institution/patients/new"
        element={
          <PrivateRoute>
            <CreatePatient />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/patients/:id"
        element={
          <PrivateRoute>
            <PatientProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/patients/:id/edit"
        element={
          <PrivateRoute>
            <EditPatient />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/patients/:id/treatment"
        element={
          <PrivateRoute>
            <CreateTreatment />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/medications"
        element={
          <PrivateRoute>
            <MedicationList />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/medications/new"
        element={
          <PrivateRoute>
            <CreateMedication />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/medications/:id/edit"
        element={
          <PrivateRoute>
            <EditMedication />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/categories"
        element={
          <PrivateRoute>
            <CategoryList />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/categories/new"
        element={
          <PrivateRoute>
            <CreateCategory />
          </PrivateRoute>
        }
      />

      <Route
        path="/institution/categories/:id/edit"
        element={
          <PrivateRoute>
            <EditCategory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
