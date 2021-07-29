const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');
// For generating Token
const jwt = require('jsonwebtoken');
// For Secert Token
const config = require('../config');
// For User Schema
const User = require('../products/Products');



const Products = require('../products/Products')
const session = require('express-session');
const cors = require('cors');
app.use(cors());

router.use(session({
  secret: 'edurekaSecert1',
  resave: false,
  saveUninitialized: true
}));


router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

//add-product
router.post('/addProduct', function(req, res) {

  
    const currentDate = new Date();
     console.log(req.body);
    req.body.createdOn = currentDate;
    Products.create({...req.body},
      function(err, products) {
        if (err) {
          let responseData = {
            status: "failure",
            message: "Cannot add the product"
        }
          
          return res.status(500).send(responseData)
        }
        // create a token
        let responseData = {
            status: "success",
            message: "Product added successfully"
        }
            res.send(responseData);
      });
  });

  // Getting products List for Admin
router.get('/productsList', function (req, res) {
    Products.find({}, function (err, products) {
        if (err){
          let responseData = {
            status: "failure",
            message: "Cannot get the products"
        }
          
          return res.status(500).send(responseData) 
                 }
      //  console.log(products);
        res.send(products);

    });
});




module.exports = router;