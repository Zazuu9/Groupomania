import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";


const Dashboard = () => { 
    const [posts, setPosts] = useState([])

    useEffect(() => {
    
        fetch('http://localhost:8000/api/post/', {
            credentials: 'include',
        }) 
        .then(res => res.json())
        .then(post => {console.log(post); setPosts(post)})
        .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <Header />
            {posts.map(post => <Post userId = {post.userId} message={post.message} imagePost={post.imagePost} pseudo={post.pseudo} imageProfil={post.imageProfil} />)}
        </div>
    )
}


export default Dashboard;