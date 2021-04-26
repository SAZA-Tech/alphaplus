// import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
 
  Grid,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { useFollow } from "../util/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },
  wideFollowBtn: {
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(20),
    },
  },
}));

export function ArticleAutherInfo(props) {
  // const state = useState();
  const classes = useStyles();
  const { followed, toggleFollow } = useFollow(props.userId, props.isFollowed);
  return (
    <Container className={classes.root} maxWidth="xs">
      <Grid
        spacing={4}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2}>
          <Avatar alt={props.name} src={props.img} />
        </Grid>
        {/* // Analyst info  */}
        <Grid item xs={4} sm spacing={0}>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component={RouterLink}
                style={{ textDecoration: "none", color: "black" }}
                to={`/userProfile/${props.userId}`}
              >
                {props.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom noWrap>
                {props.bio}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* //Analyst Follow Button */}
        <Grid item xs={2} sm>
          <Button variant="outlined" color="primary" onClick={toggleFollow}>
            {followed ? "Unfollow" : "Follow"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
ArticleAutherInfo.defaultProps = {
  // userId: "undefind",
  isFollowed: false,
};
ArticleAutherInfo.propTypes = { isFollowed: PropTypes.bool.isRequired };

export function ArticleAutherInfoExpanded(props) {
  const classes = useStyles();
  const { followed, toggleFollow } = useFollow(props.userId, props.isFollowed);

  return (
    <Container className={classes.root}>
      <Grid
        spacing={2}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={0}>
          <Avatar alt={props.name} src={props.img} />
        </Grid>
        {/* // Analyst info  */}
        <Grid item xs={4} sm spacing={0}>
          <Grid item xs container direction="column" spacing={0}>
            <Grid item xs sm>
              <Typography
                variant="body1"
                component={RouterLink}
                style={{ textDecoration: "none", color: "black" }}
                to={`/userProfile/${props.userId}`}
              >
                {props.name == null ? "Name Null" : props.name}
              </Typography>
              <Typography variant="caption" noWrap>
                {props.username}
              </Typography>
              <Typography variant="body2">{props.bio}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* //Analyst Follow Button */}
        <Grid
          item
          xs={2}
          sm
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
          container
        >
          <Grid item>
            <Button
              className={classes.wideFollowBtn}
              variant="outlined"
              color="primary"
              onClick={toggleFollow}
            >
              {followed ? "Unfollow" : "Follow"}
            </Button>
          </Grid>

          <Grid item spacing={2} alignItems="center" alignContent="center">
            <Typography gutterBottom variant="caption">
              100 Followers
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
ArticleAutherInfoExpanded.defaultProps = {
  isFollowed: false,
};
ArticleAutherInfoExpanded.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
