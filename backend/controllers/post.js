const { count } = require('console');
const { json } = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const Posts = require('../models/Post');
const Reactions = require('../models/Reaction');

exports.createPost = (req, res ,next) => {

    const post = new Posts({
        userId: req.auth.userId,
        message: req.body.message,
        imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });

    post.save()
    .then(() =>res.status(201).json({message: "Publication enregistré"}))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    Posts.find()
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, next) => {
    Posts.findOne({_id: req.params.id})
    .then((post) => {
        Reactions.find({postId: post.id})
        .then(reactions => {
            post.reactions = reactions
            res.status(200).json(post)
        })
    })
    .catch(error => res.status(404).json({error}))
}

exports.modifyPost = (req, res ,next) => {
    Posts.updateOne({_userId: req.params.userId}, {...req.body, _userId: req.params.userId})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

exports.deletePost = (req, res, next) => {
    Posts.deleteOne({_id: req.params.id})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

exports.addReaction = (req ,res) => {
    Reactions.findOne({postId: req.params.id, userId: req.auth.userId})
        .then((reaction) => {
            if (reaction) {return res.status(200).json({message: 'Réaction déja existante !'})}
            if (!reaction) {const reaction = new Reactions ({
                userId : req.auth.userId,
                postId : req.params.id,
                type : req.body.type
            })
            reaction.save()
            .then((reaction) => res.status(201).json({message: 'Réaction ajoutée !'}))
            .catch(error => res.status(500).json({error}))}
        })
        .catch(error => res.status(500).json(error))
}

exports.updateReaction = (req, res) => {
    
}

exports.deleteReaction = (req ,res) => {
    Reactions.findOne({postId: req.params.id, userId: req.auth.userId})
        .then((reaction) => { 
            if (!reaction) {return res.status(404).json({message: 'Aucune réaction trouvé !'});}
            if (req.auth.userId == reaction.userId) {
            Reactions.deleteOne({_id : reaction._id})
            .then((reaction) => res.status(201).json({message: 'Réaction supprimé !'}))
            .catch(error => res.status(500).json({message: 'Impossible'}))
            }
        })
        .catch(error => res.status(500).json(error))
}




