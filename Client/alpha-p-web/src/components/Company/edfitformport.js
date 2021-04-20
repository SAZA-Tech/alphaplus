import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";


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
const EDIT_PORT = gql`

mutation editPortfolio(
    $portoId: ID! 
    $name: String! 
    $tags: [String!] 
    ) {
        editPortfolio(name:$name , tags:$tags ,portoId:$portoId ){
        name
  }
}
`;


const EditFormport = (props) => {
    const classes = useStyles();

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
        console.log(values);
    };
    const { onChange, onSubmit, values } = useForm(CreateCompanyInfoCallBack, {
        portoId: props.portoId,
        name: null,
        tags: null,
    });
    const [CreateCompanyInfo, { loading }] = useMutation(EDIT_PORT, {
        onError(error) {
            console.log(`Error Happend Updating user info ${error}`);
        },
        onCompleted(data) {
            console.log("here");
        },
    });
    function CreateCompanyInfoCallBack() {
        console.log(`Called `);
        CreateCompanyInfo();
    }
    return (
        <>

            <div className={classes.paper}>
                <form className={classes.form} onSubmit={(event) => {
                    event.preventDefault();
                    var arr = [];
                    arr = (values.tags).split(",");
                    CreateCompanyInfo({
                        variables: {
                            portoId: props.portoId,
                            name: values.name,
                            tags: arr,
                        }
                    });

                    <Redirect to="/portfolio" />
                }}>

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
    )

}

export default EditFormport