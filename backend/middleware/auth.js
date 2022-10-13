const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const role = decodedToken.role;
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
            role: role,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
