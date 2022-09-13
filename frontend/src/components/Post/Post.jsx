import React, { useState } from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faGear } from "@fortawesome/free-solid-svg-icons";

function Post(props) {
    const id = props.id;
    const [like, setLike] = useState(1);
    const [isliked, setIsLiked] = useState(false);

    const LikeButton = () => {
        setIsLiked((current) => !current);
    };

    const DeletePost = () => {
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

    const LikePost = () => {
        const LikeSubmit = {
            like: like,
        };
        fetch(`http://localhost:8000/api/post/like/${props.id}`, {
            method: "POST",
            headers: { Accept: "*/*", "Content-Type": "application/json" },
            body: JSON.stringify(LikeSubmit),
            credentials: "include",
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
                                            onClick={(e) => {
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
                <section className="like">
                    <FontAwesomeIcon
                        icon={faHeart}
                        id="like"
                        style={{
                            color: isliked ? "#fd2d01" : "",
                        }}
                        onClick={() => {
                            if (like === 1) {
                                setLike(0);
                                LikeButton();
                            } else if (like === undefined) {
                                setLike(1);
                                LikeButton();
                            } else {
                                setLike(1);
                                LikeButton();
                            }
                            LikePost();
                        }}
                    />
                    <p>{props.likes}</p>
                </section>
            </article>
        </div>
    );
}

export default Post;
