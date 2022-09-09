import React from 'react'
import './Post.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons"

function Post( props ) {
    return (
        <div className='posts'>
            <article className='post'>
                <div className='user'><img src={props.imageProfil} alt="" className='user_picture'/><h3 className='user_name'>{props.pseudo}</h3></div>
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
