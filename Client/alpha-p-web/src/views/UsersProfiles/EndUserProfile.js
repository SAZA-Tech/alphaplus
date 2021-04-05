import React from "react";
import {
  UserInfo, UserProfileDetails
} from "../../components/UserInfo";
import {
  Container,
  Grid,
  Paper,Dialog,
  Typography,
  Divider,
  ButtonBase,
  Button,
  Avatar,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: 0,
  },


  paper1: {
    width: theme.spacing(10),
    height: theme.spacing(14),
    padding:theme.spacing(1),

    


    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing(13.5),
      height: theme.spacing(21.5),
      padding:theme.spacing(0.5)


    },

    [theme.breakpoints.between('md', 'xl')]: {
      
      width: theme.spacing(17),
      height: theme.spacing(29),
      
      padding:theme.spacing(1.5)


    },

    

  },

  paper2: {

    width: theme.spacing(46.25),



    padding: theme.spacing(0.25),

     [theme.breakpoints.between('sm', 'md')]: {
       width: theme.spacing(72),



     },




    [theme.breakpoints.between('md', 'xl')]: {
      padding: theme.spacing(1),
      width: theme.spacing(105),




    },


  },

  container3: {

    marginTop: theme.spacing(10),

  }




}));



const img = "avatars/7.jpg";
const userInfo = {
  name: "Jhon Doe",
  img: img,
  bio: "Analyst",
};



const EndUserProfile = (props) => {
  const classes = useStyles();

  return (
    <div className="background">
       
     
        <Grid

          container
          direction="row"
          justify='flex-start'
          alignItems='flex-start'
          spacing={1}
        >
          <Grid item   >
            <Paper
              className={classes.paper1}
              elevation={2}
              square={true}>

              <UserInfo
                img={userInfo.img}
                name={userInfo.name}
                bio={userInfo.bio}
              />
              
            </Paper>

          </Grid>

          <Grid item  >


            <Paper
              className={classes.paper2}
              elevation={2}
              square={true}>
              <UserProfileDetails />

            </Paper>


          </Grid>
        </Grid>
     
    </div>


  );
};

EndUserProfile.propTypes = {};

export default EndUserProfile;