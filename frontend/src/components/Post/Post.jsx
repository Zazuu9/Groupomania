import React from 'react'
import './Post.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown, faGear} from "@fortawesome/free-solid-svg-icons"

function Post( props ) {
    const ModifyPost = () => {

        fetch('http://localhost:8000/api/post/', {
            method: 'PUT',
            credentials: 'include',
        }) 
        .then(res => res.json())
        .then(res => {console.log(res);})
        .catch(error => console.error(error))
    }

    const DeletePost = () => {
        console.log(props);
        fetch(`http://localhost:8000/api/post/${props.id}`, {
            method: 'DELETE',
            credentials: 'include',
        }) 
        .then(res => res.json())
        .then(res => {console.log(res);})
        .catch(error => console.error(error))
    }

    return (
        <div className='posts'>
            <article className='post'>
                <div className='top'>
                    <div className='user_info'>
                        <img src={props.imageProfil} alt="" className='user_picture'/>
                        <h3 className='user_name'>{props.pseudo}</h3>
                    </div>
                    <nav className='menu'>
                        <ul>
                            <li><FontAwesomeIcon icon={faGear} className="settings" />
                                <ul className='sub_menu'>
                                    <li><p className='modify' onClick={ModifyPost}>Modifier</p></li>
                                    <li><p className='delete' onClick={DeletePost}>Supprimer</p></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className='message'>{props.message}</p>
                <img src={props.imagePost} alt="" className='PostImage'/>
                <section className='like_dislike'>
                        <FontAwesomeIcon icon={faThumbsUp} className="like" />
                        <FontAwesomeIcon icon={faThumbsDown} className="dislike" />
                    

                </section>
            </article>
            
        </div>
    )
}

export default Post
