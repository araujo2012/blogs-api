const postService = require('../services/post');
const categoryService = require('../services/categories');

const fieldmissing = 'Some required fields are missing';

const verifyId = async (req, res, next) => {
    const { id } = req.params;
    const exist = await postService.getById(id);
    if (!exist) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    next();
};

const verifyTitle = (req, res, next) => {
    const { title } = req.body;
    if ((title === undefined) || (title.length === 0)) {
        return res.status(400).json({ message: fieldmissing });
    }
    next();
};

const verifyContent = (req, res, next) => {
    const { content } = req.body;
    if ((content === undefined) || (content.length === 0)) {
        return res.status(400).json({ message: fieldmissing });
    }
    next();
};

const verifyCategoryIds = async (req, res, next) => {
    const { categoryIds } = req.body;
    if ((categoryIds === undefined) || (categoryIds.length === 0)) {
        return res.status(400).json({ message: fieldmissing });
    }
    const category = await categoryService.getById(categoryIds);
    if (category.length === 0) {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};

const verifyUpdateBody = async (req, res, next) => {
    const { title, content } = req.body;
    if ((title === undefined) || (content === undefined)) {
        return res.status(400).json({ message: fieldmissing });
    }
    if ((title.length === 0) || (content.length === 0)) {
        return res.status(400).json({ message: fieldmissing });
    }
    next();
};

const verifyPost = async (req, res, next) => {
    const { id } = req.params;
    const post = await postService.getById(id);
    if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    next();
};

module.exports = {
    verifyId,
    verifyTitle,
    verifyContent,
    verifyCategoryIds,
    verifyUpdateBody,
    verifyPost,
};