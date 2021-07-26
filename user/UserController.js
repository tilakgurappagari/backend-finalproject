const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('./User');
const Products = require('./Products.js');




// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// see users
// router.get('/usersList', function (req, res) {
//     User.find({}, function (err, users) {
//         if (err) return res.status(500).send("There was a problem finding the users.");
//         // res.status(200).send(users);
//         res.render('usersList.ejs', {users})

//     });
// });

// Getting products List for Admin
router.get('/productsList', function (req, res) {
    Products.find({}, function (err, products) {
        if (err){
             return res.status(500).send("There was a problem finding the users.");
            }
        // res.status(200).send(users);
        
        // res.render('productsList.ejs', {products})
        res.send(products);

    });
});




// GETS A SINGLE USER FROM THE DATABASE
    // router.get('/profile', function (req, res) {
    //     var token = localStorage.getItem('authtoken')
    //     console.log("token>>>",token)
    //     if (!token) {
    //         res.redirect('/')
    //     }
    //     jwt.verify(token, config.secret, function(err, decoded) {
    //     if (err) {
    //         res.redirect('/')
    //     };
    //         User.findById(decoded.id, { password: 0 }, function (err, user) {
    //             if (err) {res.redirect('/')}
    //             if (!user) {res.redirect('/')}
    //             if(user.role==="admin"){res.render('admin-profile.ejs',{user})}
    //             else{
    //                 Products.find({}, function (err, products) {
    //                     if (err){
    //                          return res.status(500).send("There was a problem finding the users.");
    //                         }
    //                     // res.status(200).send(users);
                     

    //                     res.render('profile.ejs', {user,products})
                
    //                 });

    //                 // res.render('profile.ejs',{user});
    //         }
    //         });
    //     });
    // });



router.get('/register',  (req, res) => {
    //res.render('signup.ejs')
 });

 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;