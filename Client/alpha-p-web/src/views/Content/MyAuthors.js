import React, { useContext, useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
  titleSection:{
      padding:theme.spacing(2),
      marginLeft:theme.spacing(2)
  }
}));
export function MyAuthors(props) {
  const classes = useStyles();

  const context = useContext(AuthContext);
  const [state, setState] = useState({
    drafts: [],
  });
  const params = props.match.params.username;
  const { loading } = useQuery(GET_DRAFTS, {
    onCompleted(data) {
      setState({
        drafts: data.getDrafts,
      });
    },
    variables: {
      id: context.user.id,
    },
  });

  const draftSection = () => {
    return loading ? (
      <CircularProgress />
    ) : (
      <Container className={classes.Section}>
        <Card>
          <Typography variant="h4" className={classes.titleSection}>
            My Drafts
          </Typography>

          <List>
            {state.drafts.map((e) => {
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
        </Card>
      </Container>
    );
  };
  return <Container>{draftSection()}</Container>;
}
