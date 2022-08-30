const userServices = require('../services/user');
const Token = require('../helpers/token');

const newUser = async (req, res) => {
    const createdUser = await userServices.newUser(req.body);
    const { email } = req.body;
    console.log('cretedUser', createdUser);
    if (createdUser) {
        const { id } = createdUser.dataValues;
        const token = Token.createToken(email, id);
        return res.status(201).json({ token });
    }
};

const getAll = async (_req, res) => {
    const allUsers = await userServices.getAll();
    return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const userById = await userServices.getById(id);
    return res.status(200).json(userById);
};

const deleteMe = async (req, res) => {
    const { email } = req.user;
    await userServices.deleteAll(email);
    return res.status(204).end();
};

module.exports = {
    newUser,
    getAll,
    getById,
    deleteMe,
};