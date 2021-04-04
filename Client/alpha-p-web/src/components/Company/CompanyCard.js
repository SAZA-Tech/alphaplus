import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fade, makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Typography, Grid } from "@material-ui/core";

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
    paddingRight:theme.spacing(2),
    [theme.breakpoints.up("md")]:{
        paddingRight:theme.spacing(10)

    }
  },
  vertRoot: {
    // "& hr": {
    //   margin: theme.spacing(0, 0.5),
    //   alignSelf: "stretch",
    //   height: "auto",
    // },
    borderRight: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    paddingRight:theme.spacing(2),
    marginLeft:theme.spacing(1)
    // paddingLeft:theme.spacing(1)
  },
}));

// Variant , Size

// Data : Symbol(Compnay) , Price , Change
const CompanyCard = (props) => {
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
            <Divider orientation="vertical" flexItem  />
          </Grid>
        </Grid>
      </div>
    );
  };
  return <div>{props.vertical ? VerticalCard() : null}</div>;
};

export default CompanyCard;


export class CompanyCard extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default CompanyCard
