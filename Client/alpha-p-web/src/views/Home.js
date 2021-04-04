import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Button, Container, Grid, Paper } from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CompanyCard from "../components/Company/CompanyCard";
import {
  ContentCards,
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
    [theme.breakpoints.up("lg")]: {
      width: "45%",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
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
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.rootCom}>
      {/* Compnany line + 2 Content cards  */}

      <Paper className={classes.topContainer}>
        <Grid container direction="column">
          {/* Company Line */}
          <Grid item className={classes.companyLine}>
            {companydummyData.map((e) => (
              <CompanyCard
                vertical={true}
                Symbol={e.Symbol}
                price={e.price}
                change={e.changePrice}
              />
            ))}
          </Grid>
          <Grid container direction="row" justify="space-around">
            <Grid
              item
              className={classes.cardStyle}
              justify="flex-start"
              alignItems="flex-start"
            >
              {/* Trending Card */}
              <ContentCardPaper
                limit={3}
                title="Trending Analysis"
                data={contentdummyData}
                auther
              />
              <Button color="primary" component={RouterLink} to="/">
                More
              </Button>
            </Grid>

            {/* News */}
            <Grid item className={classes.cardStyle}>
              {/* Trending Card */}
              <ContentCardPaper
                limit={3}
                title="News"
                data={contentdummyData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Editors Picks + Latest Articles */}
      <Grid container direction="row" justify="space-between">
        <Grid item className={classes.cardStyle}>
          <Paper>
            <ContentCardPaper
              limit={3}
              title="Editors Picks"
              data={contentdummyData}
              auther
            />
          </Paper>
        </Grid>{" "}
        <Grid item className={classes.cardStyle}>
          <Paper>
            <ContentCardPaper
              limit={3}
              title="Latest Articles"
              data={contentdummyData}
              auther
            />
          </Paper>
        </Grid>
      </Grid>
      {/* Portfolio : (Compnay + Articles) */}
      <Grid container></Grid>
      {/* About Alpha+ ? */}
      <Container></Container>
    </div>
  );
}

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
