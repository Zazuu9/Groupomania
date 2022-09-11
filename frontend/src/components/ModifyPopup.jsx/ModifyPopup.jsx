import React, { useState } from "react";
import "./ModifyPopup.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModifyPopup = ({ open, onClose }) => {
    const [message, setMessage] = useState("");
    //const [imagePost, setimagePost] = useState(null);

    const ModifyPost = (e, props) => {
        e.preventDefault();

        const DataSubmit = {
            message: message,
        };
        // let formData = new FormData();
        // formData.append("message", message);
        // //formData.append("image", imagePost);

        fetch(`http://localhost:8000/api/post/${props.id}`, {
            headers: { Accept: "application/json", "Content-type": "multipart/form-data" },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(DataSubmit),
        })
            .then((res) => res.json())
            .then((res) => {
                props.RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    if (!open) return null;
    return (
        <div className="popup_background">
            <div className="popup">
                <FontAwesomeIcon icon={faXmark} onClick={onClose} className="close_btn" />
                <form method="put" className="form_modify_post">
                    <label htmlFor="message">
                        {" "}
                        Message :
                        <input
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            id="message"
                            placeholder="Entrez votre message "
                        />
                    </label>
                    {/* <label for="imagePost" className="imagePost">
                        Choisir une photo :{" "}
                        <input
                            type="file"
                            onChange={(e) => setimagePost(e.target.files[0])}
                            id="imagePost"
                            name="imagePost"
                            accept="image/png; image/jpeg, image/jpg"
                        />
                    </label> */}
                    <input type="" class="publish_btn" value="Modifier" onClick={ModifyPost} />
                </form>
            </div>
        </div>
    );
};

export default ModifyPopup;
