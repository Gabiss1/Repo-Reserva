import { Login, Dashboard } from "@mui/icons-material";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";


export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}