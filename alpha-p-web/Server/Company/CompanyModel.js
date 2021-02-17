const { model, Schema } = require('mongoose');

const CompanySchema = new Schema({
  symbol: String,
  exchange:String,
  open: String,
  high: String,
  low: String,
  close:String
});

module.exports = model('Company', CompanySchema);