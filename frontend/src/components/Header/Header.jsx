import React from "react"
import Logo from "../../assets/Logo/icon-left-font-monochrome-black.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons"
import "./Header.css"

function Header() {
    return (
        <header>
            <img src={Logo} alt="Groupomania" />
            <FontAwesomeIcon icon={faRightFromBracket} className="Logout"/>
        </header>
    )
}

export default Header