import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";
import ModifyPopup from "../../components/ModifyPopup.jsx/ModifyPopup";
import "./Dashboard.css";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [postId, setPostId] = useState("");

    const getId = (id) => {
        setPostId(id);
    };

    const DisplayPopup = () => {
        setOpenPopup(true);
    };

    const RefreshPost = () => {
        setRefresh(true);
    };

    useEffect(() => {
        setRefresh(false);
        fetch("http://localhost:8000/api/post/", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((post) => {
                setPosts(post);
            })
            .catch((error) => console.log(error));
    }, [refresh]);

    return (
        <div className={openPopup ? "scrollBloc" : ""}>
            {openPopup ? (
                <ModifyPopup
                    id={postId}
                    open={openPopup}
                    RefreshPost={RefreshPost}
                    onClose={() => setOpenPopup(false)}
                />
            ) : (
                ""
            )}
            <Header />
            <CreatePost RefreshPost={RefreshPost} />

            {posts.map((post) => (
                <Post
                    id={post.id}
                    key={post.id}
                    userId={post.userId}
                    message={post.message}
                    imagePost={post.imagePost}
                    pseudo={post.pseudo}
                    imageProfil={post.imageProfil}
                    likes={post.likes}
                    RefreshPost={RefreshPost}
                    OpenPopup={DisplayPopup}
                    getId={getId}
                />
            ))}
        </div>
    );
};

export default Dashboard;
