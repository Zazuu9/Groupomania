import { React, useEffect, useState } from "react";
import "./CreatePost.css";

function CreatePost(props) {
    const [message, setMessage] = useState("");
    const [imagePost, setimagePost] = useState(null);

    const CreatePostSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("message", message);
        formData.append("image", imagePost);
        console.log(imagePost);

        fetch("http://localhost:8000/api/post/createpost", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                props.RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    return (
        <main>
            <form action="post" className="form_createpost">
                <label htmlFor="message" className="label_message">
                    Message :
                    <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        name="message"
                        id="message"
                        className="input_message"
                    />
                </label>
                <label for="imagePost" className="imagePost">
                    Choisir une photo :{" "}
                    <input
                        type="file"
                        onChange={(event) => setimagePost(event.target.files[0])}
                        id="imagePost"
                        name="imagePost"
                        accept="image/png; image/jpeg, image/jpg"
                    />
                </label>
                <input type="submit" id="login" class="publish_btn" value="Publier" onClick={CreatePostSubmit} />
            </form>
        </main>
    );
}

export default CreatePost;
