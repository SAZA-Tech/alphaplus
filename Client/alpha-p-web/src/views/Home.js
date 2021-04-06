import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Button, Container, Grid, Paper } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { CompanyCardLine } from "../components/Company/CompanyCard";
import {
  ContentCard,
  ContentCardPaper,
} from "../components/Content/ContentCards";

const useStyles = makeStyles((theme) => ({
  rootCom: {
    // width: "100%",
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
  },
  cardStyle: {
    width: "100%",
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up("lg")]: {
      width: "660px",
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  cardBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up("lg")]: {
      // marginRight: theme.spacing(1),
      marginLeft: theme.spacing(4),
      display: "inline-flex",
    },
  },
  companyLine: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "no-wrap",
    overflowX: "scroll",
    overflowY: "hidden",
    // whiteSpace: 'nowrap',
    padding: theme.spacing(0),
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  porto: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(8),

  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.rootCom}>
      {/* Compnany line + 2 Content cards  */}

      <Paper>
        <Grid container direction="column">
          {/* Company Line */}

          <CompanyCardLine data={companydummyData} />
          <Grid container direction="row" justify="space-around">
            <Grid item>
              {/* Trending Card */}
              <HomeCard
                cardTitle="Trending Analysis"
                dataLimit={3}
                data={contentdummyData}
                btnText="More"
                auther
              />
            </Grid>

            {/* News */}
            <Grid item>
              {/* Trending Card */}
              <HomeCard
                cardTitle="News"
                dataLimit={3}
                data={contentdummyData}
                btnText="More"
                
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Editors Picks + Latest Articles */}
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Paper>
            <HomeCard
              dataLimit={3}
              cardTitle="Editors Picks"
              data={contentdummyData}
              btnText="Explore More"
              auther
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <HomeCard
              dataLimit={3}
              cardTitle="Latest Articles"
              data={contentdummyData}
              btnText="Explore More"
              auther
            />
          </Paper>
        </Grid>
      </Grid>
      {/* Portfolio : (Compnay + Articles) */}
      <Paper className={classes.porto}>
        <div>
          <Typography variant="h4" align="center">
            My Portfolio
          </Typography>
        </div>
        <Grid container direction="row" justify="space-around">
          {/* Company */}
          <Grid item>
            <ContentCardPaper data={contentdummyData} limit={3} auther />
          </Grid>
          {/* Articles */}
          <Grid item>
            <ContentCardPaper data={contentdummyData} limit={3} auther />
          </Grid>
        </Grid>
      </Paper>
      {/* About Alpha+ ? */}
      <Container></Container>
    </div>
  );
}

export function HomeCard(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  const cardButton = () =>
    mobileView ? (
      <Button
        className={classes.cardBtn}
        variant="contained"
        color="primary"
        size="small"
        component={RouterLink}
        to="/"
      >
        {props.btnText}
      </Button>
    ) : (
      <Button
        className={classes.cardBtn}
        color="primary"
        size="medium"
        component={RouterLink}
        to="/"
      >
        {`${props.btnText} >>`}
      </Button>
    );

  return (
    <div className={classes.cardStyle}>
      {/* Trending Card */}
      <ContentCardPaper
        limit={props.dataLimit}
        title={props.cardTitle}
        data={props.data}
        auther={props.auther}
      />
      {cardButton()}
    </div>
  );
}
Home.defaultProps = {
  auther: false,
};
Home.propTypes = {
  cardTitle: PropTypes.string,
  dataLimit: PropTypes.number,
  data: PropTypes.array,
  btnText: PropTypes.string,
  btnRoute: PropTypes.string,
  auther: PropTypes,
};

const companydummyData = [
  { Symbol: "AAPL", price: 293, changePrice: +192 },
  { Symbol: "GOOG", price: 351, changePrice: -122 },
  { Symbol: "AMZN", price: 120, changePrice: +50 },
  { Symbol: "EBSY", price: 963, changePrice: +124 },
  { Symbol: "MOZA", price: 56, changePrice: -56 },
  { Symbol: "NANI", price: 123, changePrice: +21 },
  { Symbol: "AAPL", price: 293, changePrice: +192 },
  { Symbol: "GOOG", price: 351, changePrice: -122 },
  { Symbol: "AMZN", price: 120, changePrice: +50 },
  { Symbol: "EBSY", price: 963, changePrice: +124 },
  { Symbol: "MOZA", price: 56, changePrice: -56 },
  { Symbol: "NANI", price: 123, changePrice: +21 },
];
const contentdummyData = [
  {
    name: "jhon Doe",
    img: "Jh",
    title: "This a test dummy title",
    bio: "simpleBio",
  },
  {
    name: "Ziad Fnan",
    img: "Zi",
    title: "Don't Miss This intersting analyst",
    bio: "simpleBio",
  },
  {
    name: "Abo Motlaq",
    img: "AH",
    title: "I only love apple products",
    bio: "simpleBio",
  },
  {
    name: "Aziz Amir",
    img: "AA",
    title: "Play it cool with your stocks",
    bio: "simpleBio",
  },
  {
    name: "Saleh Mogren",
    img: "SM",
    title: "How to write dummy data like a pro",
    bio: "simpleBio",
  },
];

export default Home;
