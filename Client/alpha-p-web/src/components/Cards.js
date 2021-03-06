import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Button } from "@material-ui/core";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
    topContainer: {
    fontStyle: "oblique",
    color: "red",
    fontSize: "30px",
    border: "none"
    
     
  },
  textStyle: {
    color: "red"
    
  },
  root: {
    minWidth: 275,
    // padding: '50px 250px',
    height: 400,
    width: "100%", 
    // borderTop: 5,
    // border: 0,
    borderRadius: 5,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
}));



export default function Home(){
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
    <Card className={classes.root} variant="h1" width="100%">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );
}
