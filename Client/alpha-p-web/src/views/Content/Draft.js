import React, { useEffect, useState, useContext } from "react";
import Editor from "../../components/Editor";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { fade, makeStyles } from "@material-ui/core/styles";
import { CustomizedSnackbars } from "../../components/UI/messages";
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";
import { CREATE_DRAFT } from "../../graphql/Content/draftsGql";
import { useMutation } from "@apollo/client";
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
}));

function Draft(props) {
  const classes = useStyles();

  // Check if new draft or editing existing draft with prams

  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { onSubmit } = useForm(createDraftCallback, {});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);

  const [createDraft, { loading }] = useMutation(CREATE_DRAFT, {
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

  function createDraftCallback() {
    createDraft();
  }

  const onEditorChange = (value) => {
    setBody(value);
    console.log(body);
  };
  const onTitleChange = (value) => {
    setTitle(value.target.value);
    console.log(title);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  return (
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
          variant="outlined"
          onChange={onTitleChange}
        />{" "}
      </div>
      <Editor
        placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button size="large" className="" onClick={onSubmit}>
            Submit
          </Button>
        )}
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
