import  {  useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "../../components/Editor";
import { Button, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {  makeStyles } from "@material-ui/core/styles";
import { CustomizedSnackbars } from "../../components/UI/messages";

// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";
import {
  CREATE_DRAFT,
  EDIT_DRAFT,
  GET_DRAFT,
  PUBLISH_DRAFT,
} from "../../graphql/Content/draftsGql";
import { useMutation,  useQuery } from "@apollo/client";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

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
  tagsInputStyle: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

function Draft(props) {
  const classes = useStyles();

  // Check if new draft or editing existing draft with prams

  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { onSubmit } = useForm(actionDraftCallback, {});
  const [startPublish, setPublish] = useState(false);
  const [newDraft, setNewDraft] = useState(false);
  const [fetched, setFetched] = useState(false);

  let { draftId } = useParams();
  if (draftId === "new" && !newDraft) {
    setNewDraft(true);
  }
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  // const [files, setFiles] = useState([]);
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
      setSuccessMessage("Draft is created");
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
      setSuccessMessage("Draft is Saveed");

      setSuccess(true);
      if (!startPublish)
        sleep(2000).then(() =>
          props.history.push(`/MyPosts/${data.editDraft.draftAuther.id}`)
        );
    },
  });
  const [publishDraft] = useMutation(PUBLISH_DRAFT, {
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
      tags: tags,
    },
    onCompleted(data) {
      console.log(`Draft is Published ${data.publishDraft.id}`);
      setSuccessMessage("Draft is published");
      setSuccess(true);
      sleep(2000).then(() => props.history.push(`/MyPosts/${user.id}`));
    },
  });
  function actionDraftCallback() {
    if (newDraft) createDraft();
    else {
      saveDraft();
    }
  }
  function publishDraftCall() {
    if (tags.length === 0) {
      setErrors({
        message: "Please Add Tags",
      });
      console.log("Please Add Tags");
    } else {
      setPublish(true);
      saveDraft().then(() => publishDraft());
    }
  }
  function handleTagsChange(tags) {
    setTags(tags);
    console.log(tags);
  }

  function onEditorChange(value) {
    setBody(value);
    // console.log(`New Body :${body}`);
  }
  const onTitleChange = (value) => {
    setTitle(value.target.value);
  };

  const onFilesChange = (files) => {
    // setFiles(files);
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
        <Button
          size="large"
          variant="contained"
          className={classes.publishBtn}
          onClick={publishDraftCall}
        >
          Publish Draft
        </Button>
      </Container>
    );
  };
  return fetchLoading ? (
    <CircularProgress />
  ) : (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        paddingTop: "16px",
      }}
    >
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
      {!newDraft && (
        <div
          style={{ alignItems: "center" }}
          className={classes.tagsInputStyle}
        >
          <TagsInput value={tags} onChange={handleTagsChange} />
        </div>
      )}
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
          <CustomizedSnackbars color="success" message={successMessage} />;
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
