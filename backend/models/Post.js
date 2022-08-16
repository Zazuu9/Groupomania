const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    imagePost: { type: String, required: false },
    reactions: [ {
        type: mongoose.Schema.Types.ObjectId, ref: "Reaction"
    } ]
})

module.exports = mongoose.model('Posts', postsSchema);