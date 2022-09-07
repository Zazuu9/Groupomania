const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')


mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true)
        next();
    });

app.use(express.json());
app.use(cookieParser())

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;