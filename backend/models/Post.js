const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    imagePost: { type: String, required: false },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: Array, required: false },
    creationDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Posts", postsSchema);
