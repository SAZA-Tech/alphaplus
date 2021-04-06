import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Chip,
  Divider,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import {makeStyles } from "@material-ui/core/styles";
const img = "avatars/7.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },

  avatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginTop: theme.spacing(0.75),

    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginTop: theme.spacing(1.25),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      marginTop: theme.spacing(2.75),
    },
  },

  avatar2: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    [theme.breakpoints.between('sm', 'xl')]: {
      width: theme.spacing(5.75),
      height: theme.spacing(5.75),
    },
  },

  typography: {
    fontSize: "12px",
    marginBottom: theme.spacing(1),

    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "15.5px",
    },
    [theme.breakpoints.between('md', 'xl')]: {
      marginBottom: theme.spacing(2),
      fontSize: "20px",
      fontStyle: "normal",
      lineHeight: "32px",
    },
  },

  chip: {
    fontSize: "5px",
    height: theme.spacing(2),
    marginBottom: theme.spacing(0.3),

    [theme.breakpoints.between('md', 'xl')]: {
      fontSize: "10px",
      height: theme.spacing(3),
      marginBottom: theme.spacing(0.75),
      marginTop: theme.spacing(0.75),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      height: theme.spacing(3),
      fontSize: "13px",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(0.75)
    },
  },

  followBt: {
    fontSize: "14px",

    [theme.breakpoints.between('xs', 'sm')]: {
      height: theme.spacing(2.25),
      fontSize: "1px",
    },
  },

  FollowBtn2: {

    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: "3px",
      width: theme.spacing(1),
      height: theme.spacing(2),
      marginLeft: theme.spacing(-4),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "10px",
      width: theme.spacing(9),
      height: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  },

  typogrFollowerFollwing: {

    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1px'
    },
  },

}));

 {/* // UserInfo"theSmallCard"  */}
export function UserInfo(props) {
  const state = useState();
  const classes = useStyles();
  return (

    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs>
        <Avatar className={classes.avatar} alt={props.name} src={props.img} />
      </Grid>

      <Grid item xs >
        <Typography className={classes.typography} variant="h6" >
          {props.name}
        </Typography>
      </Grid>

      <Grid item xs >
        <Chip className={classes.chip} label={props.bio} color="primary" variant="outlined" />
      </Grid>

      {/* //User Follow Button */}
      <Grid item xs >
        <Button size='small' className={classes.followBt} variant="contained" color="primary" >
          Follow
            </Button>
      </Grid>
    </Grid>
  );
}

UserInfo.propTypes = {};


 {/* // FollowerFollowingForm  */}
export function FollowerFollowingForm(props) {
  const classes = useStyles();
  return (

    <Grid
      spacing={3}
      container
      direction="row"
      justify='flex-start'
      alignItems='center'
    >
      {/* // User Avatar  */}
      <Grid item  >
        <Avatar className={classes.avatar2} alt={props.name} src={props.avatar} />
      </Grid>

      {/* // User info  */}
      <Grid item xs='8' container alignItems='flex-start' justify='flex-start' direction="column" spacing={0}>
        <Typography className={classes.typogrFollowerFollwing} variant="subtitle1">
          {props.name}
        </Typography>
        <Typography className={classes.typogrFollowerFollwing} variant="subtitle2">
          {props.bio}
        </Typography>

        <Container>
          <Divider variant="middle" />
        </Container>
      </Grid>

      {/* //User Follow Button */}
      <Grid item  >
        <Button
          className={classes.FollowBtn2}
          variant="outlined"
          color="black"
        >
          Follow
              </Button>
      </Grid>
    </Grid>
    
  );
}


