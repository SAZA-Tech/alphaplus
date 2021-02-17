const { model, Schema } = require('mongoose');

const CompanySchema = new Schema({
  symbol: String,
  exchange:String,
  open: Number,
  high: Number,
  low: Number,
  close:Number
});

module.exports = model('Company', CompanySchema);