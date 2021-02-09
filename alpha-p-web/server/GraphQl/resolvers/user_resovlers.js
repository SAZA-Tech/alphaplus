const {login,register} = require("../../Auth/AuthControl");

module.exports = {
  Mutation: {
    login,
    register,
  },
};
