import { React, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Profil.css";

function Profil() {
    const [userInfo, setUserInfo] = useState([]);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const RefreshProfil = () => {
        setRefresh(true);
    };

    useEffect(() => {
        setRefresh(false);
        fetch("http://localhost:8000/api/auth/getoneuser", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((Data) => setUserInfo(Data))
            .catch((error) => console.log(error));
    }, [refresh]);

    const modifyUser = (e) => {
        e.preventDefault();

        const DataSubmit = {
            pseudo: pseudo,
            email: email,
        };

        fetch("http://localhost:8000/api/auth/modifyuser", {
            headers: { Accept: "application/json", "Content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify(DataSubmit),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                setError(res.message);
                setTimeout(() => {
                    setError("");
                }, "1500");
                RefreshProfil();
            })
            .catch((error) => console.log(error));
    };

    const modifyPassword = (e) => {
        e.preventDefault();

        const DataPasswordSubmit = {
            password: password,
        };

        fetch("http://localhost:8000/api/auth/changepwd", {
            headers: { "Content-type": "application/json" },
            method: "PUT",
            body: JSON.stringify(DataPasswordSubmit),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                setErrorPassword(res.message);
                setTimeout(() => {
                    setErrorPassword("");
                }, "1500");
                RefreshProfil();
            })
            .catch((error) => console.log(error));
    };

    return (
        <main>
            <Header />
            <div>
                <img src={userInfo.file} alt="" />
                <div className="info_user">
                    <h3 className="userInfo_pseudo">{userInfo.pseudo}</h3>
                    <section className="other_info">
                        <p className="userInfo_birthday">{userInfo.birthday}</p>
                        <p className="userInfo_email">{userInfo.email}</p>
                    </section>
                </div>
            </div>
            <form method="put" className="form_user">
                <label htmlFor="pseudo">
                    Pseudo :
                    <input
                        type="text"
                        onChange={(e) => setPseudo(e.target.value)}
                        name="pseudo"
                        id="pseudo"
                        placeholder={userInfo.pseudo}
                    />
                </label>
                <label htmlFor="email">
                    Email :
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        placeholder={userInfo.email}
                    />
                </label>
                {error !== "" ? <div className="signin_error">{error}</div> : ""}
                <div className="btn">
                    <input type="submit" value="Modifier" onClick={modifyUser} className="modify_btn" />
                </div>
            </form>
            <form action="put" className="form_password">
                <label htmlFor="password">
                    Mot de passe :
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        placeholder="********"
                    />
                </label>
                {errorPassword !== "" ? <div className="signin_error">{errorPassword}</div> : ""}
                <div className="btn">
                    <input type="submit" value="Modifier" onClick={modifyPassword} className="modify_btn" />
                </div>
            </form>
        </main>
    );
}

export default Profil;
