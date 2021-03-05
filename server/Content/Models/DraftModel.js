const { model, Schema } = require("mongoose");
const User = require("../../Auth/UserModel");



const DraftSchema = new Schema({
  draftName: String,
  draftBody: String,
  draftAuthorId: String,
  createdAt: String,
  updatedAt: String,
});
module.exports = model("Draft", DraftSchema);
