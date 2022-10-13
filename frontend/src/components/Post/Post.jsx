import React, { useState } from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faGear } from "@fortawesome/free-solid-svg-icons";

function Post(props) {
    const id = props.id;

    const DeletePost = () => {
        fetch(process.env.REACT_APP_API_URL + `/api/post/${props.id}`, {
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
        let like;
        if (props.likestatus) {
            like = false;
        } else {
            like = true;
        }
        fetch(process.env.REACT_APP_API_URL + `/api/post/like/${props.id}`, {
            method: "POST",
            headers: { Accept: "*/*", "Content-Type": "application/json" },
            body: JSON.stringify({ like: like }),
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
                                {props.settings ? <FontAwesomeIcon icon={faGear} className="settings" /> : ""}

                                <ul className="sub_menu">
                                    <li>
                                        <p
                                            className="modify"
                                            onClick={(e) => {
                                                props.OpenPopup();
                                                props.getId(id, props.message);
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
                <div className="message_image">
                    <p className="message">{props.message}</p>
                    <img src={props.imagePost} alt="" className="PostImage" />
                </div>
                <section className="like">
                    <FontAwesomeIcon
                        icon={faHeart}
                        id="like"
                        style={{
                            color: props.likestatus ? "#fd2d01" : "",
                        }}
                        onClick={() => {
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
