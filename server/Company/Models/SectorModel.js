const { model, Schema } = require('mongoose');

const sectorSchema = new Schema({
  secName: String,
  sectorCompanies:[{
    type:Schema.Types.ObjectId,
    ref:"Company"
  }],
});

module.exports = model('Sector', sectorSchema);