import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Typography,
  Grid,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Button,
} from "@material-ui/core";
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from "react-router-dom";

const userStyles = makeStyles((theme) => ({
  companySymbol: {
    color: theme.palette.primary.light,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.fontSize * 1.5,
    },
  },
  price: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  changePrice: {
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.fontSize,
    },
  },

  tableContent: {
    fontWeight: "400px",
    [theme.breakpoints.up("lg")]: {
      fontSize: "24px",
    },
  },

  negative: {
    color: theme.palette.error.dark,
  },
  positvie: {
    color: theme.palette.success.dark,
  },
  verticalCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(10),
    },
  },
  vertRoot: {
    // "& hr": {
    //   margin: theme.spacing(0, 0.5),
    //   alignSelf: "stretch",
    //   height: "auto",
    // },
    borderRight: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    paddingRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    "& .price": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    // paddingLeft:theme.spacing(1)
  },
  companyLine: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    overflowX: "scroll",
    overflowY: "hidden",
    // whiteSpace: 'nowrap',
    padding: theme.spacing(0),
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollBehavior: "smooth",
  },
  companyLineScroll: {
    width: "100%",
    overflowX: "auto",
    "-webkit-overflow-scrolling": "touch",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& .vertRoot": {
      flex: "0 0 auto",
      marginRight: " 3px",
    },
  },
  arrowButtons: {
    zIndex: 2,
    transform: "matrix(-1, 0, 0, 1, 0, 0)",
    paddingLeft: theme.spacing(1),
  },
  minitable: {
    minWidth: 340,
    "& .MuiTableCell-head": {
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.up("md")]: {
        fontSize: theme.typography.fontSize * 1.2,
      },
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 400,
    },
  },
  followCardLayout: {
    padding: theme.spacing(2),
    "& .MuiTypography-h5": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize * 2,
    },
    "& .MuiTypography-body1": {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.fontSize * 1.5,
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(1),
      },
    },
    "& .MuiTypography-h6": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize * 2,
    },
    [theme.breakpoints.up("lg")]: {
      "& .MuiGrid-justify-xs-space-between": {
        alignItems: "center",
      },
    },
  },
  typographyDiv_followCardLayout: {
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  ChartRoot: {
    width: 400,
    [theme.breakpoints.up("lg")]: {
      width: 900,
    },
  },
  LeftCol: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(4),
    },
  },
  CompanyProfileLayout: {
    padding: theme.spacing(2),
    // width: "100%",
  },
  labelLayout: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize * 1.5,
    paddingTop: theme.spacing(2),
    padding: theme.spacing(1),
    "& p": {
      paddingLeft: theme.spacing(12),
    },
  },
}));

// Variant , Size

// Data : Symbol(Compnay) , Price , Change
function CompanyCard(props) {
  const classes = userStyles();
  const VerticalCard = () => {
    return (
      <div className={classes.vertRoot}>
        <Grid Container className={classes.verticalCard} direction="row">
          <Grid item>
            <Typography
              component={Link}
              to={`/company/${props.comId}`}
              target="_blank"
              variant="subtitle2"
              className={classes.companySymbol}
            >
              {props.Symbol}
            </Typography>
            <Typography variant="subtitle2" className={classes.price}>
              {props.price}
            </Typography>
            <ChangePriceValue changePrice={props.change} />
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
        </Grid>
      </div>
    );
  };
  const horizontalCard = () => {
    return (
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2" className={classes.companySymbol}>
            {props.Symbol}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" className={classes.tableContent}>
            {props.price}
          </Typography>
        </TableCell>{" "}
        <TableCell>
          <ChangePriceValue changePrice={props.change} />
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" className={classes.tableContent}>
            {props.volume}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" className={classes.tableContent}>
            {props.avgVolume}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" className={classes.tableContent}>
            {props.prevClose}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" className={classes.tableContent}>
            {props.open}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };
  return props.vertical ? VerticalCard() : horizontalCard();
}

CompanyCard.defaultProps = {
  vertical: false,
  horizontal: false,
};
CompanyCard.propTypes = {
  vertical: PropTypes.bool.isRequired,
  horizontal: PropTypes.bool.isRequired,
  name: PropTypes.string,
  Symbol: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  changePerce: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  avgVolume: PropTypes.number.isRequired,
  prevClose: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired,
};

function CompanyCardLine(props) {
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const classes = userStyles();

  return (
    <div className={classes.companyLineScroll}>
      <div className={classes.companyLine} ref={ref}>
        {props.data.map((e) => (
          <CompanyCard
            vertical={true}
            Symbol={e.symbol}
            price={e.todayFinance ? e.todayFinance.close : e.price}
            change={e.change}
            comId={e.id}
          />
        ))}
      </div>
      <div className={classes.arrowButtons}>
        <IconButton size="small" onClick={() => scroll(500)}>
          <KeyboardArrowLeftIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => scroll(-500)}>
          <KeyboardArrowRightIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

CompanyCardLine.propTypes = {
  data: PropTypes.array.isRequired,
};

function MiniCompanyCardTable(props) {
  const classes = userStyles();

  return (
    <TableContainer
      className={classes.minitable}
      style={{ minWidth: props.minWidth == 0 ? "inherent" : props.minWidth }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Company</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.slice(0, props.limit).map((e) => (
            <CompanyCard
              Symbol={e.symbol ? e.symbol : e.Symbol}
              price={e.todayFinance ? e.todayFinance.close : e.price}
              change={e.change ? e.change : e.changePrice}
              horizontal
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
MiniCompanyCardTable.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
  minWidth: PropTypes.number,
};
MiniCompanyCardTable.defaultProps = {
  limit: 0,
  minWidth: 0,
};

export function BigMiniCompanyCardTable(props) {
  const classes = userStyles();

  return (
    <TableContainer
      className={classes.minitable}
      style={{ minWidth: props.minWidth == 0 ? "inherent" : props.minWidth }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "400" }}>Company</TableCell>
            <TableCell style={{ fontWeight: "400" }}>Price</TableCell>
            <TableCell style={{ fontWeight: "400" }}>Change</TableCell>

            <TableCell style={{ fontWeight: "400" }}>Volume</TableCell>
            <TableCell style={{ fontWeight: "400" }}>Avg.Volume</TableCell>
            <TableCell style={{ fontWeight: "400" }}>Prev.close</TableCell>
            <TableCell style={{ fontWeight: "400" }}>Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.slice(0, props.limit).map((e) => (
            <CompanyCard
              Symbol={e.Symbol}
              price={e.price}
              change={e.change ? e.change : e.changePrice}
              // changePerce={e.changePerce}
              volume={e.volume}
              avgVolume={e.avgVolume}
              prevClose={e.prevClose}
              open={e.open}
              horizontal
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
BigMiniCompanyCardTable.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
  minWidth: PropTypes.number,
};
BigMiniCompanyCardTable.defaultProps = {
  limit: 0,
  minWidth: 0,
};

/**
 * Company Card With Follow Button
 * @param {*} props
 * @returns
 */
function CompanyCardFollow(props) {
  const classes = userStyles();
  return (
    <div className={classes.followCardLayout}>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <div className={classes.typographyDiv_followCardLayout}>
            <Typography variant="h5">{props.Symbol}</Typography>
            <Typography variant="body1">{props.name}</Typography>
          </div>
          <div className={classes.typographyDiv_followCardLayout}>
            <Typography variant="h6">{props.price}</Typography>
            <ChangePriceValue changePrice={props.changePrice} />
          </div>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="large">
            Follow
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
// CompanyCardFollow.defaultProps{

// }
CompanyCardFollow.propTypes = {
  Symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  changePrice: PropTypes.string.isRequired,
};

const ChangePriceValue = (props) => {
  const classes = userStyles();
  const str = props.changePrice ? props.changePrice.toString() : "23(+4.1%)";
  var signReg = /(\+|\-)/g;
  const sign = str.split(signReg)[1];
  const signStyle = sign == "+" ? classes.positvie : classes.negative;
  return (
    <Typography
      variant="body1"
      className={`${classes.changePrice} ${signStyle}`}
    >
      {props.changePrice}
    </Typography>
  );
};
ChangePriceValue.propTypes = {
  changePrice: PropTypes.string.isRequired,
};
const cleaning = (data) => {
  var newArray = data.map((a) => ({ ...a }));
  newArray.map((e) => (e.date = e.date.split("T")[0]));
  return newArray;
};
function RenderCompanyChart(props) {
  const classes = userStyles();
  const cleanedData = cleaning(props.data);
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
  return (
    <div className={classes.ChartRoot}>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
          data={cleanedData}
        >
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient> */}
          </defs>
          <XAxis dataKey={props.XAxis} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={props.dataKey}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorClose)"
          />
          {/* <Area
          type="monotone"
          dataKey="close"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
RenderCompanyChart.defaultProps = {
  limit: 7,
  XAxis: "date",
  dataKey: "close",
};
RenderCompanyChart.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  dataKey: PropTypes.string.isRequired,
  XAxis: PropTypes.string.isRequired,
};

function CompanyMiniDataTable(props) {
  const classes = userStyles();
  const array = Object.entries(props.data);
  const half = array.length / 2;
  const bData = (key, value) =>
    (key == "date") | (key == "__typename") ? null : (
      <TableRow>
        <TableCell>
          <Typography variant="h6">{key}</Typography>
        </TableCell>
        <TableCell>
          <Typography align="left" variant="h6">
            {value}
          </Typography>
        </TableCell>
      </TableRow>
    );
  return (
    <TableContainer className={classes.minitable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="h5">{props.title}</Typography>
            </TableCell>
            {/* <TableCell></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          <column className={classes.LeftCol}>
            {array.slice(0, half).map(([key, value], i) => bData(key, value))}
          </column>{" "}
          <column>
            {array
              .slice(half, undefined)
              .map(([key, value], i) => bData(key, value))}
          </column>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
CompanyMiniDataTable.defaultProps = {
  title: "Company Data",
};
CompanyMiniDataTable.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
};

function CompanyProfile(props) {
  const classes = userStyles();
  let array = Object.entries(props.companyInfo);
  array = array.filter(([key, value]) => (key != "name") | (key != "bio"));
  const label = (key, value) =>
    (key == "name") | (key == "bio") ? null : (
      <div style={{ width: "inherent" }}>
        <div className={classes.labelLayout}>
          <Typography variant="inherit">{key}</Typography>
          <Typography variant="body1">{value}</Typography>
        </div>{" "}
        <Divider orientation="horizontal" />
      </div>
    );
  return (
    <div className={classes.CompanyProfileLayout}>
      <Grid container direction="column">
        <Grid item>
          <div>
            <Typography variant="h4">{`${props.companyInfo.name} Profile`}</Typography>
            <Typography variant="body1">{props.companyInfo.bio}</Typography>
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid item xs lg={5}>
            {label("Secotr", props.companyInfo.sector)}
            {label("Address", props.companyInfo.address)}
          </Grid>
          <Grid item xs lg={5}>
            {label("Industry", props.companyInfo.industry)}
            {label("Phone Number", props.companyInfo.phoneNumber)}
            {label("Website", props.companyInfo.website)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

CompanyProfile.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};

export {
  CompanyCard,
  CompanyCardLine,
  MiniCompanyCardTable,
  CompanyCardFollow,
  RenderCompanyChart,
  CompanyMiniDataTable,
  CompanyProfile,
};
