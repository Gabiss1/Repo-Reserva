import {
    useState
} from "react";

import {
    useAuth
} from "../../hooks/useAuth";


export default function Login(){


    const {
        login
    } = useAuth();



    const [email,setEmail] =
        useState("");

    const [password,setPassword] =
        useState("");

    const [error,setError] =
        useState("");




    async function handleSubmit(
        e:React.FormEvent
    ){

        e.preventDefault();


        try{

            await login(
                email,
                password
            );


        }catch(error){

            setError(
                "Email ou senha inválidos"
            );

        }

    }



    return (

        <form
            onSubmit={handleSubmit}
        >

            <h1>
                Login
            </h1>


            {
                error &&
                <p>
                    {error}
                </p>
            }



            <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={
                    e=>setEmail(e.target.value)
                }

            />



            <input

                type="password"

                placeholder="Senha"

                value={password}

                onChange={
                    e=>setPassword(e.target.value)
                }

            />



            <button>

                Entrar

            </button>


        </form>

    );

}