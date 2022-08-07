const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, required: false, default: 0 }
})

module.exports = mongoose.model('Post', postSchema);