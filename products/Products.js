const mongoose = require('mongoose');  
const productsSchema = new mongoose.Schema({  
  productId: String,
  productName: String,
  category: String,
  price: Number,
  discountedPrice: String,
  productImage: String,
  productDescription: String,
  isTopProduct: Boolean,
  createdOn: Date

  
});
mongoose.model('Products', productsSchema);

module.exports = mongoose.model('Products');