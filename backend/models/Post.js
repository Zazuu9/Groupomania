const mongoose = require('mongoose');
const PostValidator = require('../validators/post');

const postsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true, match: PostValidator.wordRegex},
    imagePost: { type: String, required: false },
})

module.exports = mongoose.model('Posts', postsSchema);