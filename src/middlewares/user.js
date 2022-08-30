const userService = require('../services/user');
const postService = require('../services/post');

const verifyDisplayName = (req, res, next) => {
    const { displayName } = req.body;
    if ((displayName === undefined) || (displayName.length < 8)) {
        return res.status(400)
            .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
};

const verifyEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if ((email === undefined) || (!emailRegex.test(email))) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next();
};

const verifyPassword = (req, res, next) => {
    const { password } = req.body;
    if ((password === undefined) || (password.length < 6)) {
        return res.status(400)
            .json({ message: '"password" length must be at least 6 characters long' });
    }
    next();
};

const emailExist = async (req, res, next) => {
    const { email } = req.body;
    const exist = await userService.emailExist(email);
    if (exist) {
        return res.status(409).json({ message: 'User already registered' });
    }
    next();
};

const verifyId = async (req, res, next) => {
    const { id } = req.params;
    const exist = await userService.idExist(id);
    if (!exist) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    next();
};

const userValidation = async (req, res, next) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    console.log('userValidation', id, userId);
    const post = await postService.findPost(userId, id);
    console.log('post', post);
    if (!post) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
  next();
};

module.exports = {
    verifyDisplayName,
    verifyEmail,
    verifyPassword,
    emailExist,
    verifyId,
    userValidation,
};