const express = require('express');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const categoriesRouter = require('./routes/categories');
const postRoutes = require('./routes/post');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRoutes);

module.exports = app;
