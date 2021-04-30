import  {  useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "../../components/Editor";
import { Button, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {  makeStyles } from "@material-ui/core/styles";
import { CustomizedSnackbars } from "../../components/UI/messages";
import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";
import {
 
  EDIT_DRAFT,
  GET_DRAFT,
 
} from "../../graphql/Content/draftsGql";
import { GET_ARTICLE2 ,EDIT_ARTICLE} from "../../graphql/Content/articleGql";
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

function EditArticle(props) {
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

  let { articleId } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  // const [files, setFiles] = useState([]);
  const { loading: fetchLoading, data: fetchedData } = useQuery(GET_ARTICLE2, {
    variables: {
        articleId:articleId,
    },
    onCompleted(data) {
      setFetched(true);
      setTitle(fetchedData.getArticle.articleTitle);
      setBody(fetchedData.getArticle.articleBody);
      console.log(`body`, fetchedData.getArticle.articleBody);
    },
    skip: newDraft || fetched,
  });

  const [saveDraft, { loading: saveLoading }] = useMutation(EDIT_ARTICLE, {
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
      articleId: articleId,
      contentInput: {
        title,
        body,
      },
    },
    onCompleted(data) {
      console.log(`Draft is Updated ${data.editArticle.id}`);
      setSuccessMessage("Draft is Saveed");

      setSuccess(true);
      if (!startPublish)
        sleep(2000).then(() =>
          props.history.push(`/MyAuthers/${data.editArticle.articleAuthor.id}`)
        );
    },
  });

  function actionDraftCallback() {

      saveDraft();
    
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
    return (<Container>
        {/* Save Draft 📝 */}
        <Button
          size="large"
          variant="contained"
          className={classes.saveBtn}
          onClick={onSubmit}
        >
          Save
        </Button>
      </Container>);
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
        {saveLoading ? <CircularProgress /> : buttons()}
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

export default EditArticle;
