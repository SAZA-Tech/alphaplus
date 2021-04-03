import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  ButtonBase,
  Grid,
  Typography,
  Button,
  Container,
  Card,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
    paddingTop : theme.spacing(1),
    paddingLeft: theme.spacing(2),
      "& hr": {
      margin: theme.spacing(1),
      alignSelf: "stretch",
    },
  },
  title: {
    fontSize: theme.typography.fontSize,
    textDecoration: "none",
    "&:visited": {
      color: theme.palette.common.black,
    },
  },
}));

function ContentCards(props) {
  const [state, setState] = useState({
    withAuther: false,
    crudOtion: true,
  });
  useEffect(() => {
    if (props.withAuther)
      setState({
        withAuther: props.withAuther,
      });
    if (props.crudOtion)
      setState({
        crudOtion: props.crudOtion,
      });
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        spacing={2}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          {state.withAuther ? (
            <Avatar alt={props.name} src={props.img} />
          ) : null}
        </Grid>

        {/* // Content info  */}
        <Grid item  sm>
          <Grid item container direction="column" >
            <Grid item>
              <Typography
                component={RouterLink}
                to={props.link}
                gutterBottom
                variant="h6"
                className={classes.title}
              >
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* // Crud Buttons */}
        {state.crudOtion ? (
          <Grid container item xs={2}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <Divider  variant='fullWidth'/>

    </div>
  );
}

export { ContentCards };
