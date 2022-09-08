import React from 'react'
import './Post.css'

function Post( props ) {
    return (
        <div className='posts'>
            <article className='post'>
                <div className='user'><img src={props.imageProfil} alt="" className='user_picture'/><h3 className='user_name'>{props.pseudo}</h3></div>
                <p className='message'>{props.message}</p>
                <img src={props.imagePost} alt="" className='PostImage'/>
            </article>
        </div>
    )
}

export default Post
