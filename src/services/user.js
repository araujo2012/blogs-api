const { User } = require('../database/models');

const userExists = async (email, password) => {
    const userExist = await User
        .findOne({ where: { email, password }, attributes: { exclude: ['password'] } });
    return userExist;
};

const newUser = async (user) => {
    const { displayName, email, password, image } = user;
    const createdUser = await User.create({
        displayName, email, password, image,
    });
    return createdUser;
};

const emailExist = async (email) => {
    const emailExists = await User
        .findOne({ where: { email }, attributes: { exclude: ['password'] } });
    return emailExists;
};

const idExist = async (id) => {
    const idExists = await User
        .findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return idExists;
};

const getAll = async () => {
    const allUsers = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
      });
    return allUsers;
};

const getById = async (id) => {
    const userById = await User
        .findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return userById;
};

const deleteAll = async (email) => {
    await User.destroy(
        { where: { email } },
    );
};

module.exports = {
    userExists,
    newUser,
    emailExist,
    getAll,
    getById,
    idExist,
    deleteAll,
};