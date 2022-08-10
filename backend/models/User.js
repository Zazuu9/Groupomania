const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserValidator = require('../validators/user');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: UserValidator.emailRegex },
    password: { type: String, required: true, match: UserValidator.passwordRegex },
    pseudo: { type: String, required: true },
    imageProfil: { type: String, required: true },
    birthday: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);