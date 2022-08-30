const userService = require('../services/user');
const Token = require('../helpers/token');

const verifyLoginBody = (req, res, next) => {
    const { email, password } = req.body;
    if ((email === undefined) || (email.length === 0)) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    if ((password === undefined) || (password.length === 0)) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};

const userExists = async (req, res, _next) => {
    const { email, password } = req.body;
    const user = await userService.userExists(email, password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    const { id } = user.dataValues;
    const token = Token.createToken(email, id);
    return res.status(200).json({ token });
};

module.exports = {
    verifyLoginBody,
    userExists,
};