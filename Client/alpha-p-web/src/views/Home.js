import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";

import { Link as RouterLink, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import {
  CompanyCardLine,
  MiniCompanyCardTable,
} from "../components/Company/CompanyCard";
import {
  ContentCard,
  ContentCardPaper,
} from "../components/Content/ContentCards";
import { useQuery } from "@apollo/client";
import { HOMEPAGE_GQL } from "../graphql/homeGql";

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
      // width: "660px",
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    marginBottom: theme.spacing(8),
    "& .MuiGrid-container": {
      alignItems: "center",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const { data, error, loading } = useQuery(HOMEPAGE_GQL);
  if (loading) return <CircularProgress />;
  if (error) return <Redirect to="/404" />;

  return (
    <div className={classes.rootCom}>
      {/* Compnany line + 2 Content cards  */}

      <Paper>
        <Grid container direction="column">
          {/* Company Line */}

          <CompanyCardLine data={data.getCompanies} />
          <Grid container direction="row" xs justify="space-between">
            <Grid item sm xs md={5}>
              {/* Trending Card */}
              <HomeCard
                cardTitle="Trending Analysis"
                dataLimit={5}
                data={data.getArticles}
                btnText="More"
                auther
              />
            </Grid>

            {/* News */}
            <Grid item md={5}>
              {/* Trending Card */}
              <HomeCard
                cardTitle="News"
                dataLimit={4}
                data={contentdummyData}
                btnText="More"
                
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Editors Picks + Latest Articles */}

      <Grid container direction="row" xs justify="space-between">
        <Grid item xs={12} lg={5}>
          <Paper>
            <HomeCard
              dataLimit={3}
              cardTitle="Editors Picks"
              data={data.getArticles}
              btnText="Explore More"
              auther
            />
          </Paper>
        </Grid>
        <Grid item xs lg={5}>
          <Paper>
            <HomeCard
              dataLimit={3}
              cardTitle="Latest Articles"
              data={data.getArticles}
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
        <Grid container direction="row" justify="center" spacing={6} >
          {/* Company */}
          <Grid item xs lg={5}>
            <MiniCompanyCardTable data={data.getCompanies} limit={4} />
          </Grid>
          {/* Articles */}
          <Grid item xs lg={6}>
            <ContentCardPaper data={data.getArticles} limit={3} auther />
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
