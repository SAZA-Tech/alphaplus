//Login
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const { validateRegisterInput, validateLoginInput } = require("./validators");

const { SECRET_KEY } = require("../config");
const User = require("./UserModel");
const checkAuth = require("./check-auth");

//Generate Auth Token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports.login = async (_, { email, password }) => {
  const { errors, valid } = validateLoginInput(email, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ email });

  if (!user) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong crendetials";
    throw new UserInputError("Wrong crendetials", { errors });
  }

  const token = generateToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

//SignUp
module.exports.register = async (
  _,
  { registerInput: { name, username, email, password, confirmPassword } }
) => {
  // Validate user data
  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }
  // TODO: Make sure user doesnt already exist
  const user = await User.findOne({ username });
  if (user) {
    throw new UserInputError("Username is taken", {
      errors: {
        username: "This username is taken",
      },
    });
  }
  // Email Already Exist ?
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw new UserInputError("Email Is Already Used", {
      errors: {
        email: "Email Already Used",
      },
    });
  }
  // hash password and create an auth token
  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
    type: "endUser",
  });

  const res = await newUser.save();

  const token = generateToken(res);

  return {
    ...res._doc,
    id: res._id,
    token,
  };
};
//TODO: Manage User Accounts (CRUD)
// Create Account

// Read Account
// Find User
module.exports.findUser = async (_, { id }) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return user;
    } else {
      throw new Error("User Not Found");
    }
  } catch (err) {
    throw new Error(err);
  }
};
//List Of Users
module.exports.getUsers = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
// Update Account
module.exports.updateUserInfo = async (_, { id, name, type }, context) => {
  const auth = checkAuth(context);
  const updatedUser = User.findById(id);
  const update = {};
  if (updatedUser) {
    // Update User Display Name
    if (!name.trim() == "") {
      update.name = name;
    } else { 
      throw new Error("Name Must Not be empty");
    }
    // Updating the User Type
    // if (auth.username == "admin") {
      if (!type.trim() == " ") {
        update.type = type;
      }

    // } else {
    //   throw new Error("Only Aut Can Change Type");
    // }
    return User.findByIdAndUpdate(id,update);
    // return updatedUser;
  } else {
    throw new Error("User Not Found");
  }
};
// User Type Update
// Password Update
// User Name
// Delete Account
module.exports.deleteUser = async (_, { id }, context) => {
  const auth = checkAuth(context);
  try {
    // if (auth.username == "admin") {
      return User.findByIdAndDelete(id)
        .then(() => "User Delete Success")
        .catch((err) => {
          throw new Error(`Failed To delete user ${err}`);
        });
    // } else {
    //   throw new Error("Not Authrized");
    // }
  } catch (error) {
    throw new Error(error);
  }
};
