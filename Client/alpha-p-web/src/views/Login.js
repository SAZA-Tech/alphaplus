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
        Alpha+ best website ever!
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  GTsubmit: {
    margin: theme.spacing(3, 0, 0),
  },
}));
export default function SignIn() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.GTsubmit}
          >
            Continue with google
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.GTsubmit}
          >
            Continue with twitter
          </Button>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


// import React, { Component, useContext, useState } from "react";
// import Navbar from "../components/Navbar";
// import * as Yup from "yup";
// import { FormInput, FormDevider } from "../components/FormInput";
// // import { useForm } from "react-hook-form";
// import { Button, OutlineButton } from "../components/Buttons";
// //imagers
// import GoogleIcon from "../assets/icons/1004px-Google__G__Logo.svg.png";
// import TwitterIcon from "../assets/icons/580b57fcd9996e24bc43c53e.png";
// //graphql
// import { useMutation } from "@apollo/client";
// import gql from "graphql-tag";

// //auth
// import { AuthContext } from "../context/auth";
// import { useForm } from "../util/hooks";



// const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;
// export class Login extends Component {
//   static propTypes = {};

//   render() {
//     return (
//       <div className="background">
//         {/* <Navbar /> */}
//         <SignInBlock />
//       </div>
//     );
//   }
// }

// export default Login;

// function SignInBlock() {
//   return (
//     <div className="signInBlock">
//       <h2>Member Sign In</h2>
//       <LoginForm />
//       <div className="createAccount">
//         <p>Don't have account?</p>
//         <a href="#">
//           <p>create account</p>
//         </a>
//       </div>
//     </div>
//   );
// }

// export const LoginForm = (props) => {
//   const context = useContext(AuthContext);
//   const [errors, setErrors] = useState({});

//   const { onChange, onSubmit, values } = useForm(loginUserCallback, {
//     username: "",
//     password: "",
//   });

//   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
//     update(_, { data: { login: userData } }) {
//       context.login(userData);
//       props.history.push("/");
//     },
//     onError(err) {
//       setErrors(err.graphQLErrors[0].extensions.exception.errors);
//     },
//     variables: values,
//   });

//   function loginUserCallback() {
//     loginUser();
//   }
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <FormInput
//           id="email"
//           name="email"
//           type="email"
//           placeHolder="email"
//           value={values.email}
//           errors={errors.email}
//           onChange = {onChange}
//         />
//         <FormInput
//           id="password"
//           name="password"
//           type="password"
//           placeHolder="password"
//           value={values.password}
//           errors={errors.password}
//           onChange = {onChange}
//         />
//         <span className="remember-forgetpass">
//           <span className="rememberMe">
//             <input type="checkbox" />
//             <span>remember me?</span>
//           </span>
//           <a href="#">Forget Password</a>
//         </span>
//         <Button
//           type="submit"
//           title="Login"
//           onClick={() => console.log("Pressed")}
//         />
//         <FormDevider />

//         <OutlineButton
//           color={"#4285f4"}
//           image={GoogleIcon}
//           onClick={() => console.log("Google SignIn")}
//           title="Continue With Google"
//         />
//         <OutlineButton
//           color={"#00A2F5"}
//           image={TwitterIcon}
//           onClick={() => console.log("Twitter SignIn")}
//           title="Continue With Twitter"
//         />
//       </form>
//       {Object.keys(errors).length > 0 && (
//         <div className="ui error message">
//           <ul className="list">
//             {Object.values(errors).map((value) => (
//               <li key={value}>{value}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
