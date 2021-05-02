import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import Typography from "@material-ui/core/Typography";

import {
  Grid,
  Link,
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  errorIcon: {
   height: 250,
   width: 250, 
   marginTop: 50,
   color: '#A0A0A0',

    [theme.breakpoints.between("xs", "sm")]: {
      height: 180,
      width: 180,
      marginTop:50,
      color: '#A0A0A0',
    },
  },

  text1: {
   fontSize: 40,
     [theme.breakpoints.between("xs", "sm")]: {
      fontSize: 30,
     },
   },

   text2: {
    fontSize: 26,
    fontWeight: theme.typography.fontWeightLight,
      [theme.breakpoints.between("xs", "sm")]: {
       fontSize: 21,
       fontWeight: theme.typography.fontWeightLight,

      },
    },
    text3: {
      fontSize: 22,
      fontWeight: theme.typography.fontWeightLight,
      [theme.breakpoints.between("xs", "sm")]: {
         fontSize: 18,
         fontWeight: theme.typography.fontWeightLight,
        },
      },
}));
export function Error(props) {
  const classes = useStyles();
  return(
    <div >
      
      <Grid container direction="column" justify="flex-start" alignItems="center">
        <ErrorOutlineRoundedIcon className={classes.errorIcon}/>
          <Grid >
            <Typography align="center" className={classes.text1}>
            Page Not Found
            </Typography>
            <Typography align="center" className={classes.text2}>
            We're sorry, we couldn't find the page you requested.
            </Typography>
            <Typography align="center" className={classes.text3 }>
            Browse our content <Link color="Forward" component={RouterLink} to="/">
            Home Page.
            </Link>
            </Typography> 
            <Typography align="center" className={classes.text3}>
             If you feel something is missing that should be here,       
             <Link color="Forward" href="mailto: Abdulmohsen.pro@gmail.com">
              Contact Us.
              </Link>
              </Typography>
              </Grid>
      </Grid>
    </div>
  );

}

export default Error;

