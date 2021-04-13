const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  createdAt: String,
  type: String,
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  portfolios: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
});

module.exports = model("User", userSchema);
