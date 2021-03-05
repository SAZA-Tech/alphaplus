import React, { Component, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import * as Yup from "yup";
import { FormInput, FormDevider } from "../components/FormInput";
// import { useForm } from "react-hook-form";
import { Button, OutlineButton } from "../components/Buttons";
//imagers
import GoogleIcon from "../assets/icons/1004px-Google__G__Logo.svg.png";
import TwitterIcon from "../assets/icons/580b57fcd9996e24bc43c53e.png";
//graphql
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

//auth
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export class Login extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="background">
        {/* <Navbar /> */}
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
        <a href="#">
          <p>create account</p>
        </a>
      </div>
    </div>
  );
}

export const LoginForm = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormInput
          id="email"
          name="email"
          type="email"
          placeHolder="email"
          value={values.email}
          errors={errors.email}
          onChange={onChange}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          placeHolder="password"
          value={values.password}
          errors={errors.password}
          onChange={onChange}
        />
        <span className="remember-forgetpass">
          <span className="rememberMe">
            <input type="checkbox" />
            <span>remember me?</span>
          </span>
          <a href="#">Forget Password</a>
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
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
