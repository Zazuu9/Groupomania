import React from "react"
import Logo from "../../assets/Logo/icon-left-font-monochrome-black.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons"
import "./Header.css"
import Cookies from "js-cookie"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()

    useEffect(()=> {if (Cookies.get('Token') === undefined){navigate('/login')}})
    const handleClick = () => {
        Cookies.remove('Token')
        navigate('/login')
    }
    return (
        <header>
            <img src={Logo} alt="Groupomania" className="Logo"/>
            <FontAwesomeIcon icon={faRightFromBracket} className="Logout" onClick={handleClick}/>
        </header>
    )
}

export default Header