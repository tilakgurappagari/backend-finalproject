const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
app.use(cors());


const UserController = require('./user/UserController');
app.use('/api/v1/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/api/v1/auth', AuthController);

const ProductsController = require('./products/ProductsController');
app.use('/api/v1/products', ProductsController);

module.exports = app;