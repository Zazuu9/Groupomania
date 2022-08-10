const fs = require('fs');
const jwt = require('jsonwebtoken')
const Posts = require('../models/Post');
const PostValidator = require('../validators/post');

exports.createPost = (req, res ,next) => {
    console.log(req.body);

    const post = new Posts({
        userId: req.body.userId,
        message: req.body.message,
        imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    post.save()
    .then(() =>res.status(201).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    Posts.find()
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, next) => {
    Posts.findOne({_id: req.params.id})
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error}))
}

exports.modifyPost = (req, res ,nexy) => {
    Posts.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

exports.deletePost = (req, res, next) => {
    Posts.deleteOne({_id: req.params.id})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

