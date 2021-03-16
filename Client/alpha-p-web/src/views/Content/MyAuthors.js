import React, { useContext, useState, useEffect } from "react";
import { useParams, Link as RouterLink, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Card,
  Typography,
  Divider,
  ButtonBase,
  Button,
  Avatar,
  TextField,
  FormHelperText,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_DRAFTS } from "../../graphql/Content/draftsGql";
import { fade, makeStyles } from "@material-ui/core/styles";
import { ContentCards } from "../../components/Content/ContentCards";
import { AuthContext } from "../../context/auth";
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

  const context = useContext(AuthContext);
  const [drafts, setDrafts] = useState([]);
  // useEffect(() => {
  //   console.log(`Drafts are Fetched`);
  // }, [state.drafts]);
  const params = props.match.params.username;
  const { loading, data, error } = useQuery(GET_DRAFTS, {
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

  const draftSection = () => {
    return loading ? (
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
              component={Link}
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
                    <ContentCards
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
  return <Container>{draftSection()}</Container>;
}
