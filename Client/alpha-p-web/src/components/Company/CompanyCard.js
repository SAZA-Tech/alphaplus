import React, { useRef } from "react";
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
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

const userStyles = makeStyles((theme) => ({
  companySymbol: {
    color: theme.palette.primary.light,
    fontWeight: theme.typography.fontWeightBold,
  },
  price: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  changePrice: {
    color: theme.palette.success.light,
    fontWeight: theme.typography.fontWeightBold,
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
    // overflowY: "hidden",
    // whiteSpace: "nowrap",

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
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 400,
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
            <Typography variant="subtitle2" className={classes.companySymbol}>
              {props.Symbol}
            </Typography>
            <Typography variant="subtitle2" className={classes.price}>
              {props.price}
            </Typography>
            <Typography variant="subtitle2" className={classes.changePrice}>
              {props.change}
            </Typography>
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
        <TableCell align="left">
          <Typography variant="subtitle2" className={classes.companySymbol}>
            {props.Symbol}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" className={classes.price}>
            {props.price}
          </Typography>
        </TableCell>{" "}
        <TableCell align="right">
          <Typography variant="subtitle2" className={classes.changePrice}>
            {props.change}
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
            Symbol={e.Symbol}
            price={e.price}
            change={e.changePrice}
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
    <TableContainer className={classes.minitable}>
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
              Symbol={e.Symbol}
              price={e.price}
              change={e.changePrice}
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
};
MiniCompanyCardTable.defaultProps = {
  limit: 0,
};
export { CompanyCard, CompanyCardLine, MiniCompanyCardTable };
