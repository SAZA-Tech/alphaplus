import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import {
  CompanyCardFollow,
  CompanyMiniDataTable,
  MiniCompanyCardTable,
  RenderCompanyChart,
  CompanyProfile,
} from "../../components/Company/CompanyCard";
import { ContentCardPaper } from "../../components/Content/ContentCards";
import { contentdummyData } from "../../util/dummyData";
const useStyles = makeStyles((theme) => ({
  paperLayout: {
    // width: "100%",
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
  },
  chart_similar: {
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "space-between",
      paddingRight: theme.spacing(5),
    },
  },
}));
function Company(props) {
  const classes = useStyles();

  const CompanyHeader = () => {
    return (
      <Paper className={classes.paperLayout}>
        <Grid container direction="column">
          {/* Copmany Follow Card */}
          <CompanyCardFollow
            Symbol={companydummyData.Symbol}
            price={companydummyData.price}
            changePrice={companydummyData.changePrice}
            name={companydummyData.name}
          />
          {/* Company Chart */}
          <Grid container direction="row" className={classes.chart_similar}>
            <Grid item>
              <div>
                <RenderCompanyChart
                  data={companyFinanceData}
                  limit={7}
                  dataKey="close"
                  XAxis="date"
                />
              </div>{" "}
            </Grid>{" "}
            <Grid item>
              <MiniCompanyCardTable data={similarCompanydummyData} limit={4} />
            </Grid>
          </Grid>
          {/* Similar Companies minitable */}
        </Grid>
      </Paper>
    );
  };
  const CompanyRelatedArticlesAndData = () => {
    return (
      <Paper className={classes.paperLayout}>
        {/* Company Chart */}
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-around"
        >
          <Grid item lg={6}>
            <ContentCardPaper
              auther
              data={contentdummyData}
              limit={5}
              title="Rleated Articles"
            />
          </Grid>{" "}
          <Grid item xs md={4}>
            <CompanyMiniDataTable data={companyFinanceData[1]} />
          </Grid>
        </Grid>
        {/* Similar Companies minitable */}
      </Paper>
    );
  };
  const CompanyProfileCard = () => {
    return (
      <Paper className={classes.paperLayout}>
        <CompanyProfile companyInfo={companydummyData.companyIfno} />
      </Paper>
    );
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>{CompanyHeader()}</Grid>
        <Grid item>{CompanyRelatedArticlesAndData()}</Grid>
        <Grid item>{CompanyProfileCard()}</Grid>
      </Grid>
    </div>
  );
}

Company.propTypes = {};
{
  /* Company Chart + Financial Data  */
}
export default Company;

{
  /* Related Article +  Copmany Data */
}

const companydummyData = {
  Symbol: "AAPL",
  price: 123.3,
  name: "Apple Inc",
  changePrice: "4.22(+2.32%)",
  companyIfno: {
    name: "Apple Inc",
    bio:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also      sells various related services. The company offers iPhone, More",
    sector: "Tech",
    address: "One Apple Park Way Cupertino, CA, 95014 United State",
    industry: "Technology Hardware",
    phoneNumber: "408-996-1010",
    website: "www.apple.com",
  },
};
const similarCompanydummyData = [
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
const companyFinanceData = [
  {
    exchange: "XSAU",
    Open: 18.12,
    high: 18.3,
    low: 18.1,
    close: 18.22,
    volume: 22366500,
    date: "2021-04-07T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.14,
    high: 18.26,
    low: 18.1,
    close: 18.12,
    volume: 11154793,
    date: "2021-04-06T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.2,
    high: 18.24,
    low: 18.1,
    close: 18.14,
    volume: 11616274,
    date: "2021-04-05T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.18,
    high: 18.36,
    low: 18.12,
    close: 18.22,
    volume: 8264137,
    date: "2021-04-04T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.3,
    high: 18.42,
    low: 18.16,
    close: 18.18,
    volume: 17543600,
    date: "2021-04-01T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.4,
    high: 18.42,
    low: 17.88,
    close: 18.36,
    volume: 37871632,
    date: "2021-03-31T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 17.78,
    high: 17.88,
    low: 17.7,
    close: 17.76,
    volume: 9146628,
    date: "2021-03-30T00:00:00+0000",
  },
  {
    exchange: "XSAU",
    Open: 18.1,
    high: 18.12,
    low: 17.92,
    close: 17.98,
    volume: 14149700,
    date: "2021-04-08T00:00:00+0000",
  },
];
