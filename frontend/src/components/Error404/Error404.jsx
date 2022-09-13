import React from "react";
import "./Error404.css";
import Logo from "../../assets/Logo/icon-left-font.png";

export default function Error404() {
    return (
        <main>
            <img src={Logo} alt="" className="logo_404" />
            <h1 className="error_message">
                La page que vous rechercher est inexistante. <br />
                <br />
                Désolée...
            </h1>
        </main>
    );
}
