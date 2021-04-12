const { model, Schema } = require("mongoose");

const portfolioSchema = new Schema({
  name: String,
  follwedTags: [String],
});
module.exports = model("Portfolio", portfolioSchema);
