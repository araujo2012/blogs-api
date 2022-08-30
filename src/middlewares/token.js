const Token = require('../helpers/token');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    Token.verifyToken(req, token);
    if (!req.user) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
};

module.exports = {
    verifyToken,
};