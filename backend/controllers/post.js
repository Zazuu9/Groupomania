const { count } = require("console");
const { json } = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Posts = require("../models/Post");
const Users = require("../utils/getUserInfo");

exports.createPost = (req, res, next) => {
    const toAdd = req.file
        ? {
              userId: req.auth.userId,
              message: req.body.message,
              imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
        : {
              userId: req.auth.userId,
              message: req.body.message,
          };
    const post = new Posts({
        ...toAdd,
    });
    post.save()
        .then(() => res.status(201).json({ message: "Publication enregistré avec succes" }))
        .catch((error) => res.status(400).json({ error: error, message: "Impossible de publier un post vide !" }));
};

exports.getAllPost = async (req, res, next) => {
    try {
        const Post = await Posts.find();

        const Postmap = await Promise.all(
            Post.map(async (Data) => {
                const UserInfo = await Users.GetUserInfo(Data.userId);
                return {
                    id: Data._id,
                    userId: Data.userId,
                    message: Data.message,
                    imagePost: Data.imagePost,
                    likes: Data.likes,
                    pseudo: UserInfo.pseudo,
                    imageProfil: UserInfo.imageProfil,
                    creationDate: Data.creationDate,
                    likestatus: Data.usersLiked.includes(req.auth.userId),
                    settings: req.auth.role === "admin" || req.auth.userId === Data.userId,
                };
            })
        );
        res.status(200).json(Postmap);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOnePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.role === "admin" || post.userId === req.auth.userId) {
                const modifyPost = req.file
                    ? {
                          message: req.body.message,
                          imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                      }
                    : {
                          message: req.body.message,
                      };
                Posts.updateOne({ _id: req.params.id }, { ...modifyPost })
                    .then((post) => res.status(200).json({ message: "Post modifié !" }))
                    .catch((error) => res.status(501).json({ error }));
            } else {
                return res
                    .status(401)
                    .json({ message: "Vous ne pouvez pas modifier un post qui ne vous appartient pas" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.role === "admin" || post.userId === req.auth.userId) {
                Posts.deleteOne({ _id: post.id })
                    .then((post) => {
                        res.status(201).json(post);
                    })
                    .catch((error) => res.status(500).json({ message: "test" }));
            } else {
                return res
                    .status(401)
                    .json({ message: "Vous ne pouvez pas supprimer un post qui ne vous appartient pas" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.likePost = async (req, res, next) => {
    const post = await Posts.findOne({ _id: req.params.id });
    if (req.body.like === true) {
        Posts.updateOne(
            { _id: req.params.id },
            {
                //$push: { usersLiked: req.auth.userId },
                $addToSet: { usersLiked: req.auth.userId },
                $inc: { likes: req.body.like },
            }
        )
            .then((post) => res.status(200).json({ message: "Ajout Like" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        Posts.findOne({ _id: req.params.id })
            .then((post) => {
                Posts.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.auth.userId }, $inc: { likes: -1 } })
                    .then((post) => {
                        res.status(200).json({ message: "Suppression Like" });
                    })
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
    }
};
