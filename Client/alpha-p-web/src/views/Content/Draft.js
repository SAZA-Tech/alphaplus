import React, { useEffect, useState, useContext } from "react";
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
  const { onSubmit } = useForm(createDraftCallback, {});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [newDraft,setNewDraft] = useState(false); 
  const params = props.match.params.draftId;
  if(params=='new'){
    setNewDraft(true);
  }else{

  }

  useEffect(() => {


  }, [body, title]);
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

  function onEditorChange(value) {
    setBody(value);
    // console.log(`New Body :${body}`);
  }
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
        value={body}
        onChange
        onFilesChange={onFilesChange}
      />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Container>
            <Button
              size="large"
              variant="contained"
              className={classes.saveBtn}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="contained"
              className={classes.publishBtn}
              onClick={onSubmit}
            >
              Publish Draft
            </Button>
          </Container>
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
