const mongoose = require('mongoose');  
const productsSchema = new mongoose.Schema({  
   id: Number,
  name: String,
  price: Number,
  
});
mongoose.model('Products', productsSchema);

module.exports = mongoose.model('Products');