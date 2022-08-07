const Post = require('../models/Post');
const fs = require('fs');
const PostValidator = require('../validators/post');

exports.createPost = (req, res ,next) => {
    const postObject = JSON.parse(req.body.post);

    if (!PostValidator.validateMesssage(postObject.message)) {
        return res.status(400).json({ message: "Merci d'écrire quelque chose"})
    };
    
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
    });
    post.save()
    .then(() => {res.status(201).json({message: 'Publication enregistré !'})})
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    Post.find()
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error}))
}

exports.modifyPost = (req, res ,nexy) => {
    Post.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

exports.deletePost = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
    .then((post) => res.status(201).json(post))
    .catch(error => res.status(500).json({error}))
};

