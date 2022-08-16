const mongoose = require('mongoose');

const likesScehma = mongoose.Schema ({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    type: { type: String, required: true }
})

module.exports = mongoose.model('Reaction', likesScehma);