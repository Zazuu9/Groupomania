import React, { useState } from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faGear } from "@fortawesome/free-solid-svg-icons";

function Post(props) {
    const id = props.id;
    const [like, setLike] = useState("");

    const DeletePost = () => {
        console.log(props);
        fetch(`http://localhost:8000/api/post/${props.id}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                props.RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    const LikeStatus = (likeStatus) => {
        fetch(`http://localhost:8000/api/post/reaction/${id}`, {
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ type: likeStatus }),
        })
            .then((res) => res.json())
            .then((res) => {
                props.RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="posts">
            <article className="post">
                <div className="top">
                    <div className="user_info">
                        <img src={props.imageProfil} alt="" className="user_picture" />
                        <h3 className="user_name">{props.pseudo}</h3>
                    </div>
                    <nav className="menu">
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faGear} className="settings" />
                                <ul className="sub_menu">
                                    <li>
                                        <p
                                            className="modify"
                                            onClick={() => {
                                                props.OpenPopup();
                                                props.getId(id);
                                            }}
                                        >
                                            Modifier
                                        </p>
                                    </li>
                                    <li>
                                        <p className="delete" onClick={DeletePost}>
                                            Supprimer
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p className="message">{props.message}</p>
                <img src={props.imagePost} alt="" className="PostImage" />
                <section className="like_dislike">
                    <FontAwesomeIcon icon={faThumbsUp} className="like" onClick={() => LikeStatus("like")} />
                    <FontAwesomeIcon icon={faThumbsDown} className="dislike" onClick={() => LikeStatus("dislike")} />
                </section>
            </article>
        </div>
    );
}

export default Post;
