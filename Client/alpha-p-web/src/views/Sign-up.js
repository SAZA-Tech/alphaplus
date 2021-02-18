import React, { Component } from "react";
import Navbar from "../components/Navbar";
import * as Yup from "yup";
import { FormInput, FormDevider } from "../components/FormInput";
import { useForm } from "react-hook-form";
import { Button, OutlineButton } from "../components/Buttons";
import GoogleIcon from "../assets/icons/1004px-Google__G__Logo.svg.png";
import TwitterIcon from "../assets/icons/580b57fcd9996e24bc43c53e.png";
import { useParams } from "react-router-dom";

export class SignUp extends Component {
    static propTypes = {};
  
    render() {
      return (
        <div className="background">
          <Navbar />
          <SignUpBlock />
        </div>
      );
    }
}
    export default SignUp;

    function SignUpBlock() {
        return (
          <div className="signUpBlock">
            <h2> Create Free Account </h2>
            
            {/* <p> Already have an account?
            <a href="#"> sign in </a> </p> */}
            
            
            <div className="haveAccount">
                <p> Already have an account? 
              <a href="#"> sign in </a> </p>

              <SignUpForm />
            </div>
          </div>
        );
      }

      export const SignUpForm = () => {
        //form validation
        const { register, handleSubmit, errors } = useForm({
          mode: "onSubmit",
          validationSchema: Yup.object({
            FirstName: Yup.string().min(6,"Please Enter A valid first name") .required("Required"),
            LastName: Yup.string().min(4,"Please Enter A valid last name").required("Required"),
            email: Yup.string().email("Please Enter A Valid Email").required("Required"),
            password: Yup.string().min(6, "Password should be longer than 6 characters").required("Required"),
            verifypassword: Yup.string().min(6, "Password should be longer than 6 characters").oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required"),
            
          }),
        });
      
        //here we do the request once the validation is success 👍🏾
        const onSubmit = ({ FirstName,LastName,email, password, verifypassword }) => {
          alert(`FirstName: ${FirstName},LastName:${LastName}, Email: ${email}, password: ${password}, verifypassword: ${verifypassword}`);
        };
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="FirstName"
              name="FirstName"
              type="FirstName"
              placeHolder="First Name"
              register={register}
              errors={errors.FirstName}
            />
            <FormInput
              id="LastName"
              name="LastName"
              type="LastName"
              placeHolder="Last Name"
              register={register}
              errors={errors.LastName}
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              placeHolder="Email"
              register={register}
              errors={errors.email}
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              placeHolder="Password"
              register={register}
              errors={errors.password}
            />
            <FormInput
              id="Verifypassword"
              name="Verifypassword"
              type="password"
              placeHolder="Verify password"
              register={register}
              errors={errors.verifypassword}
            />
            <Button
              
              type="submit"
              title="Create Account"
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
      
      