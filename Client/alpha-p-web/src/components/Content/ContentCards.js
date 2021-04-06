import React, { useEffect, useState } from "react";
import PropTypes, { func } from "prop-types";
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
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    "& hr": {
      margin: theme.spacing(1),
      alignSelf: "stretch",
    },
    alignItems: "center",
  },
  title: {
    textDecoration: "none",
    "&:visited": {
      color: theme.palette.common.black,
    },
    padding: theme.spacing(1),
  },
  cardLayout: {
    marginTop: theme.spacing(2),
    "& .MuiTypography-h5": {
      paddingLeft: theme.spacing(2),
      color: theme.palette.grey[700],
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.fontSize,
      marginTop: theme.spacing(4),
    },
  },
}));

function ContentCard(props) {
  const [state, setState] = useState({
    withAuther: false,
    crudOtion: false,
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
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {/* <Grid item>
          {state.withAuther ? (
            <Avatar alt={props.name} src={props.img} />
          ) : (
            <Container />
          )}
        </Grid> */}

        {/* // Content info  */}
        <Grid item sm>
          <Grid item container direction="column">
            <Grid item>
              <Typography
                // component={RouterLink}
                // to={props.link == null ? null : props.link}
                variant="h6"
                className={classes.title}
              >
                {props.title}
              </Typography>
              <Typography variant="subtitle1">{props.bio}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* // Crud Buttons */}
        {state.crudOtion ? (
          <Grid container item>
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <Divider variant="fullWidth" />
    </div>
  );
}
ContentCard.defaultProps = {
  withAuther: false,
  crudOtion: false,
  link: null,
};
ContentCard.propTypes = {
  withAuther: PropTypes.bool,
  crudOtion: PropTypes.bool,
  name: PropTypes.string,
  img: PropTypes.string,
  bio: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};
function ContentCardPaper(props) {
  const classes = useStyles();

  const ContentCardsItems = () =>
    props.data.slice(0, props.limit).map((e) => {
      return (
        <ContentCard
          title={e.title}
          name={e.name}
          img={e.img}
          bio={e.bio}
          withAuther={props.auther}
        />
      );
    });
  return (
    <div className={classes.cardLayout}>
      <Typography variant="h5">{props.title}</Typography>
      {ContentCardsItems()}
    </div>
  );
}
ContentCardPaper.defaultProps = {
  auther: false,
};
ContentCardPaper.propTypes = {
  limit: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  auther: PropTypes.bool.isRequired,
};

export { ContentCard, ContentCardPaper };
