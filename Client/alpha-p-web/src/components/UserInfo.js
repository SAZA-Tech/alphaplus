import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Grid,
  Chip,
  Divider,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER_GQL, PROFILE_GQL } from "../graphql/Auth/authGql";
import PropTypes from "prop-types";
import { useFollow } from "../util/hooks";

const img = "avatars/7.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },

  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginTop: theme.spacing(0.75),

    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginTop: theme.spacing(1.25),
    },
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      marginTop: theme.spacing(2.75),
    },
  },

  avatar2: {
    // width: theme.spacing(4),
    // height: theme.spacing(4),

    [theme.breakpoints.between("sm", "xl")]: {
      // width: theme.spacing(5.75),
      // height: theme.spacing(5.75),
    },
  },

  typography: {
    fontSize: "20px",
    marginBottom: theme.spacing(1),

    [theme.breakpoints.between("sm", "md")]: {
      // fontSize: "15.5px",
    },
    [theme.breakpoints.between("md", "xl")]: {
      marginBottom: theme.spacing(2),
      fontSize: "22px",
      fontStyle: "normal",
      lineHeight: "32px",
    },
  },

  chip: {
    fontSize: "14px",
    height: theme.spacing(3),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.between("md", "xl")]: {
      fontSize: "10px",
      height: theme.spacing(3),
      marginBottom: theme.spacing(0.75),
      marginTop: theme.spacing(0.75),
    },
    [theme.breakpoints.between("md", "xl")]: {
      height: theme.spacing(3),
      fontSize: "13px",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(0.75),
    },
  },

  followBt: {
    width: theme.spacing(11),
  },

  FollowBtn2: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: theme.spacing(1),
      marginLeft: theme.spacing(-4),
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(9),
      marginLeft: theme.spacing(1),
    },
  },

  typogrFollowerFollwing: {
    [theme.breakpoints.between("xs", "sm")]: {
      // fontSize: '1px'
    },
  },
}));

{
  /* // UserInfo"theSmallCard"  */
}
export function UserInfo(props) {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(props.isFollowed);
  const { followed, toggleFollow } = useFollow(props.id, props.isFollowed);
  // const handleFollow = () => {
  //   if (!loggedInUser) history.push("/login");
  //   else {
  //     useFollow(props.id);
  //     setFollowed(!followed);
  //   }
  // };

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid item xs>
        <Avatar className={classes.avatar} alt={props.name} src={props.img} />
      </Grid>

      <Grid item xs>
        <Typography
          className={classes.typography}
          variant="h6"
          component={RouterLink}
          style={{ textDecoration: "none", color: "black" }}
          to={`/userProfile/${props.userId}`}
        >
          {props.name}
        </Typography>
      </Grid>

      <Grid item xs>
        <Chip
          className={classes.chip}
          label={props.bio}
          color="primary"
          variant="outlined"
        />
      </Grid>

      {/* //User Follow Button */}
      <Grid item xs>
        <Button
          size="small"
          className={classes.followBt}
          variant={followed ? "outlined" : "contained"}
          color="primary"
          onClick={toggleFollow}
        >
          {followed ? "Following" : "Follow"}
        </Button>
      </Grid>
    </Grid>
  );
}

UserInfo.defaultProps = {
  userId: "undefined",
  isFollowed: false,
};
UserInfo.propTypes = {
  isFollowed: PropTypes.bool,
  userId: PropTypes.string.isRequired,
};
{
  /* // FollowerFollowingForm  */
}
export function FollowerFollowingForm(props) {
  const classes = useStyles();
  return (
    <Grid
      spacing={3}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      {/* // User Avatar  */}
      <Grid item>
        <Avatar
          className={classes.avatar2}
          alt={props.name}
          src={props.avatar}
        />
      </Grid>

      {/* // User info  */}
      <Grid
        item
        xs="8"
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="column"
        spacing={0}
      >
        <Typography
          className={classes.typogrFollowerFollwing}
          variant="subtitle1"
          component={RouterLink}
          style={{ textDecoration: "none", color: "black" }}
          to={`/userProfile/${props.userId}`}
        >
          {props.name}
        </Typography>
        <Typography
          className={classes.typogrFollowerFollwing}
          variant="subtitle2"
        >
          {props.bio}
        </Typography>

        <Container>
          <Divider variant="middle" />
        </Container>
      </Grid>

      {/* //User Follow Button */}
      <Grid item>
        <Button className={classes.FollowBtn2} variant="outlined" color="black">
          Follow
        </Button>
      </Grid>
    </Grid>
  );
}
