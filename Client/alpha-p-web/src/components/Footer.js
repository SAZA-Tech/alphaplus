import { Grid, makeStyles, Typography, Link } from "@material-ui/core";
import { EmailRounded } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  copyRight: {
    width: "100%",
    background: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  footerLayout: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,

    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(4),
  },
  logo: {
    paddingRight: theme.spacing(4),
    justifyContent: "flex-start",
  },
}));
const Footer = () => {
  const classes = useStyles();
  const copyRight = () => {
    const year = new Date().getFullYear();
    return `Alpha+ © ${year}`;
  };
  return (
    <div>
      {/* Footer Elements */}
      <div className={classes.footerLayout}>
        <Typography variant="h3" className={classes.logo}>ALPHA+</Typography>
        <Grid container direction="row" spacing={4}>
          <Grid item direction="column">
            <Typography variant="h5">Useful Links</Typography>
            <Link component={RouterLink} to="/">
              Home
            </Link>{" "}
            <Link component={RouterLink} to="/">
              About Us
            </Link>{" "}
            <Link component={RouterLink} to="/">
              Services
            </Link>{" "}
            <Link component={RouterLink} to="/">
              Help
            </Link>
          </Grid>{" "}
          <Grid item>
            <Typography variant="h5">Legal</Typography>
            <Link component={RouterLink} to="/">
              Terms & Conditions
            </Link>{" "}
            <Link component={RouterLink} to="/">
              Privacy
            </Link>{" "}
            <Link component={RouterLink} to="/">
              Market Data Sources
            </Link>
          </Grid>
          <Grid item>
            <Typography variant="h5">Contact Us</Typography>
            <EmailRounded>Email@email.com</EmailRounded>
            <Link component={RouterLink} to="/">
              Privacy
            </Link>{" "}
            <Link component={RouterLink} to="/">
              Market Data Sources
            </Link>
          </Grid>
        </Grid>
      </div>
      {/* Copyright */}
      <div className={classes.copyRight}>
        <Typography variant="body1" align="center">
          {copyRight()}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
