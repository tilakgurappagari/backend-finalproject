const app = require('./app');
const express = require('express');
const port = process.env.PORT || 8081;
const bodyParser =  require('body-parser');
const session = require('express-session');
const cors = require('cors');

app.use(express.static(__dirname+'/public'));

app.use(session({secret: 'edurekaSecert', saveUninitialized:true, resave:true}));

// app.set('view engine', 'ejs');
// app.set('views', './views');
// configuring cors middleware  packages
app.use(cors());
let sess;

app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
    console.log(">>>>",sess.email);
    // res.render('index',{error: req.query.valid?req.query.valid:'',
    //                     msg: req.query.msg?req.query.msg:''})
})



// app.get('/signup',(req,res) => {
//   res.render('signup')
// })

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});