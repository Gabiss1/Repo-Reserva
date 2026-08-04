import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    login as loginService,
    logout as logoutService
} from "../api/services/AuthService";

import { User } from "../api/types/entities/User";
import { LoginResponse } from "../api/types/auth/LoginResponse";

interface AuthContextData {

    user: User | null;

    token: string | null;

    login(
        email: string,
        password: string
    ): Promise<LoginResponse>;

    logout(): void;

    isAuthenticated: boolean;

}

const AuthContext = createContext<AuthContextData | null>(
    null
);



export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [user, setUser] = useState<User | null>(
        JSON.parse(
            localStorage.getItem("user") || "null"
        )
    );

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );



    async function login(
        email: string,
        password: string
    ): Promise<LoginResponse> {

        const response =
            await loginService(
                email,
                password,
            );

        setUser(response.user);

        setToken(response.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.user),
        );

        return response;

    }



    function logout() {

        logoutService();

        localStorage.removeItem("user");

        setUser(null);

        setToken(null);

    }



    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        const storedUser =
            localStorage.getItem("user");

        if (storedToken) {

            setToken(storedToken);

        }

        if (storedUser) {

            setUser(
                JSON.parse(storedUser)
            );

        }

    }, []);



    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >

            {children}

        </AuthContext.Provider>
    );

}



export function useAuth() {

    const context = useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider"
        );

    }


    return context;
}