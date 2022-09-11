import  { React, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Profil.css'

function Profil() {
    const [userInfo, setUserInfo] = useState([])
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)


    useEffect(() => {
        fetch('http://localhost:8000/api/auth/getoneuser', {
            credentials: 'include',
        }) 
        .then(res => res.json())
        .then(Data => setUserInfo(Data))
        .catch(error => console.log(error))


    }, [])


    const modifyUser = (e) => {
        e.preventDefault()

        const DataSubmit = {
            pseudo: pseudo,
            email: email,
        }
        console.log(DataSubmit);

        

        fetch('http://localhost:8000/api/auth/modifyuser', {
            headers: {Accept: 'application/json', 'Content-type': 'application/json'},
            method : 'PUT',
            body: JSON.stringify(DataSubmit),
            credentials: 'include',
        })
        .then(res => res.json())
        .catch(error => console.log(error))

        
    }

    const modifyPassword = (e) => {
        e.preventDefault()
        
        const DataPasswordSubmit = {
            password: password
        }

        console.log(DataPasswordSubmit);
        fetch('http://localhost:8000/api/auth/changepwd', {
            headers: {'Content-type': 'application/json'},
            method : 'PUT',
            body: JSON.stringify(DataPasswordSubmit),
            credentials: 'include',
        })
        .then(res => res.json())
        .catch(error => console.log(error))
    }
    


    return (
        <main>
            <Header />
            <div>   
                <img src={userInfo.file} alt="" />
                <div className='info_user'>
                    <h3 className='userInfo_pseudo'>{userInfo.pseudo}</h3>
                    <section className='other_info'>
                        <p className='userInfo_birthday'>{userInfo.birthday}</p>
                        <p className='userInfo_email'>{userInfo.email}</p>
                    </section>
                </div>
            </div>
            <form method="put" className='form_user'>
                <label htmlFor='pseudo'>Pseudo :<input type="text" onChange={(e) => setPseudo(e.target.value)} name="pseudo" id="pseudo" placeholder={userInfo.pseudo}/></label>
                <label htmlFor='email'>Email :<input type="text" onChange={(e) => setEmail(e.target.value)}name="email" id="email" placeholder={userInfo.email}/></label>
                <div className='btn'><input type="submit" value="Modifier" onClick={modifyUser} className="modify_btn" /></div>
            </form>
            <form action="put" className='form_password'>
                <label htmlFor='password'>Mot de passe :<input type="password" onChange={(e) => setPassword(e.target.value)}name="password" id="password" placeholder="********"/></label>
                <div className='btn'><input type="submit" value="Modifier" onClick={modifyPassword} className="modify_btn" /></div>
            </form>
            
        </main>
    )
}

export default Profil