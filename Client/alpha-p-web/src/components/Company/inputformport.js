// eslint-disable-next-line
// import  { useState } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { makeStyles } from "@material-ui/core/styles";
import {
  // Link as RouterLink

  Redirect,
} from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { saveUserConfig, userConfigVar } from "../../storage/userConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  GTsubmit: {
    margin: theme.spacing(3, 0, 0),
  },
}));
const CREATE_PORT = gql`
  mutation createPortfolio($name: String = null, $tags: [String!] = null) {
    createPortfolio(name: $name, tags: $tags) {
      name
      id
      follwedTags
    }
  }
`;

const InputFormPort = (props) => {
  const classes = useStyles();

  // const [modal, setModal] = useState(false);
  // const toggle = () => {
  //   setModal(!modal);
  //   console.log(values);
  // };
  const { onChange, values } = useForm(CreateCompanyInfoCallBack, {
    name: null,
    tags: null,
  });
  const [CreateCompanyInfo, { loading }] = useMutation(CREATE_PORT, {
    onError(error) {
      console.log(`Error Happend Updating user info ${error}`);
    },
    onCompleted(data) {
      userConfigVar({
        portfolio: data.createPortfolio,
        followedUsers: userConfigVar().followedUsers,
        username: userConfigVar().username,
      });
      saveUserConfig();
      console.log("here");
      window.location.reload();
    },
  });
  function CreateCompanyInfoCallBack() {
    console.log(`Called `);
    CreateCompanyInfo();
  }
  return (
    <>
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            var arr = [];
            arr = values.tags.split(",");
            console.log(arr[0]);
            CreateCompanyInfo({
              variables: {
                name: values.name,
                tags: arr,
              },
            });

            <Redirect to="/portfolio" />;
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Portfolio Name"
            name="name"
            autoComplete="name"
            id="name"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="tags"
            autoComplete="tags"
            id="tags"
            label="Tags Followed By  , "
            onChange={onChange}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default InputFormPort;
