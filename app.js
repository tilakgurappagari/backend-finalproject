const express = require('express');
const app = express();
 const db = require('./db');
const cors = require('cors');
app.use(cors());

const AuthController = require('./auth/AuthController');
app.use('/api/v1/auth', AuthController);

const ProductsController = require('./products/ProductsController');
app.use('/api/v1/products', ProductsController);

const OrdersController = require('./orders/OrdersController');
app.use('/api/v1/orders', OrdersController);


module.exports = app;