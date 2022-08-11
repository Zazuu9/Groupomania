const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserValidator = require('../validators/user');


exports.signup = (req, res, next) => {
    console.log(req.body)
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({message: "Merci de rentrer une adresse valide !"})
    };
    if (!UserValidator.validatePassword(req.body.password)) {
        return res.status(400).json({message: "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre"})
    };
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            pseudo: req.body.pseudo,
            imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            birthday: req.body.birthday,
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(409).json({message: "Adresse déja utilisé !"}))
    })
    .catch(error => res.status(500).json({error})) 
};

exports.login = (req, res, next) => {
    if (!UserValidator.validateEmail(req.body.email)) {
        return res.status(400).json({message: "Merci de rentrer une adresse valide !"})
    };
    if (!UserValidator.validatePassword(req.body.password)) {
        return res.status(400).json({message: "Votre mot de passe doit comprendre au moins 8 caractères, une lettre majuscule et un chiffre"})
    };
    User.findOne({email:req.body.email})
    .then(user => {
        if (!user) {
            res.status(404).json({message: 'Utilisateur non trouvé !'});
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Mot de passe incorrect'});
                }else{
                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                        {userId: user._id},
                        process.env.TOKEN_KEY,
                        {expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
};

exports.getAllUser = (req, res, next) => {
    User.find()
    .then((user) => res.status(200).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.getOneUser = (req, res, next) => {
    User.findOne({id: req.params.id})
    .then((user) => res.status(200).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.modifyUser = (req, res, next) => {
    User.updateOne({id: req.params.id}, {...req.body, id: req.params.id})
    .then((user) => res.status(200).json({message: 'Utilisateur modifié !'}))
    .catch(error => res.status(500).json({error}))
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({id: req.params.id})
    .then((user) => res.status(200).json({message: "Utilisateur supprimé !"}))
    .catch(error => res.status(500).json({error}))
}

