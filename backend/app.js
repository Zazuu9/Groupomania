const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = ["http://localhost:3000", "http://api.groupomania.kgouaille.fr"];

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(
    cors({
        credentials: true,
        origin: allowedOrigins,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
