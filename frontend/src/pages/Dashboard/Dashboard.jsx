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
    const [message, setMessage] = useState("");

    const sortData = (a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
    };

    const getId = (id, message) => {
        setPostId(id);
        setMessage(message);
    };

    const DisplayPopup = () => {
        setOpenPopup(true);
    };

    const RefreshPost = () => {
        setRefresh(true);
    };

    useEffect(() => {
        setRefresh(false);
        fetch(process.env.REACT_APP_API_URL + "/api/post/", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((post) => {
                post.sort(sortData);
                setPosts(post);
            })
            .catch((error) => console.log(error));
    }, [refresh]);
    return (
        <div className={openPopup ? "scrollBloc" : ""}>
            {openPopup ? (
                <ModifyPopup
                    id={postId}
                    Message={message}
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
                    creationDate={post.creationDate}
                    RefreshPost={RefreshPost}
                    OpenPopup={DisplayPopup}
                    getId={getId}
                    likestatus={post.likestatus}
                    settings={post.settings}
                />
            ))}
        </div>
    );
};

export default Dashboard;
