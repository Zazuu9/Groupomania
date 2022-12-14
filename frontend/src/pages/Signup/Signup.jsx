import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Logo from "../../assets/Logo//icon-left-font.svg";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [imageProfil, setimageProfil] = useState(null);

    const [error, setError] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("pseudo", pseudo);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("birthday", birthday);
        formData.append("image", imageProfil);
        fetch(process.env.REACT_APP_API_URL + "/api/auth/signup", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/login");
                }
                return res.json();
            })
            .then((res) => {
                setError(res.message);
            })
            .catch((error) => console.error(error));
    };

    return (
        <main>
            <img src={Logo} alt="Groupomania" />
            <form method="post" action="#" onSubmit={handleFormSubmit} className="form_signup">
                <div class="test">
                    <label for="pseudo">Pseudo : </label>
                    <input
                        type="text"
                        value={pseudo}
                        onChange={(event) => setPseudo(event.target.value)}
                        id="pseudo"
                        name="pseudo"
                        placeholder="John"
                    />
                </div>

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

                <div class="test">
                    <label for="birthday">Date d'anniversaire : </label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(event) => setBirthday(event.target.value)}
                        id="birthday"
                        name="birthday"
                    />
                </div>

                <div class="test">
                    <label for="avatar">Choisir une photo : </label>
                    <input
                        type="file"
                        onChange={(event) => setimageProfil(event.target.files[0])}
                        id="avatar"
                        name="avatar"
                        accept="image/png; image/jpeg, image/jpg"
                    />
                </div>
                {error !== "" ? <div className="signin_error">{error}</div> : ""}
                <div class="btn">
                    <input type="submit" id="login" class="Signup_btn" value="Inscription" />
                </div>
            </form>
        </main>
    );
}

export default Signup;
