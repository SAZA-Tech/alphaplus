import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';

import Typography from "@material-ui/core/Typography";
import { HomeCard } from "./Home";
import {
  Button,
  Grid,
  Paper,
  Avatar,
  Divider
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";

import {
  CompanyCardLine,
  BigMiniCompanyCardTable,
} from "../components/Company/CompanyCard";
import { Height } from "@material-ui/icons";


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
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6.5),
      paddingRight: theme.spacing(2),

    },
  },

  paper2: {
    // width: "100%",

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

    fontWeight: theme.typography.fontWeightBold



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

    fontSize: '24px'
  },

  numberOfCommTypo: {
    fontSize: '16px',
    color: 'grey'

  },

  labelTypo: {

    fontSize: "34px",
    color: 'grey'

  },

  divForm:{

   marginBottom:theme.spacing(2),


  }



}));


const img = "avatars/7.jpg";

const FollowersDocs = [
  {

    avatar: img,
    title:
      "Amazon And Disney Move Sports Streaming Down The Field As NFL Finalizes New Deals",
    editors: "Editors' PickScott Galloway",
    numberOfComm: "18 Comments"
  },
  {
    avatar: img,
    title:
      "Amazon And Disney Move Sports Streaming Down The Field As NFL Finalizes New Deals",
    editors: "Editors' PickScott Galloway",
    numberOfComm: "18 Comments"
  },
  {
    avatar: img,
    title:
      "Amazon And Disney Move Sports Streaming Down The Field As NFL Finalizes New Deals",
    editors: "Editors' PickScott Galloway",
    numberOfComm: "18 Comments"
  },
  {
    avatar: img,
    title:
      "Amazon And Disney Move Sports Streaming Down The Field As NFL Finalizes New Deals",
    editors: "Editors' PickScott Galloway",
    numberOfComm: "18 Comments"
  },
  {
    avatar: img,
    title:
      "Amazon And Disney Move Sports Streaming Down The Field As NFL Finalizes New Deals",
    editors: "Editors' PickScott Galloway",
    numberOfComm: "18 Comments"
  },
];














function Portfolio() {
  const classes = useStyles();

  const Followers = (FollowersDocs) =>
    FollowersDocs.map((v) => (
      <FollowerFollowingForm editors={v.editors} numberOfComm={v.numberOfComm} title={v.title} avatar={v.avatar} />
    ));

  return (

    <div className={classes.rootCom}>
      {/* Compnany line + 2 Content cards  */}

      <Paper className={classes.paper1}>
        <Grid container direction="column">
          {/* Company Line */}

          <CompanyCardLine data={companydummyData} />

          <Grid item>
            <BigMiniCompanyCardTable data={BigsimilarCompanydummyData} limit={4} />
          </Grid>
          <Grid item
            container
            direction="row"
            alignItems
            justify='flex-end'
            spacing='1'
          >
            <Grid item>
              <Button
                variant="contained"
                color='secondary'
                // style={{color:""}}
                className={classes.AddEditBtn}
                startIcon={<CreateIcon />}
              >
                Edit Portfolio
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color='primary'

                className={classes.AddEditBtn}
                startIcon={<AddIcon />}
              >
                Add Company
              </Button>
            </Grid>




          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper2}>

        <Grid
          container
          direction="column"
          // alignItems
          // justify='flex-end'
          spacing='2'
        >


          <Grid item
            container
            direction="row"
            // alignItems
            // justify='flex-end'
            spacing='4'
          >
            <Grid item> <Button variant="contained" ><Typography className={classes.BtnsTypo}>Latest</Typography></Button></Grid>
            <Grid item> <Button variant="contained" ><Typography className={classes.BtnsTypo}>Articles</Typography></Button></Grid>

            <Grid item> <Button variant="contained" ><Typography className={classes.BtnsTypo}>News</Typography></Button></Grid>
            <Grid item> <Button variant="contained" ><Typography className={classes.BtnsTypo}>Analyst</Typography></Button></Grid>

          </Grid>

          <Grid item>

            <Typography className={classes.labelTypo}>Articles</Typography>



          </Grid>




          <Grid item>

            {Followers(FollowersDocs)}



          </Grid>


        </Grid>






      </Paper>
    </div>


  )
}

export default Portfolio;






export function FollowerFollowingForm(props) {
  const classes = useStyles();
  return (
      <div className={classes.divForm}>
    <Grid
      spacing={3}
      container
      direction="row"
      justify='flex-start'
      alignItems='center'
    >
      {/* // User Avatar  */}
      <Grid item  >
        <Avatar className={classes.avatar2} alt={props.name} src={props.avatar} />
      </Grid>

      {/* // User info  */}
      <Grid item xs='8' container alignItems='flex-start' justify='flex-start' direction="column" spacing={0}>

        <Grid item> <Typography className={classes.titleTypo} variant="subtitle1">
          {props.title}
        </Typography>
        </Grid>

        <Grid item container alignItems='flex-start' justify='flex-start' direction="row" spacing={2}>

          <Grid item>
            <Typography className={classes.numberOfCommTypo} variant="subtitle2">
              {props.editors}
            </Typography>

          </Grid>

          <Grid item>
            <Typography className={classes.numberOfCommTypo} variant="subtitle2">
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




const BigsimilarCompanydummyData = [
  { Symbol: "AAPL", price: 293, change: +192, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "GOOG", price: 351, change: -122, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "AMZN", price: 120, change: +50, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "EBSY", price: 963, change: +124, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "MOZA", price: 56, change: -56, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "NANI", price: 123, change: +21, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "AAPL", price: 293, change: +192, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "GOOG", price: 351, change: -122, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "AMZN", price: 120, change: +50, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "EBSY", price: 963, change: +124, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "MOZA", price: 56, change: -56, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
  { Symbol: "NANI", price: 123, change: +21, changePerce: ' 20%', volume: '10M', avgVolume: '10.10M', prevClose: 44, open: 121 },
];

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
