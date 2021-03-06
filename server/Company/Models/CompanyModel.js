const { model, Schema } = require("mongoose");

const CompanySchema = new Schema({
  // articleId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Article",
  // },

  sectorId: {
    type: Schema.Types.ObjectId,
    ref: "Sector",
  },
  market: String,
  comname: String,
  symbol: String,
  Industry: String,
  phoneNum: String,
  website: String,
  address: String,
  intro: String,
  
  financialData: {
    type: Map,
    of: {
      exchange: String,
      Open: Number,
      high: Number,
      low: Number,
      close: Number,
      volume: Number,
      date:String,
    },
  },
});

module.exports = model("Company", CompanySchema);
