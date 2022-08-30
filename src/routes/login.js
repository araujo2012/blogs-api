const express = require('express');
// const loginController = require('../controlers/login');
const { verifyLoginBody, userExists } = require('../middlewares/login');

const router = express.Router();

router.post('/', verifyLoginBody, userExists);

module.exports = router;