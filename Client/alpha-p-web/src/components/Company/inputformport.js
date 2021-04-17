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

const InputFormPort= (props) => {
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
      <CButton name=""
        onClick={toggle}
        size="sm" color="primary"
      >{props.buttonName} </CButton>
      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>
        </CModalHeader>

        {loading ? (
          <CSpinner></CSpinner>
        ) : (
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol sm="12">
                  <CForm onSubmit>

                    <CFormGroup>
                      <CLabel htmlFor="name">  name</CLabel>
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        autoComplete="name"
                        onChange={onChange}

                      />
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="tags">tags</CLabel>
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
                    </CButton>{" "}
                    <CButton color="secondary" onClick={toggle}>
                      Cancel
                    </CButton>


                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>

        )}
        <CModalFooter>

        </CModalFooter>
      </CModal>
    </>
  )

}

export default InputFormPort