import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  ButtonBase,
  Grid,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },
  wideFollowBtn: {
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(20),
    },
  },
}));

export function ArticleAutherInfo(props) {
  const state = useState();
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
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
              <Typography gutterBottom variant="subtitle1">
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
          <Button variant="outlined" color="primary">
            Follow
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

ArticleAutherInfo.propTypes = {};

export function ArticleAutherInfoExpanded(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
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
              <Typography gutterBottom variant="subtitle1">
                {props.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom noWrap>
                {props.bio}
              </Typography>
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
            >
              Follow
            </Button>
          </Grid>

          <Grid item spacing={2} alignItems="center" alignContent="center">
            <Typography gutterBottom variant="caption">100 Followers</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
