const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  role: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');