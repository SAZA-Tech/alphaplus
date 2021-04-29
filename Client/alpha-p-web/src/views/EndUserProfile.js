import React from "react";
import { UserInfo, FollowerFollowingForm } from "../components/UserInfo";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { HomeCard } from "./Home";
import {
  List,
  ListItemText,
  Grid,
  Tabs,
  Divider,
  Typography,
  IconButton,
  Container,
  Tab,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { Redirect, useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { PROFILE_GQL } from "../graphql/Auth/authGql";
import CommentComponentBody from "../components/Content/CommentComponents";

const img = "avatars/7.jpg";
const userInfo = {
  name: "Jhon Doe",
  img: img,
  bio: "Analyst",
};

// const contentdummyData1 = [
//   {
//     name: "jhon Doe",
//     img: "Jh",
//     title: "This a test dummy title",
//     bio: "18 comments",
//   },
//   {
//     name: "Ziad Fnan",
//     img: "Zi",
//     title: "Don't Miss This intersting analyst",
//     bio: "18 comments",
//   },
//   {
//     name: "Abo Motlaq",
//     img: "AH",
//     title: "I only love apple products",
//     bio: "18 comments",
//   },
//   {
//     name: "Aziz Amir",
//     img: "AA",
//     title: "Play it cool with your stocks",
//     bio: "18 comments",
//   },
//   {
//     name: "Saleh Mogren",
//     img: "SM",
//     title: "How to write dummy data like a pro",
//     bio: "18 comments",
//   },
// ];

// const contentdummyData2 = [
//   {
//     name: "jhon Doe",
//     img: "Jh",
//     title: "This a test dummy title",
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Ziad Fnan",
//     img: "Zi",
//     title: "Don't Miss This intersting analyst",
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Abo Motlaq",
//     img: "AH",
//     title: "I only love apple products",
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Aziz Amir",
//     img: "AA",
//     title: "Play it cool with your stocks",
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Saleh Mogren",
//     img: "SM",
//     title: "How to write dummy data like a pro",
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
// ];

// const FollowersDocs = [
//   {
//     name: "Alex",
//     avatar: img,
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Ziad",
//     avatar: img,
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
//   {
//     name: "Mohammed",
//     avatar: img,
//     bio:
//       "Contributor long only, Growth, registered investment advisor, investment advisor",
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    // background: theme.palette.grey[400],
  },

  paper1: {
    width: theme.spacing(21),
    // height: theme.spacing(14),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(13.5),
      height: theme.spacing(21.5),
      padding: theme.spacing(0.5),
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(17),
      height: theme.spacing(29),
      padding: theme.spacing(1.5),
      marginRight: theme.spacing(2),
    },
  },

  paper2: {
    // width: "100%",
    padding: theme.spacing(3),

    [theme.breakpoints.between("sm", "md")]: {
      width: theme.spacing(72),
    },
    [theme.breakpoints.between("md", "xl")]: {
      padding: theme.spacing(1),
      width: theme.spacing(105),
    },
  },

  typogrAboutMe: {
    // width: "auto",
    // height: "auto",
    marginTop: theme.spacing(0.8),
    // fontSize: "14px",
    // fontStyle: "normal",
    // fontWeight: "400",
    // marginLeft: theme.spacing(2),
    textAlign: "left",

    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "25px",
      marginTop: theme.spacing(1.25),
    },

    [theme.breakpoints.between("md", "xl")]: {
      marginTop: theme.spacing(2.75),
      marginBottom: theme.spacing(0.5),
      fontSize: "34px",
    },
  },

  typogrText: {
    // marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(0.75),
    marginTop: theme.spacing(1),
    width: "100%",
    height: "auto",
    // fontSize: "12px",
    // fontStyle: "normal",
    // fontWeight: "400",
    textAlign: "left",

    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "18.5px",
      width: "auto",
    },

    [theme.breakpoints.between("md", "xl")]: {
      width: "auto",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      fontSize: "24px",
    },
  },

  iconstyle: {
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "xx-large",
    },

    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "medium",
    },
  },

  typogrLabel: {
    [theme.breakpoints.between("xs", "sm")]: {
      //  fontSize: theme.typography.fontSize*0.3,
    },
  },
}));

const EndUserProfile = (props) => {
  const classes = useStyles();
  const { userId } = useParams();
  console.log(userId);
  const { data, error, loading } = useQuery(PROFILE_GQL, {
    variables: {
      id: userId,
    },
  });
  if (error) {
    console.log(error);
    return <Redirect to="404" />;
  }
  if (loading) return <CircularProgress />;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <Paper className={classes.paper1} elevation={2}>
            <UserInfo
              id={userId}
              img={userInfo.img}
              name={data.findUser.name}
              bio={userInfo.bio}
              userId={data.findUser.id}
              isFollowed={data.findUser.isFollowed}
            />
          </Paper>
        </Grid>

        <Grid item xs sm md lg={8}>
          <Paper className={classes.paper2} elevation={2}>
            <UserProfileDetails
              name={data.findUser.name}
              followers={data.findUser.followers}
              following={data.findUser.following}
              comments={data.getComments}
              articles={data.getArticles}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

EndUserProfile.propTypes = {};

export default EndUserProfile;

// {
//   /* // UserProfileDetails(Bio+Icons+Tabs)  */
// }
export function UserProfileDetails(props) {
  // const state = useState();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Followers = (FollowersDocs) =>
    FollowersDocs.map((v) => (
      <FollowerFollowingForm
        name={v.name}
        bio={v.bio ? v.bio : "Default Bio"}
        avatar={v.avatar}
        userId={v.id}
        isFollowed={v.isFollowed}
      />
    ));

  const Following = (FollowersDocs) =>
    FollowersDocs.map((v) => (
      <FollowerFollowingForm
        name={v.name}
        bio={v.bio ? v.bio : "Default Bio"}
        avatar={v.avatar}
        userId={v.id}
        isFollowed={v.isFollowed}
      />
    ));

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      {/* // UserBio  */}
      <Grid item>
        <Typography className={classes.typogrAboutMe} variant="body1">
          ABOUT ME
        </Typography>
        <Typography
          className={classes.typogrText}
          style={{ color: "#4d4d4d" }}
          variant="subtitle1"
        >
          Contributor Since: 2021
        </Typography>

        <Typography className={classes.typogrText} variant="body1">
          Contributor long only, Growth, registered investment
          advisor,investment advisor
        </Typography>
      </Grid>

      {/* // UserSocialMediaAccounts  */}
      <Grid item xs container direction="row" justify="flex-end">
        <IconButton size="small">
          {" "}
          <TwitterIcon
            className={classes.iconstyle}
            style={{ color: "grey" }}
          />
        </IconButton>
        <IconButton size="small">
          {" "}
          <FacebookIcon
            className={classes.iconstyle}
            style={{ color: "grey" }}
          />
        </IconButton>
        <IconButton size="small">
          {" "}
          <LinkedInIcon
            className={classes.iconstyle}
            style={{ color: "grey" }}
          />
        </IconButton>
      </Grid>

      {/* // UserProfileTabs  */}
      <Grid item xs>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={
              <List>
                <ListItemText
                  primary={
                    <Typography className={classes.typogrLabel}>
                      Comments
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.typogrLabel}>
                      {props.comments.length}
                    </Typography>
                  }
                />
              </List>
            }
          />

          <Tab
            label={
              <List>
                <ListItemText
                  primary={
                    <Typography className={classes.typogrLabel}>
                      Followers
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.typogrLabel}>
                      {props.followers.length}
                    </Typography>
                  }
                />
              </List>
            }
          />

          <Tab
            label={
              <List>
                <ListItemText
                  primary={
                    <Typography className={classes.typogrLabel}>
                      Following
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.typogrLabel}>
                      {props.following.length}
                    </Typography>
                  }
                />
              </List>
            }
          />

          <Tab
            label={
              <List>
                <ListItemText
                  primary={
                    <Typography className={classes.typogrLabel}>
                      Articles
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.typogrLabel}>
                      {props.articles.length}
                    </Typography>
                  }
                />
              </List>
            }
          />

          <Tab
            label={
              <List>
                <ListItemText
                  primary={
                    <Typography className={classes.typogrLabel}>
                      Author’s Picks
                    </Typography>
                  }
                  secondary={
                    <Typography className={classes.typogrLabel}>500</Typography>
                  }
                />
              </List>
            }
          />
        </Tabs>
        <Container>
          <Divider variant="middle" />
        </Container>

        {value === 0 && (
          <Container>
            {props.comments.map((e) => (
              <CommentComponentBody
                body={e.commentBody}
                date={e.createdAt}
                name={props.name}
              />
            ))}
          </Container>
        )}
        {value === 1 && <Container>{Followers(props.followers)}</Container>}
        {value === 2 && <Container>{Following(props.following)}</Container>}
        {value === 3 && (
          <Container>
            {<HomeCard dataLimit={4} data={props.articles} btnText="More" />}
          </Container>
        )}
        {value === 4 && (
          <Container>
            {<HomeCard dataLimit={4} data={props.articles} btnText="More" />}
          </Container>
        )}
      </Grid>
    </Grid>
  );
}
