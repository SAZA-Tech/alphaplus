const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  username:String,
  password: String,
  email: String,
  createdAt: String,
  type:String
});

module.exports = model('User', userSchema);