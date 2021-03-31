import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  ButtonBase,
  Button,
  Avatar,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ShareIcon from "@material-ui/icons/Share";
import AddCommentIcon from "@material-ui/icons/AddComment";
import {
  ArticleAutherInfo,
  ArticleAutherInfoExpanded,
} from "../../components/AnalystInfo";
import { useParams } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../../graphql/Content/articleGql";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
  },
  articleLayout: {
    paddingTop: theme.spacing(5),
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(40),
      marginRight: theme.spacing(40),
    },
  },
  analystInfoSection: {
    marginTop: theme.spacing(4),
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  body: {
    padding: theme.spacing(2),
  },
  likeBtn: {
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.9),
    },
  },
  commentsLayout: {
    marginTop: theme.spacing(5),
  },
  commentsHeader: {
    padding: theme.spacing(4),
    color: theme.palette.grey[400],
  },
  addComment: {
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    "& .MuiTextField-root": {
      width: "60ch",
      padding: theme.spacing(4),
      paddingTop: theme.spacing(1),
      borderTopLeftRadius: 0,
    },
  },
  comment: {
    padding: theme.spacing(2),
    "& .MuiAvatar-root": {
      marginRight: theme.spacing(2),
    },
    "& .MuiDivider-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiGrid-root": {
      marginBottom: theme.spacing(2),
    },
    "& .commentBody": {
      paddingBottom: theme.spacing(2),
    },
  },
  commentBtn: {
    paddingTop: theme.spacing(4),
  },
}));

const img = "avatars/7.jpg";
const analystInfo = {
  name: "jhon doe",
  img: img,
  bio: "Analyst",
};
const commentsDocs = [
  {
    name: "Alex",
    Avatar: "AL",
    date: "2021-2-21",
    body: "Great Article",
  },
  {
    name: "Ziad",
    Avatar: "ZI",
    date: "2021-2-22",
    body: "I dissagree , there should not be any downsides",
  },
  {
    name: "Mohammed",
    Avatar: "MO",
    date: "2021-2-24",
    body: "Please keep up the good work",
  },
];

const Article = (props) => {
  const classes = useStyles();
  let { articleId } = useParams();
  const { loading, data, error } = useQuery(GET_ARTICLE, {
    onCompleted(data) {
      console.log(data.getArticle.articleTitle);
    },
    variables: {
      articleId: articleId,
    },
    onError(err) {
      console.log(`Error Happend ${err}`);
    },
  });
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="background">
      <div className={classes.articleLayout}>
        <ArticleSection
          title={data.getArticle.articleTitle}
          body={data.getArticle.articleBody}
          auther={data.getArticle.articleAuthor}
        />

        <CommentsSection
          commentCount={data.getArticle.commentCount}
          cooments={data.getArticle.articleComments}
        />
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
          img={props.auther.img}
          name={props.auther.name}
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
                <h1>{props.title}</h1>
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
            <div dangerouslySetInnerHTML={{ __html: props.body }} />
          </Container>
          <Divider variant="middle" />
          {/* Article Buttons */}
          <Container>
            <Grid container justify="space-evenly" spacing={2} xs sm>
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<ThumbUpAltOutlinedIcon />}
                >
                  Like the article?
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<ShareIcon />}
                >
                  Share the article
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddCommentIcon />}
                >
                  Add Comment
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Paper>
      <Paper elevation={2} className={classes.analystInfoSection}>
        <ArticleAutherInfoExpanded
          img={analystInfo.img}
          name={analystInfo.name}
          bio={analystInfo.bio}
        />
      </Paper>
    </Container>
  );
};

ArticleSection.propTypes = {};

function CommentsSection(props) {
  const classes = useStyles();
  const comments = (commentsDocs) =>
    commentsDocs.map((v) => (
      <CreateComment
        name={v.name}
        body={v.body}
        date={v.date}
        avatar={v.Avatar}
      />
    ));

  return (
    <Container className={classes.commentsLayout}>
      <Paper elevation={2}>
        <Container>
          <Container className={classes.commentsHeader}>
            <Typography variant="h4">Comments(2)</Typography>
          </Container>
          <Container className={classes.addComment}>
            <form>
              <Avatar>OP</Avatar>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="add your comment.."
                variant="outlined"
              />
              <Button variant="contained" color="primary">
                Publish
              </Button>
            </form>
          </Container>
          <Container>{comments(commentsDocs)}</Container>
        </Container>
      </Paper>
    </Container>
  );
}

const CreateComment = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.comment}>
      <Divider />
      <Grid container direction="row" justify="space-between">
        <Grid item container xs={4} sm>
          <Avatar>{props.avatar}</Avatar>
          <Typography variant="subtitle1">{props.name}</Typography>
        </Grid>
        <Typography variant="caption">{props.date}</Typography>
      </Grid>
      <Container className="commentBody">
        <Typography variant="body2">{props.body}</Typography>
      </Container>
      <Container className={classes.commentBtn}>
        <Button startIcon={<ReplyIcon />}>Reply</Button>
        <Button startIcon={<ThumbUpAltOutlinedIcon />}>Like</Button>
      </Container>
    </Container>
  );
};

CreateComment.propTypes = {};

const body =
  "Summary\n\nBoth Tilray and Aphria have seen 200% stock surges in just days from Reddit-style buying.\n\nThe 'blue wave' will help cannabis companies as federal legalization will open up new markets internally in the United States.\n\nRevenues and earnings for both companies are muted compared to the growth of other companies in the same sector.\n\nStock prices do not reflect potential growth of revenue and earnings for either of these companies.\n\nA couple of weeks ago, I reviewed the Tilray (TLRY) and Aphria (APHA) merger. I was neutral on the deal simply because although there would be potential cost savings, the stock price had already achieved a rational valuation based upon what could be earned. Since then, the stock has caught fire and shot up sharply. I received many messages from readers asking what I thought and if I still maintained my neutral position.\n\n\n\nYes, I will always be a ‘neutral’ on a stock that is overvalued.\n\n\n\nI felt the valuations were too rich before and now both stocks are up significantly.\n\n\n\nBut, there have been fundamental changes since that last review I did so I wanted to take another look at what has transpired.";
