import React from 'react'
import './Post.css'

function Post( props ) {
    console.log(props.userId, props.message, props.imagePost);
    return (
        <div className='posts'>
            <article className='post'>
                <p className='message'>{props.message}</p>
                <img src={props.imagePost} alt="" className='PostImage'/>
            </article>
        </div>
    )
}

export default Post
