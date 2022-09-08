import  { React, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Profil.css'

function Profil() {
    const [userInfo, setUserInfo] = useState([])
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault()

        // const formData = new FormData() 
        // formData.append('pseudo', pseudo)
        // formData.append('email', email)
        // formData.append('password', password)
        // formData.append('image', image)

        const DataSubmit = {
            pseudo: pseudo,
            email: email,
            password: password,
            image: image
        }

        fetch('http://localhost:8000/api/auth/modifyuser', {
            
            headers: {Accept: 'application/json', 'Content-type': 'application/json'},
            method : 'PUT',
            body: JSON.stringify(DataSubmit),
            credentials: 'include',
        })
        .then(res => res.json())
        .catch(error => console.log(error))
    }
    

    useEffect(() => {
        fetch('http://localhost:8000/api/auth/getoneuser', {
            credentials: 'include',
        }) 
        .then(res => res.json())
        .then(Data => setUserInfo(Data))
        .catch(error => console.log(error))


    }, [])

    return (
        <main>
            <Header />
            <div>   
                <img src={userInfo.image} alt="" />
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
                <label htmlFor='password'>Mot de passe :<input type="password" onChange={(e) => setPassword(e.target.value)}name="password" id="password" placeholder="********"/></label>
                <label htmlFor='image'>Photo de Profil :<input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" id="image" accept="image/png; image/jpeg, image/jpg"/></label>
                <div className='btn'><input type="submit" value="Modifier" onClick={handleSubmit} className="modify_btn" /></div>
            </form>
        </main>
    )
}

export default Profil
