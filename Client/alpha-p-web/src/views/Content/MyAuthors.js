import React, {  useState } from "react";
import {  Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_DRAFTS } from "../../graphql/Content/draftsGql";
import { makeStyles } from "@material-ui/core/styles";
import { ContentCard } from "../../components/Content/ContentCards";
// import { AuthContext } from "../../context/auth";
import { GET_ARTICLES } from "../../graphql/Content/articleGql";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 0,
    padding: theme.spacing(2),
  },
  Section: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
    },
  },
  titleSection: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));
export function MyAuthors(props) {
  const classes = useStyles();

  // const context = useContext(AuthContext);
  const [drafts, setDrafts] = useState([]);
  const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   console.log(`Drafts are Fetched`);
  // }, [state.drafts]);
  const params = props.match.params.username;
  const { loading: draftFetchingLoading } = useQuery(GET_DRAFTS, {
    onCompleted(data) {
      setDrafts(data.getDrafts);
      console.log(`Drafts length ${drafts.length}`);
    },
    variables: {
      autherId: params,
    },
    onError(error) {
      console.log(`F}ailed to fetch drafts : ${error}`);
    },
  });
  const { loading: articlesFethcingLoading } = useQuery(GET_ARTICLES, {
    onCompleted(data) {
      setArticles(data.getArticles);
      console.log(`Articles length ${articles.length}`);
    },
    variables: {
      userId: params,
    },
    onError(error) {
      console.log(`F}ailed to fetch articles : ${error}`);
    },
  });
  const articlesSection = () => {
    return articlesFethcingLoading ? (
      <CircularProgress />
    ) : (
      <Container className={classes.Section}>
        <Card>
          <Container>
            <Typography variant="h4" className={classes.titleSection}>
              My Articles{" "}
            </Typography>
          </Container>
          <Container>
            <List>
              {articles.map((e) => {
                return (
                  <ListItem>
                    <ContentCard
                      title={e.articleTitle}
                      link={`/article/${e.id}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Container>
        </Card>
      </Container>
    );
  };
  const draftSection = () => {
    return draftFetchingLoading ? (
      <CircularProgress />
    ) : (
      <Container className={classes.Section}>
        <Card>
          <Container>
            <Typography variant="h4" className={classes.titleSection}>
              My Drafts
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/draft/new"
            >
              Create New Draft
            </Button>
          </Container>
          <Container>
            <List>
              {drafts.map((e) => {
                return (
                  <ListItem>
                    <ContentCard
                      crudOtin
                      title={e.draftName}
                      link={`/draft/${e.id}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Container>
        </Card>
      </Container>
    );
  };
  return (
    <Container>
      <Grid>
        <Grid item>{articlesSection()}</Grid>
        <Grid item>{draftSection()}</Grid>
      </Grid>
    </Container>
  );
}
