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
app.use(express.static(__dirname + '/public'));


router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

//add-product
router.post('/addProduct', function(req, res) {
  
    const currentDate = new Date();
    console.log(req.body);

 // productId: req.body.productId,
      // productName: req.body.productName,
      // category: req.body.category,
      // price: req.body.price,
      // discountedPrice: req.body.discountedPrice,
      // productImage: req.body.productImage,
      // productDescription : req.body.productDescription,
      // isTopProduct: req.body.topSellingProduct,
      // createdOn: currentDate
      

    Products.create({...req.body},
      function(err, products) {
        if (err) return res.status(500).send("There was a problem in adding the product.")
        // create a token
        const responseData = {
            status: "success",
            message: "Product added successfully"
        }
        // res.redirect('/users/productsList/?msg=' + string);
            res.send(responseData);
      });
  });

  // Getting products List for Admin
router.get('/productsList', function (req, res) {
    Products.find({}, function (err, products) {
        if (err){
             return res.status(500).send("There was a problem finding the products.");
            }
       console.log(products);
        res.send(products);

    });
});




module.exports = router;