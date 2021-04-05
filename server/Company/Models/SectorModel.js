const { model, Schema } = require('mongoose');

const sectorSchema = new Schema({
  Secname: String,
  sectorCompanies:[{
    type:Schema.Types.ObjectId,
    ref:"Company"
  }],
});

module.exports = model('Sector', sectorSchema);