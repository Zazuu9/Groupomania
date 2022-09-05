
import React from "react";
import Logo from "../../assets/Logo//icon-left-font.svg"
import "./Signup.css"

const Signup = () => {
    return (
        <main>
            <img src={Logo} alt="Groupomania" />
            <form>
                <div class="test">
                    <label for="pseudo">Pseudo : </label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="John" />
                </div>

                <div class="test">
                    <label for="email">Email : </label>
                    <input type="text" id="email" name="email" placeholder="John@mail.com" />
                </div>

                <div class="test">
                    <label for="password">Mot de passe : </label>
                    <input type="password" id="password" name="password" placeholder="*************" />
                </div>

                <div class="test">
                    <label for="birthday">Date d'anniversaire : </label>
                    <input type="date" id="birthday" name="birthday" />
                </div>

                <div class="test">
                    <label for="avatar">Choisir une photo : </label>
                    <input type="file" id="avatar" name="avatar" accept="image/png; image/jpeg, image/jpg" />
                </div>
                
                <div class="btn">
                    <input type="submit" id="login" class="Signup" value="Inscription" />
                    
                </div>
            </form>

        </main>
    )
}

export default Signup;