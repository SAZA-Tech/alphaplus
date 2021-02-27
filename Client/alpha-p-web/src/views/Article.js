import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { ArticleAutherInfo } from "../components/AnalystInfo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },
  title: {
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  body: {
    padding: "2%",
  },
}));

const img = "avatars/7.jpg";
const analystInfo = {
  name: "jhon doe",
  img: img,
  bio: "Analyst",
};

const Article = (props) => {
  return (
    <div className="background">
      <div className="ArticlePage">
        <ArticleSection />
      </div>
    </div>
  );
};

Article.propTypes = {};

export default Article;

const ArticleSection = (props) => {
    const classes = useStyles();
  return (
    <Container>
      <Paper elevation={2}>
        <ArticleAutherInfo
          img={analystInfo.img}
          name={analystInfo.name}
          bio={analystInfo.bio}
        />
        {/* Title + Body Container */}
        <Container>
          {/* Title  */}
          <Container className={classes.title}>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="space-between"
              alignItems="baseline"
            >
              <Grid item>
                <h1>First Article on alpha+</h1>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs>
                  <Typography variant="caption">
                    Published 17 Feb, 2021
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="caption">
                    last updated feb 19 2021
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          {/* Body */}
          <Container className={classes.body}>
            <Typography variant="body1">{body}</Typography>
          </Container>
        </Container>
      </Paper>
    </Container>
  );
};

ArticleSection.propTypes = {};

const body =
  "Summary\n\nBoth Tilray and Aphria have seen 200% stock surges in just days from Reddit-style buying.\n\nThe 'blue wave' will help cannabis companies as federal legalization will open up new markets internally in the United States.\n\nRevenues and earnings for both companies are muted compared to the growth of other companies in the same sector.\n\nStock prices do not reflect potential growth of revenue and earnings for either of these companies.\n\nA couple of weeks ago, I reviewed the Tilray (TLRY) and Aphria (APHA) merger. I was neutral on the deal simply because although there would be potential cost savings, the stock price had already achieved a rational valuation based upon what could be earned. Since then, the stock has caught fire and shot up sharply. I received many messages from readers asking what I thought and if I still maintained my neutral position.\n\n\n\nYes, I will always be a ‘neutral’ on a stock that is overvalued.\n\n\n\nI felt the valuations were too rich before and now both stocks are up significantly.\n\n\n\nBut, there have been fundamental changes since that last review I did so I wanted to take another look at what has transpired.";
