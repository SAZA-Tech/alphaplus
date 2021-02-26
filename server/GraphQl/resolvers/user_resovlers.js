const {
  login,
  register,
  findUser,
  getUsers,
  updateUserInfo,
  deleteUser,
} = require("../../Auth/AuthControl");

module.exports = {
  Query: { findUser, getUsers },
  Mutation: {
    login,
    register,
    updateUserInfo,
    deleteUser,
  },
};
