const {
  login,
  adminLogin,
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
    adminLogin,
    register,
    updateUserInfo,
    deleteUser,
  },
};
