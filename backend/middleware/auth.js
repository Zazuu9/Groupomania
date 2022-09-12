const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.Token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
