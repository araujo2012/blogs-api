const express = require('express');
const userController = require('../controlers/user');
const {
    verifyDisplayName,
    verifyEmail,
    verifyPassword,
    emailExist,
    verifyId } = require('../middlewares/user');
const { verifyToken } = require('../middlewares/token');

const router = express.Router();

router.post('/',
    verifyDisplayName,
    verifyEmail,
    verifyPassword, emailExist, userController.newUser);

router.get('/:id', verifyToken, verifyId, userController.getById);
router.get('/', verifyToken, userController.getAll);
router.delete('/me', verifyToken, userController.deleteMe);

module.exports = router;