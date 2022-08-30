const postServices = require('../services/post');

const newPost = async (req, res) => {
    const { id } = req.user;
    const post = req.body;
    const result = await postServices.newPost(id, post);
    return res.status(201).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const postById = await postServices.getById(id);
    return res.status(200).json(postById);
};

const getAll = async (_req, res) => {
    const allPosts = await postServices.getAll();
    return res.status(200).json(allPosts);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = await postServices.updatePost(id, req.body);
    return res.status(200).json(post);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    await postServices.deletePost(userId, id);
    return res.status(204).json();
};

const search = async (req, res) => {
    const { q } = req.query;
    console.log('result', q);
    const result = await postServices.search(q);
    return res.status(200).json(result);
};

module.exports = {
    newPost,
    getById,
    getAll,
    updatePost,
    deletePost,
    search,
};