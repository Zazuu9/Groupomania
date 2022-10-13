import { React, useState } from "react";
import "./CreatePost.css";

function CreatePost(props) {
    const [message, setMessage] = useState("");
    const [imagePost, setimagePost] = useState(null);
    const [error, setError] = useState("");

    const CreatePostSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        if (message === "") {
            formData.append("message", message);
            formData.append("image", imagePost);
        } else {
            formData.append("message", message);
            formData.append("image", imagePost);
        }

        fetch(process.env.REACT_APP_API_URL + "/api/post/createpost", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                setError(res.message);
                document.forms["form_createpost"].reset();
                setimagePost(null);
                setMessage("");
                setTimeout(() => {
                    setError("");
                }, "1000");

                props.RefreshPost();
            })
            .catch((error) => console.error(error));
    };

    return (
        <main>
            <form action="post" className="form_createpost" name="form_createpost">
                <label htmlFor="message" className="label_message">
                    Message :
                    <input
                        type="text"
                        maxLength="200"
                        onChange={(e) => setMessage(e.target.value)}
                        name="message"
                        id="message"
                        className="input_message"
                        placeholder="Entrez votre message "
                    />
                </label>
                <label htmlFor="imagePost" className="imagePost">
                    Choisir une photo :{" "}
                    <input
                        type="file"
                        onChange={(event) => setimagePost(event.target.files[0])}
                        id="imagePost"
                        name="imagePost"
                        accept="image/png; image/jpeg, image/jpg"
                    />
                </label>
                {error !== "" ? <div className="signin_error">{error}</div> : ""}
                <input type="submit" id="login" className="publish_btn" value="Publier" onClick={CreatePostSubmit} />
            </form>
        </main>
    );
}

export default CreatePost;
