import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import React from "react";
import Logo from "../../assets/Logo//icon-left-font.svg";
import "./Signin.css";
import { useEffect } from "react";

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (Cookies.get("token") !== undefined) {
            navigate("/dashboard");
        }
    }, []);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {
            email,
            password,
        };
        fetch(process.env.REACT_APP_API_URL + "/api/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dataToSubmit),
        })
            .then((res) => res.json())

            .then((res) => {
                setError(res.message);

                if (res.token !== undefined) {
                    if (res.token) {
                        navigate("/dashboard");
                    }
                }
            })
            .catch((error) => console.error(error.message));
    };

    return (
        <main>
            <img src={Logo} alt="Groupomania" />
            <form method="post" action="#" onSubmit={handleFormSubmit} className="form_signin">
                <div class="test">
                    <label for="email">Email : </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        id="email"
                        name="email"
                        placeholder="John@mail.com"
                    />
                </div>

                <div class="test">
                    <label for="password">Mot de passe : </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                        name="password"
                        placeholder="*************"
                    />
                </div>
                {error !== "" ? <div className="signin_error">{error}</div> : ""}
                <div class="btn">
                    <input type="submit" id="login" class="Signin" value="Connexion" />
                    <Link to="/signup">
                        <button type="button" class="Signup">
                            Créer un compte
                        </button>
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default Signin;
