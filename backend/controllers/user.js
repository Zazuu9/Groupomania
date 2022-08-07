const bcrypt = require('bcrypt')
const User = require('../models/User');


exports.signup = (req, res, next) => {
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
        .then(() => res.status(201).json('Utilisateur créé !'))
        .catch(error => res.status(409).json({message: "Soucis d'identifiant"}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    
};

exports.getAllUser = (req, res, next) => {
    User.find()
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.modifyUser = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
    .then((user) => res.status(201).json(user))
    .catch(error => res.status(500).json({error}))
}

