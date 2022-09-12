const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserValidator = require("../validators/user");
const Utils = require("../utils/getUserInfo");

exports.signup = (req, res, next) => {
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({ message: "Merci de rentrer une adresse mail valide !" });
    }
    if (!UserValidator.validatePassword(req.body.password)) {
        return res.status(400).json({
            message: "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre",
        });
    }
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                pseudo: req.body.pseudo,
                imageProfil: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                birthday: req.body.birthday,
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(409).json({ message: "Merci de remplir tous les champs !" }));
        })
        .catch((error) => res.status(500).json({ error: error, message: "Merci de remplir tous les champs !" }));
};

exports.login = (req, res, next) => {
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({ message: "Merci de rentrer une adresse valide !" });
    }
    if (!UserValidator.validatePassword(req.body.password)) {
        return res.status(400).json({
            message: "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre",
        });
    }
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "Compte inexistant, merci de vous inscrire !" });
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({ message: "Identifiant/mot de passe incorrect" });
                        } else {
                            res.status(201).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: "24h" }),
                            });
                        }
                    })
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error: error, message: "Identifiant/mot de passe incorrect" }));
};

exports.getAllUser = (req, res, next) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = async (req, res, next) => {
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({ message: "Merci de rentrer une adresse mail valide !" });
    }
    if (!UserValidator.validateUserName(req.body.pseudo)) {
        return res.status(400).json({ message: "Merci de rentrer un pseudo valide !" });
    }
    const modifyUser = req.file
        ? {
              ...req.body,
          }
        : { pseudo: req.body.pseudo, email: req.body.email };

    User.updateOne({ _id: req.auth.userId }, { ...modifyUser })
        .then((user) => res.status(200).json({ message: "Utilisateur modifié !" }))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.auth.userId })
        .then((user) => res.status(200).json({ message: "Utilisateur supprimé !" }))
        .catch((error) => res.status(500).json({ error }));
};

exports.getUserInfo = (req, res) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json({ error }));
};

exports.changePsswd = (req, res, next) => {
    const password = req.body.password;
    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            if (!UserValidator.validatePassword(req.body.password)) {
                return res.status(400).json({
                    message:
                        "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre",
                });
            }
            bcrypt
                .hash(password, 10)
                .then((hash) => {
                    user.update({
                        password: hash,
                        id: req.auth.userId,
                    })
                        .then(() => res.status(201).json({ message: "Mot de passe modifié" }))
                        .catch((error) => res.status(500).json({ error }));
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
