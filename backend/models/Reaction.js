const mongoose = require('mongoose');

const likesScehma = mongoose.Schema ({
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: Array, required: false, },
    usersDisliked: { type: Array, required: false },
})

module.exports = mongoose.model('Reaction', likesScehma);