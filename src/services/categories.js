const { Category } = require('../database/models');

const newCategory = async (name) => {
    await Category.create({ name });
    const category = await Category.findOne({ where: { name } });
    return { id: category.id };
};

const getAll = async () => {
    const allCategories = await Category.findAll({
        attributes: ['id', 'name'],
      });
    return allCategories;
};

const getById = async (categoryIds) => {
    const id = await Category.findAll({
        where: { id: categoryIds },
    });
    return id;
};

module.exports = {
    newCategory,
    getAll,
    getById,
};