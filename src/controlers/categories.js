const categoriesServices = require('../services/categories');

const newCategory = async (req, res) => {
    const { name } = req.body;
    const result = await categoriesServices.newCategory(name);
    return res.status(201).json({ id: result.id, name });
};

const getAll = async (_req, res) => {
    const result = await categoriesServices.getAll();
    return res.status(200).json(result);
};

module.exports = {
    newCategory,
    getAll,
};