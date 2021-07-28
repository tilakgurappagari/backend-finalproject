const mongoose = require('mongoose');  
const ordersSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
   email: String,
   address: String,
   city: String,
   state: String,
   zip: String,
  productId: String,
  productName: String,
  price: Number,
  orderedOn: Date

  
});
mongoose.model('Orders', ordersSchema);

module.exports = mongoose.model('Orders');