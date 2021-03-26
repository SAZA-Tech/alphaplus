const { model, Schema, SchemaType } = require("mongoose");
const User = require("../../Auth/UserModel");

const DraftSchema = new Schema({
  draftName: String,
  draftBody: String,
  draftAuthorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: String,
  updatedAt: String,
});
module.exports = model("Draft", DraftSchema);
