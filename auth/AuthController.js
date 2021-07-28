const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');
// For generating Token
const jwt = require('jsonwebtoken');
// For encrypting Password
const bcrypt = require('bcryptjs');
// For Secert Token
const config = require('../config');
// For User Schema
const User = require('./Users');
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

// Register User
router.post('/register', function(req, res) {
  let givenRole = null;
  // console.log("hello");


  // console.log(req.body);
  if(req.body.role===undefined)
    {
        givenRole = "user"
    }
    else{
      givenRole = req.body.role
    }
    // console.log(givenRole);

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    role: givenRole
  },
    function(err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      const string = encodeURIComponent('Success Fully Register Please Login');
      let responseData ={
        status : "success",
        message: "user created successfully"
      }
      res.send(responseData);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
     
      return res.send({message:'Error Occured',status:500});
    }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({
          auth: false,
          token: null
        });
      const token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({
        auth: true,
        message:"Login Successfull",
        token: token,
        user:user
       
      });
    });
});




// Info of logined User
router.get('/loginedUser', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });

    // res.status(200).send(decoded);
    User.findById(decoded.id, {
      password: 0
    }, function(err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
  });
});



module.exports = router;