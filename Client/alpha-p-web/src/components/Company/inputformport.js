import React, { useState, useEffect } from 'react'
import {
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModal,
  CContainer,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CSelect,
  CSpinner,
} from "@coreui/react";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },



}));
const CREATE_PORT = gql`

mutation createPortfolio(
    $name: String = null ,  
    $tags: [String!] = null
    ) {
    createPortfolio(name:$name , tags:$tags){
        name
  }
}
`;


const InputFormPort = (props) => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    console.log(values);
  };
  const { onChange, onSubmit, values } = useForm(CreateCompanyInfoCallBack, {
    name: null,
    tags: null,
  });
  const [CreateCompanyInfo, { loading }] = useMutation(CREATE_PORT, {
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
      
        {loading ? (
          <CSpinner></CSpinner>
        ) : (
          <div className={classes.paper}>
          <CModalBody>
            <CContainer className="" >
              <CRow>
                <CCol sm="12">
                  <CForm onSubmit={(event)=>{
                    event.preventDefault();
                    var arr=[];
                    arr.push(values.tags);
                    console.log(arr[0]);
                    CreateCompanyInfo({variables:{
                      name:values.name,
                      tags:arr,
                    }});
                    
                    <Redirect to="/portfolio" />
                  }}>

                    <CFormGroup>
                      <CLabel htmlFor="name">  name  {values.name}</CLabel>
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        autoComplete="name"
                        onChange={onChange}

                      />
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="tags">tags {values.tags}</CLabel>
                      <CInput
                        name="tags"
                        id="tags"
                        placeholder="Enter Company tags followed with ,"
                        autoComplete="tags"
                        onChange={onChange}
                      />
                    </CFormGroup>
                    <CButton color="primary" type="submit">
                      Submit
                    </CButton>
                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          </div>
        )}
        <CModalFooter>

        </CModalFooter>
      
      
    </>
  )

}

export default InputFormPort