const checkAuth = require("./check-auth");
const { ADMIN_ID } = require("../config");

// returns true if user is authrized , if he is admin or the owner of the action
module.exports.isAuthrized = async (_, { id }, context) => {
  const auth = checkAuth(context);
  if (auth.id == id) return true;
  else if (auth.id == ADMIN_ID) return true;
  else return false;
};
