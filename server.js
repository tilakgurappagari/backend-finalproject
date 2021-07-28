const app = require('./app');
// const express = require('express');
const port = process.env.PORT || 8081;
const bodyParser =  require('body-parser');
const session = require('express-session');
const cors = require('cors');
app.use(cors());


app.use(session({secret: 'edurekaSecert', saveUninitialized:true, resave:true}));


let sess;

app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
    console.log(">>>>",sess.email);
   
})

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});