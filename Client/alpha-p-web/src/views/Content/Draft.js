import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "../../components/Editor";
import { Button, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";
import { CustomizedSnackbars } from "../../components/UI/messages";
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";
import {
  CREATE_DRAFT,
  EDIT_DRAFT,
  GET_DRAFT,
} from "../../graphql/Content/draftsGql";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import { func } from "prop-types";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  publishBtn: {
    backgroundColor: theme.palette.success.light,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),
  },
  saveBtn: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    color: theme.palette.common.white,
  },
}));

function Draft(props) {
  const classes = useStyles();

  // Check if new draft or editing existing draft with prams

  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { onSubmit } = useForm(actionDraftCallback, {});

  const [newDraft, setNewDraft] = useState(false);
  const [fetched, setFetched] = useState(false);

  let { draftId } = useParams();
  if (draftId == "new" && !newDraft) {
    setNewDraft(true);
  }
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [files, setFiles] = useState([]);
  const { loading: fetchLoading, data: fetchedData } = useQuery(GET_DRAFT, {
    variables: {
      draftId,
    },
    onCompleted(data) {
      setFetched(true);
      setTitle(fetchedData.getDraft.draftName);
      // setContent({
      //   body: fetchedData.getDraft.draftBody,
      // });
      setBody(fetchedData.getDraft.draftBody);
      console.log(`body`, fetchedData.getDraft.draftBody);
    },
    skip: newDraft || fetched,
  });

  // useEffect(() => {
  //   if (!fetchLoading && !fetched) {

  //   }
  // });
  const [createDraft, { loading: createLoading }] = useMutation(CREATE_DRAFT, {
    onError(err) {
      console.log(`Error on ${err}`);
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: {
      id: user.id,
      contentInput: {
        title,
        body,
      },
    },
    onCompleted(data) {
      console.log(`Draft is success ${data.createDraft.id}`);
      setSuccess(true);
      sleep(2000).then(() => props.history.push("/"));
    },
  });
  const [saveDraft, { loading: saveLoading }] = useMutation(EDIT_DRAFT, {
    onError(err) {
      console.log(`Error on ${err}`);
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: {
      id: user.id,
      draftID: draftId,
      contentInput: {
        title,
        body,
      },
    },
    onCompleted(data) {
      console.log(`Draft is Updated ${data.editDraft.id}`);
      setSuccess(true);
      sleep(2000).then(() => props.history.push("/"));
    },
  });
  function actionDraftCallback() {
    if (newDraft) createDraft();
    else saveDraft();
  }

  function onEditorChange(value) {
    setBody(value);
    // console.log(`New Body :${body}`);
  }
  const onTitleChange = (value) => {
    setTitle(value.target.value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  const buttons = () => {
    return newDraft ? (
      // Create Button For New Draft
      <Container>
        <Button
          size="large"
          variant="contained"
          className={classes.saveBtn}
          onClick={onSubmit}
        >
          Create
        </Button>
      </Container>
    ) : (
      <Container>
        {/* Save Draft 📝 */}
        <Button
          size="large"
          variant="contained"
          className={classes.saveBtn}
          onClick={onSubmit}
        >
          Save
        </Button>
        {/* Publish Draft 📑 */}
        <Button size="large" variant="contained" className={classes.publishBtn}>
          Publish Draft
        </Button>
      </Container>
    );
  };
  return fetchLoading ? (
    <CircularProgress />
  ) : (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ alignItems: "center" }}>
        <TextField
          id="outlined-full-width"
          label="Draft Name"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={title}
          variant="outlined"
          onChange={onTitleChange}
        />{" "}
      </div>
      <Editor
        placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        body={fetched ? body : ""}
        onChange
        onFilesChange={onFilesChange}
      />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        {saveLoading | createLoading ? <CircularProgress /> : buttons()}
      </div>
      {success && (
        <div>
          <CustomizedSnackbars color="success" message="Draft is created" />;
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((value) => (
              <CustomizedSnackbars color="error" message={value} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Draft;
