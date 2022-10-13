import { React } from "react";
import Logo from "../../assets/Logo/icon-left-font-monochrome-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./Header.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate("/dashboard");
    };

    const handleClickProfil = () => {
        navigate(`/profil`);
    };

    const handleClickLogout = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    useEffect(() => {
        if (Cookies.get("token") === undefined) {
            navigate("/login");
        }
    }, []);

    return (
        <header>
            <img src={Logo} alt="Groupomania" className="Logo" onClick={handleClickLogo} />
            <div className="user_tab">
                <FontAwesomeIcon icon={faUser} className="Profil" onClick={handleClickProfil} />
                <FontAwesomeIcon icon={faRightFromBracket} className="Logout" onClick={handleClickLogout} />
            </div>
        </header>
    );
};

export default Header;
