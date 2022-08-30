const express = require('express');
const postController = require('../controlers/post');
const { verifyId,
    verifyTitle,
    verifyContent,
    verifyCategoryIds,
    verifyUpdateBody,
    verifyPost,
  } = require('../middlewares/post');
const { userValidation } = require('../middlewares/user');
const { verifyToken } = require('../middlewares/token');

const router = express.Router();

router.post('/', verifyToken,
  verifyTitle,
  verifyContent,
  verifyCategoryIds, postController.newPost);
router.get('/search', verifyToken, postController.search);
router.get('/:id', verifyToken, verifyId, postController.getById);
router.get('/', verifyToken, postController.getAll);
router.put('/:id', verifyToken, userValidation, verifyUpdateBody, postController.updatePost);
router.delete('/:id', verifyToken, verifyPost, userValidation, postController.deletePost);

module.exports = router;