import React, { useState } from "react";
import PropTypes from "prop-types";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
  Avatar,
  Grid,
  Tabs,
  Chip, 
  Divider,
  Typography,
  Button,
  IconButton,
  Container,
  Tab,

} from "@material-ui/core";
import { hexToRgb, makeStyles, rgbToHex } from "@material-ui/core/styles";
const img = "avatars/7.jpg";
const FollowersDocs = [
  {
    name: "Alex",
    avatar: img,
    bio: "Contributor long only, Growth, registered investment advisor, investment advisor",
  },
  {
    name: "Ziad",
    avatar: img,
    bio: "Contributor long only, Growth, registered investment advisor, investment advisor",
  },
  {
    name: "Mohammed",
    avatar: img,
    bio: "Contributor long only, Growth, registered investment advisor, investment advisor",
  },

];

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

  container2: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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

  typogrAboutMe: {
    width: "auto",
    height: "auto",
    marginTop: theme.spacing(0.8),
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    marginLeft: theme.spacing(2),
    textAlign: "left",

    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "25px",
      marginTop: theme.spacing(1.25),
    },

    [theme.breakpoints.between('md', 'xl')]: {
      marginTop: theme.spacing(2.75),
      marginBottom: theme.spacing(0.5),
      fontSize: "34px",
    },
  },

  typogrText: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(0.75),
    marginTop: theme.spacing(1),
    width: "250px",
    height: "auto",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "left",

    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: "18.5px",
      width: "auto"
    },

    [theme.breakpoints.between('md', 'xl')]: {
      width: "auto",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      fontSize: "24px",
    },
  },


  iconstyle: {
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 'small',
    },

    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 'medium',
    },
  },

  tab1: {
    fontSize: '1px',

    [theme.breakpoints.between('md', 'xl')]: {
      fontSize: "14px",
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
  }

}));


// export function UserInfo(props) {
//   const state = useState();
//   const classes = useStyles();
//   return (
//     <Container className={classes.root} maxWidth="xs">
//       <Grid
//         spacing={4}
//         container
//         direction="row"
//         justify="flex-start"
//         alignItems="flex-start"
//       >
//         <Grid item xs={2}>
//           <Avatar alt={props.name} src={props.img} />
//         </Grid>
//         {/* // Analyst info  */}
//         <Grid item xs={4} sm spacing={0}>
//           <Grid item xs container direction="column" spacing={0}>
//             <Grid item xs>
//               <Typography gutterBottom variant="subtitle1">
//                 {props.name}
//               </Typography>
//               <Typography variant="subtitle2" gutterBottom noWrap>
//                 {props.bio}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//         {/* //Analyst Follow Button */}
//         <Grid item  >
//           <Button variant="outlined" color="primary">
//             Follow
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// UserInfo.propTypes = {};


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

      {/* //Analyst Follow Button */}
      <Grid item xs >
        <Button size='small' className={classes.followBt} variant="contained" color="primary" >
          Follow
            </Button>
      </Grid>
    </Grid>
  );
}

UserInfo.propTypes = {};


export function UserProfileDetails(props) {
  const state = useState();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Followers = (FollowersDocs) =>
    FollowersDocs.map((v) => (
      <FollowersFollowingForm
        name={v.name}
        bio={v.bio}
        avatar={v.avatar}
      />
    ));

  const Following = (FollowersDocs) =>
    FollowersDocs.map((v) => (
      <FollowersFollowingForm
        name={v.name}
        bio={v.bio}
        avatar={v.avatar}
      />
    ));

  return (

    <Grid
      spacing={1}
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs container direction="column" >
        <Typography className={classes.typogrAboutMe} variant="h4" >
          ABOUT ME
                </Typography>
        <Typography className={classes.typogrText} style={{ color: '#4d4d4d' }} variant="h5" >
          Contributor Since: 2021
                </Typography>

        <Typography className={classes.typogrText} variant="h5" >
          Contributor long only, Growth, registered investment advisor,investment advisor
                </Typography>
      </Grid>

      <Grid item xs container direction="row" justify='flex-end' sm>
        <IconButton size="small"> <TwitterIcon className={classes.iconstyle} style={{ color: 'grey' }} /></IconButton>
        <IconButton size="small"> <FacebookIcon className={classes.iconstyle} style={{ color: 'grey' }} /></IconButton>
        <IconButton size="small"> <LinkedInIcon className={classes.iconstyle} style={{ color: 'grey' }} /></IconButton>
      </Grid>

      <Grid item xs>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="black"
          centered='true'
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Comments" className={classes.tab1} />
          <Tab label="Followers" className={classes.tab1} />
          <Tab label="Following" className={classes.tab1} />
          <Tab label="Articles" className={classes.tab1} />
          <Tab label="Author’s Picks" className={classes.tab1} />
        </Tabs>
        <Container>
          <Divider variant="middle" />
        </Container>

        {value === 1 && <Container>{Followers(FollowersDocs)}</Container>}
        {value === 2 && <Container>{Following(FollowersDocs)}</Container>}
      </Grid>
    </Grid>
  )
}

export function FollowersFollowingForm(props) {
  const classes = useStyles();
  return (
    // <Container className={classes.container2}>
    <Grid
      spacing={3}
      container
      direction="row"
      justify='flex-start'
      alignItems='center'
    >
      <Grid item  >
        <Avatar className={classes.avatar2} alt={props.name} src={props.avatar} />
      </Grid>
      {/* // Analyst info  */}

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

      {/* //Analyst Follow Button */}

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
    // </Container>
  );
}


