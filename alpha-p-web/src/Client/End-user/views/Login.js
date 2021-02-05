import React, { Component } from "react";
// import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import * as Yup from "yup";
import { FormInput, FormDevider } from "../components/FormInput";
import { useForm } from "react-hook-form";
import { Button, OutlineButton } from "../components/Buttons";
//imagers
import GoogleIcon from "../assets/icons/1004px-Google__G__Logo.svg.png";
import TwitterIcon from "../assets/icons/580b57fcd9996e24bc43c53e.png";
export class Login extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="background">
        <Navbar />
        <SignInBlock />
      </div>
    );
  }
}

export default Login;

function SignInBlock() {
  return (
    <div className="signInBlock">
      <h2>Member Sign In</h2>
      <LoginForm />
      <div className="createAccount">
          <p>Don't have account?</p>
        <a href="#"><p>create account</p></a>
      </div>
    </div>
  );
}

export const LoginForm = () => {
  //form validation
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please Enter A Valid Email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required("Required"),
    }),
  });

  //here we do the request once the validation is success 👍🏾
  const onSubmit = ({ email, password }) => {
    alert(`Login: ${email}, password: ${password}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="email"
        name="email"
        type="email"
        placeHolder="email"
        register={register}
        errors={errors.email}
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        placeHolder="password"
        register={register}
        errors={errors.password}
      />
      <span className="remember-forgetpass">
        <span className="rememberMe">
          <input type="checkbox" />
          <span>remember me?</span>
        </span>
        <a href='#'>Forget Password</a>
      </span>
      <Button
        type="submit"
        title="Login"
        onClick={() => console.log("Pressed")}
      />
      <FormDevider />

      <OutlineButton
        color={"#4285f4"}
        image={GoogleIcon}
        onClick={() => console.log("Google SignIn")}
        title="Continue With Google"
      />
      <OutlineButton
        color={"#00A2F5"}
        image={TwitterIcon}
        onClick={() => console.log("Twitter SignIn")}
        title="Continue With Twitter"
      />
    </form>
  );
};
