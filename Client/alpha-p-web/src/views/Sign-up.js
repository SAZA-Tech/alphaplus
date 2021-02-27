import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Alpha+
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Free Account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="verifypassword"
                label="Verify Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


// import React, { Component } from "react";
// import Navbar from "../components/Navbar";
// import * as Yup from "yup";
// import { FormInput, FormDevider } from "../components/FormInput";
// import { useForm } from "react-hook-form";
// import { Button, OutlineButton } from "../components/Buttons";
// import GoogleIcon from "../assets/icons/1004px-Google__G__Logo.svg.png";
// import TwitterIcon from "../assets/icons/580b57fcd9996e24bc43c53e.png";
// import { useParams } from "react-router-dom";

// export class SignUp extends Component {
//     static propTypes = {};
  
//     render() {
//       return (
//         <div className="background">
//           <Navbar />
//           <SignUpBlock />
//         </div>
//       );
//     }
// }
//     export default SignUp;

//     function SignUpBlock() {
//         return (
//           <div className="signUpBlock">
//             <h2> Create Free Account </h2>
            
//             {/* <p> Already have an account?
//             <a href="#"> sign in </a> </p> */}
            
            
//             <div className="haveAccount">
//                 <p> Already have an account? 
//               <a href="#"> sign in </a> </p>

//               <SignUpForm />
//             </div>
//           </div>
//         );
//       }

//       export const SignUpForm = () => {
//         //form validation
//         const { register, handleSubmit, errors } = useForm({
//           mode: "onSubmit",
//           validationSchema: Yup.object({
//             FirstName: Yup.string().min(6,"Please Enter A valid first name") .required("Required"),
//             LastName: Yup.string().min(4,"Please Enter A valid last name").required("Required"),
//             email: Yup.string().email("Please Enter A Valid Email").required("Required"),
//             password: Yup.string().min(6, "Password should be longer than 6 characters").required("Required"),
//             verifypassword: Yup.string().min(6, "Password should be longer than 6 characters").oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required"),
            
//           }),
//         });
      
//         //here we do the request once the validation is success 👍🏾
//         const onSubmit = ({ FirstName,LastName,email, password, verifypassword }) => {
//           alert(`FirstName: ${FirstName},LastName:${LastName}, Email: ${email}, password: ${password}, verifypassword: ${verifypassword}`);
//         };
//         return (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <FormInput
//               id="FirstName"
//               name="FirstName"
//               type="FirstName"
//               placeHolder="First Name"
//               register={register}
//               errors={errors.FirstName}
//             />
//             <FormInput
//               id="LastName"
//               name="LastName"
//               type="LastName"
//               placeHolder="Last Name"
//               register={register}
//               errors={errors.LastName}
//             />
//             <FormInput
//               id="email"
//               name="email"
//               type="email"
//               placeHolder="Email"
//               register={register}
//               errors={errors.email}
//             />
//             <FormInput
//               id="password"
//               name="password"
//               type="password"
//               placeHolder="Password"
//               register={register}
//               errors={errors.password}
//             />
//             <FormInput
//               id="Verifypassword"
//               name="Verifypassword"
//               type="password"
//               placeHolder="Verify password"
//               register={register}
//               errors={errors.verifypassword}
//             />
//             <Button
              
//               type="submit"
//               title="Create Account"
//               onClick={() => console.log("Pressed")}
//             />
            
//             <FormDevider />

//             <OutlineButton
//               color={"#4285f4"}
//               image={GoogleIcon}
//               onClick={() => console.log("Google SignIn")}
//               title="Continue With Google"
//             />
//             <OutlineButton
//               color={"#00A2F5"}
//               image={TwitterIcon}
//               onClick={() => console.log("Twitter SignIn")}
//               title="Continue With Twitter"
//             />
//           </form>
//         );
//       };
      

      