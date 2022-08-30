const express = require('express');
const categoriesController = require('../controlers/categories');
const { verifyName } = require('../middlewares/categories');
const { verifyToken } = require('../middlewares/token');

const router = express.Router();

router.post('/', verifyToken, verifyName, categoriesController.newCategory);
router.get('/', verifyToken, categoriesController.getAll);

module.exports = router;