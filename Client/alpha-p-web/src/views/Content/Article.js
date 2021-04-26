import { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  // ButtonBase,
  Button,
  Avatar,
  TextField,
  // FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import moment from "moment";
import ReplyIcon from "@material-ui/icons/Reply";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ShareIcon from "@material-ui/icons/Share";
// import AddCommentIcon from "@material-ui/icons/AddComment";
import {
  ArticleAutherInfo,
  ArticleAutherInfoExpanded,
} from "../../components/AnalystInfo";
import { useParams, Redirect } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ARTICLE, GET_COMMENTS } from "../../graphql/Content/articleGql";
import { ADD_COMMENT } from "../../graphql/Content/commentGql";
import { useLike } from "../../util/hooks";

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
    "& img": {
      width: "100%",
    },
  },
  analystInfoSection: {
    marginTop: theme.spacing(4),
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    overflowWrap: "anywhere",
  },
  body: {
    padding: theme.spacing(2),
    overflowWrap: "anywhere",
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
    paddingRight: theme.spacing(1),
    width: "90%",
    "& .MuiTextField-root": {
      width: "100%",
      padding: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
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
  bio:
    "This a logn bio from the user and should give a breif about the user prsonality",
};
// const commentsDocs = [
//   {
//     name: "Alex",
//     Avatar: "AL",
//     date: "2021-2-21",
//     body: "Great Article",
//   },
//   {
//     name: "Ziad",
//     Avatar: "ZI",
//     date: "2021-2-22",
//     body: "I dissagree , there should not be any downsides",
//   },
//   {
//     name: "Mohammed",
//     Avatar: "MO",
//     date: "2021-2-24",
//     body: "Please keep up the good work",
//   },
// ];

const Article = (props) => {
  const classes = useStyles();
  let { articleId } = useParams();
  // console.log(articleId);
  const { loading: articleFetchingLoading, data, error } = useQuery(
    GET_ARTICLE,
    {
      variables: {
        articleId: articleId,
      },
      onError(err) {
        console.log(`Error Happend ${err}`);
      },
    }
  );
  if (error) return <Redirect to="404" />;
  return articleFetchingLoading ? (
    <CircularProgress />
  ) : (
    <div className={classes.articleLayout}>
      <ArticleSection
        id={articleId}
        title={data.getArticle.articleTitle}
        body={data.getArticle.articleBody}
        auther={data.getArticle.articleAuthor}
        isLiked={data.getArticle.isLiked}
        updatedAt={data.getArticle.updatedAt}
        createdAt={data.getArticle.createdAt}
      />

      <CommentsSection
        commentCount={data.getArticle.commentCount}
        cooments={data.getComments}
      />
    </div>
  );
};

Article.propTypes = {};

export default Article;

const ArticleSection = (props) => {
  const classes = useStyles();
  const { toggleLike, liked } = useLike(props.id, props.isLiked);
  return (
    <Container>
      <Paper elevation={2}>
        <ArticleAutherInfo
          img={props.auther.img}
          name={props.auther.username}
          userId={props.auther.id}
          isFollowed={props.auther.isFollowed}
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
                    {moment(props.createdAt).fromNow()}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="caption">
                    {moment(props.updatedAt).fromNow()}
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
            <Grid container justify="space-between" spacing={4} xs sm>
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={
                    liked ? (
                      <ThumbUpAltRoundedIcon />
                    ) : (
                      <ThumbUpAltOutlinedIcon />
                    )
                  }
                  onClick={toggleLike}
                >
                  {liked ? "Liked" : "Like the article?"}
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
              {/* <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddCommentIcon />}
                >
                  Add Comment
                </Button>
              </Grid> */}
            </Grid>
          </Container>
        </Container>
      </Paper>
      <Paper elevation={2} className={classes.analystInfoSection}>
        <ArticleAutherInfoExpanded
          img={props.auther.img}
          name={props.auther.name}
          username={props.auther.username}
          bio={analystInfo.bio}
          isFollowed={props.auther.isFollowed}
          userId={props.auther.id}
        />
      </Paper>
    </Container>
  );
};

ArticleSection.propTypes = {};

function CommentsSection(props) {
  const { user } = useContext(AuthContext);

  let { articleId } = useParams();
  const [errors, setErrors] = useState({});
  const [commentBody, setCommentBody] = useState("");
  const classes = useStyles();
  const comments = (commentsDocs) =>
    commentsDocs.map((v) => (
      <CreateComment
        name={v.commentAuthor.username}
        body={v.commentBody}
        date={v.createdAt}
        avatar={v.commentAuthor.img}
        userId={v.commentAuthor.id}
      />
    ));
  const [addComment, { laoding: commentLoading }] = useMutation(ADD_COMMENT, {
    variables: {
      autherId: !user ? "undefind" : user.id,
      articleId: articleId,
      commentBody: commentBody,
    },
    update(cache, { data: { addComment: newComment } }) {
      cache.writeQuery({
        query: GET_COMMENTS,
        variables: {
          articleId,
        },
        data: [...props.comments, newComment],
      });
    },
    // onCompleted(data) {
    //   window.location.reload();
    // },
    onError(err) {
      console.log(`Error on ${err}`);
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
  });
  function onCommentChange(value) {
    setCommentBody(value.target.value);
  }
  function addCommentCall() {
    if (commentBody.trim() !== "") addComment();
  }
  return (
    <Container className={classes.commentsLayout}>
      <Paper elevation={2}>
        <Container>
          <Container className={classes.commentsHeader}>
            <Typography variant="h4">Comments({props.commentCount})</Typography>
          </Container>
          <Container className={classes.addComment}>
            <form onSubmit={addCommentCall}>
              <Avatar>OP</Avatar>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="add your comment.."
                variant="outlined"
                value={commentBody}
                error={Object.keys(errors).length > 0}
                onChange={onCommentChange}
                disabled={!user}
              />
              {commentLoading ? (
                <CircularProgress />
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Publish
                </Button>
              )}
            </form>
          </Container>
          <Container>{comments(props.cooments)}</Container>
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
          <Avatar>
            {props.avatar == null ? props.name.split(2) : props.avatar}
          </Avatar>
          <Typography
            variant="subtitle1"
            component={RouterLink}
            style={{ textDecoration: "none", color: "black" }}
            to={`/userProfile/${props.userId}`}
          >
            {props.name}
          </Typography>
        </Grid>
        <Typography variant="caption">
          {moment(props.date).fromNow()}
        </Typography>
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
CreateComment.defaultProps = {
  userId: "undefind",
};
CreateComment.propTypes = {
  userId: PropTypes.string.isRequired,
};
