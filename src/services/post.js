const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');

const { Op } = Sequelize;

const newPost = async (id, post) => {
    const { title, content, categoryIds } = post;
    const { dataValues } = await BlogPost.create({ title, content, userId: id });
    await Promise.all(categoryIds.map((categoryId) => PostCategory
        .create({ postId: dataValues.id, categoryId })));
    return dataValues;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
    }],
  });
  return post;
};

const getAll = async () => {
  const post = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      }],
  });
  return post;
};

const updatePost = async (id, post) => {
  await BlogPost.update(post,
    { where: { id },
  });
  const postUpdated = await getById(id);
  return postUpdated;
};

const deletePost = async (userId, id) => {
    await BlogPost.destroy({ where: { id, userId } });
};

const findPost = async (userId, id) => {
  const post = await BlogPost.findOne({ where: { id, userId } });
  return post;
};

const search = async (query) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: query } },
        { content: { [Op.substring]: query } },
      ],
    },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
    }],
  });
  return result;
};

module.exports = {
    newPost,
    getById,
    getAll,
    updatePost,
    deletePost,
    search,
    findPost,
};