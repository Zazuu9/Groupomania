import React, { useState } from "react";
import "./ModifyPopup.css";

const ModifyPopup = ({ open, onClose, id, RefreshPost, Message }) => {
    const [message, setMessage] = useState("");
    const [imagePost, setimagePost] = useState(null);

    const ModifyPost = (e) => {
        e.preventDefault();

        let formData = new FormData();

        if (message === "") {
            formData.append("message", Message);

            formData.append("image", imagePost);
        } else {
            formData.append("message", message);
            formData.append("image", imagePost);
        }

        fetch(`http://localhost:8000/api/post/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                onClose();
                RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    if (!open) return null;
    return (
        <div className="popup_background">
            <div className="popup">
                <form method="put" className="form_modify_post">
                    <label htmlFor="message" className="label_modify_message">
                        {" "}
                        Message :
                        <input
                            type="text"
                            maxLength={200}
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            id="message"
                            className="input_message"
                            placeholder={Message}
                        />
                    </label>
                    <label htmlFor="imagePost" className="image_modify_post">
                        Choisir une photo :{" "}
                        <input
                            type="file"
                            onChange={(e) => setimagePost(e.target.files[0])}
                            id="imagePost"
                            name="imagePost"
                            accept="image/png; image/jpeg, image/jpg"
                        />
                    </label>
                    <div className="btn_modify_post">
                        <input type="submit" class="modify_post_btn" value="Modifier" onClick={ModifyPost} />
                        <button onClick={onClose} className="close_btn">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifyPopup;
