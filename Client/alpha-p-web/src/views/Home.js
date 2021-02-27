import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { red, white } from "@material-ui/core/colors";
import { Button, Grid } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Height } from "@material-ui/icons";
import { borders } from '@material-ui/system';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topContainer: {
  fontStyle: "oblique",
  color: "red",
  fontSize: "30px",
  border: "none"
  
   
},
rootCom: {
  minWidth: 275,
  // padding: '50px 250px',
  height: 400,
  width: "98.5%", 
  // borderTop: 5,
  // border: 0,
  borderRadius: 5,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
},
rootAna: {
  minWidth: 275,
  // padding: '50px 250px',
  height: 400,
  width: "45%", 
  // borderTop: 5,
  // border: 0,
  borderRadius: 5,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left', 
},

titleCom: {
  fontSize: 43,
},
titleAna: {
  fontSize: 24,
  marginLeft: theme.spacing(1),
},
pos: {
  marginBottom: 12,
},
LearnMoreCommunity: {
  // marginBottom: theme.spacing(10),
  margin: theme.spacing(30, 30, 30),

},
}));


export default function Home(){
  const classes = useStyles();
  return (
    <div className='background'>
    <Card className={classes.rootCom} variant="h1">
      <CardContent>
        <Typography className={classes.titleCom} color="textSecondary" gutterBottom>
          Community
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary" className={classes.LearnMoreCommunity}>Learn More</Button>
      </CardActions>
    </Card>
    <Grid>
    <Card className={classes.rootAna} variant="h1">
      <CardContent>
        <Typography className={classes.titleAna} color="textSecondary" gutterBottom>
          Trending Analysis
        </Typography>
      </CardContent>
    </Card>

    <Card className={classes.rootAna} variant="h1">
      <CardContent>
        <Typography className={classes.titleAna} color="textSecondary" gutterBottom>
          Latest News
        </Typography>
      </CardContent>
    </Card>
    </Grid>

    <Card className={classes.rootCom} variant="h1">
      <CardContent>
        <Typography className={classes.titleCom} color="textSecondary" gutterBottom>
          Portfolilo
        </Typography>
       
      </CardContent>
    </Card>
    </div>
  );
}

// const Home = () => {
//   return (
//     <div className='background'> 
//       <Grid container spacing={2} >
//         <Grid item xs = {10} lg={10} style={{ width: "100%"}}>
//           <Cards />
//           <Card>
//             <Grid>
//               kkokk
//             </Grid>
//           </Card>
//         </Grid>
//         {/* <Grid item xs={5}>
//           <Cards />
//         </Grid> */}
//       </Grid>
//     </div>
//   );
// };

// export default Home;
