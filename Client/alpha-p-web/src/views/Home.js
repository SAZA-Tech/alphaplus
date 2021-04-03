import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Button, Container, Grid, Paper } from "@material-ui/core";

import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CompanyCard from "../components/Company/CompanyCard";
import { ContentCards } from "../components/Content/ContentCards";

const useStyles = makeStyles((theme) => ({
  topContainer: {
    // height: theme.spacing(40),
  },
  rootCom: {
    width: "100%",
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
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
    // marginTop: theme.spacing(1),
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
  cardLayout: {
    [theme.breakpoints.up("lg")]: {
      width: "50%",
      alignContent: "start",
    },
    paddingTop: theme.spacing(4),
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Home() {
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
          <Grid item direction="column" classname={classes.cardLayout}>
            {/* Trending Card */}
            <Typography variant="h5" align="center">
              Trending Analysis
            </Typography>
            {contentdummyData.map((e) => (
              <ContentCards
                title={e.title}
                name={e.name}
                img={e.img}
                withAuther
              />
            ))}
            <Grid item></Grid>
            {/* News */}
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Editors Picks + Latest Articles */}
      <Grid container></Grid>
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
  { name: "jhon Doe", img: "Jh", title: "This a test dummy title" },
  { name: "Ziad Fnan", img: "Zi", title: "Don't Miss This intersting analyst" },
  { name: "Abo Motlaq", img: "AH", title: "I only love apple products" },
  { name: "Aziz Amir", img: "AA", title: "Play it cool with your stocks" },
  {
    name: "Saleh Mogren",
    img: "SM",
    title: "How to write dummy data like a pro",
  },
];
