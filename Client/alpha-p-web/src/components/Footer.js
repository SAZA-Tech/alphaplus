import { Grid, makeStyles, Typography, Link } from "@material-ui/core";
import { EmailRounded } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
const useStyles = makeStyles((theme) => ({
  copyRight: {
    width: "100%",
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    
  },
  footerLayout: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    "& a": {
      color: theme.palette.common.white,
      padding: theme.spacing(0),
      marginBottom: theme.spacing(1),
      display: "flex",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
    },
    padding: theme.spacing(4),
  },
  contactUs: {
    display: "flex",
    flexDirection: "column",
    "& div": {
      display: "inherit",
      verticalAlign: "middle",
      alignItems: "center",
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  logo: {
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    justifyContent: "flex-start",
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(50),
    },
  },
  linksGrid: {
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "column",
      "& a": {
        color: theme.palette.common.white,
        padding: theme.spacing(0),
        marginBottom: theme.spacing(1),
      },
    },
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
        <Typography variant="h3" className={classes.logo}>
          ALPHA+
        </Typography>
        <Grid container direction="row" spacing={8}>
          <Grid item className={classes.linksGrid}>
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
          <Grid item className={classes.linksGrid}>
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
          <Grid item className={classes.contactUs}>
            <Typography variant="h5">Contact Us</Typography>
            <div>
              <EmailRounded fontSize="small" /> <span>Email@email.com</span>
            </div>
            <div>
              <TwitterIcon />
              <LinkedInIcon />
              <InstagramIcon />
            </div>
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
