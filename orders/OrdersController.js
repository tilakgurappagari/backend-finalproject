const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');


// For User Schema
const Orders = require('../orders/Orders');



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
router.post('/addOrder', function(req, res) {
  
    const currentDate = new Date();
    req.body.orderedOn = currentDate;
    console.log(req.body);

    Orders.create({...req.body},
      function(err, orders) {
        if (err) return res.status(500).send("There was a problem in adding the product.")
        // create a token
        const responseData = {
            status: "success",
            message: "Order added successfully"
        }
            res.send(responseData);
      });
  });

  // Getting orders List 
router.get('/ordersList', function (req, res) {
    Orders.find({}, function (err, orders) {
        if (err){
            let responseData ={
                status: 'failure',
                message: 'Cannot fetch orders'
            }
             return res.status(500).send(responseData);
            }
       console.log(orders);
        res.send(orders);

    });
});




module.exports = router;