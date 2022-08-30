const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (email, id) => {
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (req, token) => {
  jwt.verify(token, process.env.JWT_SECRET, (_error, user) => {
    req.user = user;
  });
};

module.exports = {
    createToken,
    verifyToken,
};