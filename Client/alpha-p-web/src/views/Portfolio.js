import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
// import { HomeCard } from "./Home";
// import { AuthContext } from "../context/auth";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
} from "@material-ui/core";

import {
  //  Link as RouterLink,

  Redirect,
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { PORTFOLIO_GQL } from "../graphql/Company/portfolioGql";
import { NetworkStatus } from "@apollo/client";
import InputFormPort from "../components/Company/inputformport";
import EditFormport from "../components/Company/edfitformport";
import {
  CompanyCardLine,
  BigCompanyCardTable,
} from "../components/Company/CompanyCard";
import { ContentCardPaper } from "../components/Content/ContentCards";
import { userConfigVar } from "../storage/userConfig";

// import {
//   ContentCard,
//   ContentCardPaper,
// } from "../components/Content/ContentCards";

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

  paper1: {
    // width: "100%",
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6.5),
      paddingRight: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  paper2: {
    // width: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6.5),
      paddingRight: theme.spacing(2),
    },
  },

  AddEditBtn: {
    marginTop: theme.spacing(2.5),
  },

  compCardLine: {
    marginBottom: theme.spacing(6.3),
  },

  BtnsTypo: {
    fontWeight: theme.typography.fontWeightBold,
  },
  avatar2: {
    width: theme.spacing(9.3),
    height: theme.spacing(9.3),

    // [theme.breakpoints.between('sm', 'xl')]: {
    //    width: theme.spacing(5.75),
    //    height: theme.spacing(5.75),
    // },
  },

  titleTypo: {
    fontSize: "24px",
  },

  numberOfCommTypo: {
    fontSize: "16px",
    color: "grey",
  },

  labelTypo: {
    fontSize: "34px",
    color: "grey",
  },

  divForm: {
    marginBottom: theme.spacing(2),
  },

  buttons: {
    [theme.breakpoints.between("xs", "sm")]: {
      marginRight: theme.spacing(3),
    },

    marginRight: theme.spacing(4.5),
  },
  createPortoLayout: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    padding: theme.spacing(2),

    width: "auto",
    [theme.breakpoints.up("md")]: {
      marginInline: theme.spacing(40),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Portfolio(props) {
  const [isOpen, setIsOpen] = useState(false);
  const portoId = userConfigVar().portfolio.id;
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  // const user = useContext(AuthContext);
  // check if he has porfolio
  const classes = useStyles();
  // const [Companies, setCompanies] = useState([]);

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
  };

  const { data, error, loading, networkStatus } = useQuery(PORTFOLIO_GQL, {
    variables: {
      portoId: portoId,
    },
    skip: portoId === "",
  });
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <CircularProgress />;
  if (error) return <Redirect to="/404" />;

  // const img = "avatars/7.jpg";
  const Followers = (FollowersDocs) => (
    <ContentCardPaper
      data={FollowersDocs}
      limit={6}
      auther
    />
  );

  const CompanyHeader = () => {
    return (
      <div className={classes.rootCom}>
        {/* Compnany line + 2 Content cards  */}

        <Paper className={classes.paper1}>
          <Grid container direction="column">
            {/* Company Line */}

            <CompanyCardLine data={data.getCompanies} />

            <Grid item xs>
              <BigCompanyCardTable
                data={data.getPortfolio.followedCompanies}
                limit={4}
                minWidth={400}
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              alignItems
              justify="flex-end"
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  value="Create Portfolio"
                  className={classes.AddEditBtn}
                  startIcon={<CreateIcon />}
                  onClick={togglePopup}
                >
                  Edit
                </Button>
              </Grid>
              {isOpen && (
                <Popup
                  content={
                    <>
                      <EditFormport portoId={portoId}></EditFormport>
                    </>
                  }
                  handleClose={togglePopup}
                />
              )}
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper2}>
          <Grid
            container
            direction="column"
            // alignItems
            // justify='flex-end'
          >
            <Grid
              item
              container
              direction="row"
              // alignItems
              // justify='flex-end'
              xs
            >
              <Grid item>
                {" "}
                <Button className={classes.buttons} variant="contained">
                  <Typography className={classes.BtnsTypo}>Latest</Typography>
                </Button>
              </Grid>
              <Grid item>
                {" "}
                <Button className={classes.buttons} variant="contained">
                  <Typography className={classes.BtnsTypo}>Articles</Typography>
                </Button>
              </Grid>

              <Grid item>
                {" "}
                <Button className={classes.buttons} variant="contained">
                  <Typography className={classes.BtnsTypo}>News</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Typography className={classes.labelTypo}>Articles</Typography>
            </Grid>

            <Grid item>{Followers(data.getPortfolio.relatedArticles)}</Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  if (portoId === "") {
    return (
      <div className={classes.rootCom}>
        <Paper className={classes.createPortoLayout}>
          <p>Please create a portfolio</p>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              value="Create Portfolio"
              className={classes.AddEditBtn}
              startIcon={<CreateIcon />}
              onClick={togglePopup}
            >
              Create Portfolio
            </Button>
          </Grid>
          {isOpen && (
            <Popup
              content={
                <>
                  <InputFormPort></InputFormPort>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </Paper>
      </div>
    );
  } else {
    return (
      <div>
        <Grid item>{CompanyHeader()}</Grid>
      </div>
    );
  }
}

export default Portfolio;

export function ArticlesForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.divForm}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {/* // User Avatar  */}
        <Grid item>
          <Avatar
            className={classes.avatar2}
            alt={props.name}
            src={props.avatar}
          />
        </Grid>

        {/* // User info  */}
        <Grid
          item
          xs="8"
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="column"
        >
          <Grid item>
            {" "}
            <Typography className={classes.titleTypo} variant="subtitle1">
              {props.title}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
          >
            <Grid item>
              <Typography
                className={classes.numberOfCommTypo}
                variant="subtitle2"
              >
                {props.editors}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className={classes.numberOfCommTypo}
                variant="subtitle2"
              >
                {props.numberOfComm}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
    </div>
  );
}
