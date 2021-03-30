const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    if (!email.match(emailRegEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
// TODO: Login With Username
module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else if (!email.match(emailRegEx)) {
    errors.email = "Email must be vaild";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateContentInput = (title, body
  // , structerdBody
  ) => {
  const errors = {};

  if (title.trim() == "") {
    errors.title = "Title must not be empty";
  }
  if (body.trim() == "") {
    errors.body = "Body must not be empty";
  }
  // if (structerdBody == null || structerdBody.length == 0) {
  //   errors.structerdBody = "Body Must not be empty or length less than 5";
  // }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateSectorInput = (Secname)=> {
  const errors = {};
  if (Secname.trim() == "") {
    errors.Secname = "Sector name must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };

};
module.exports.validateCompanyInput=(Symbol,Market,Comname)=>{
  const errors = {};
  if (Symbol.trim() == "") {
    errors.Symbol = "Symbol name must not be empty";
  }
  if (Market.trim() == "") {
    errors.Market = "Market name must not be empty";
  }
  if (Comname.trim() == "") {
    errors.Comname = "Comname name must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };


}
module.exports.validateSymbols=({arr})=>{
  const errors = {};
  console.log(arr)
  for (let index = 0; index < arr.length; index++) {

    if (arr[index].trim() == "") {
      errors.Symbol = "Symbol name must not be empty";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
