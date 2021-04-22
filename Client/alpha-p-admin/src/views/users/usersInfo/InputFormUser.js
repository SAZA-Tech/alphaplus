import React, { useState, useEffect } from "react";
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
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../../../util/hooks";
const UPDATEUSERINFO = gql`
  mutation updateUserInfo($id: ID!, $name: String!, $type: String!) {
    updateUserInfo(id: $id, name: $name, type: $type) {
      id
      type
    }
  }
`;
const InputFormUser = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    console.log(values);
  };
  const { onChange, onSubmit, values } = useForm(updateUserInfoCallBack, {
    id: props.id,
    name: props.name,
    type: props.type,
  });
  const [updateUserInfo, { loading, error: mutationError }] = useMutation(UPDATEUSERINFO, {
    onError(error) {
      console.log(`Error Happend Updating user info ${error}`);
    },
    onCompleted(data) {
      refreshPage();
      props.history.push("/users/usersInfo");
    },
    variables: values,
  });
  function refreshPage() {
    window.location.reload(false);
  }
  function updateUserInfoCallBack() {
    console.log(`Called `);
    updateUserInfo();
  }
  return (
    <>
      <CButton name="" onClick={toggle} size="sm" color="primary">
        {props.buttonName}{" "}
      </CButton>

      <CModal show={modal} onClose={toggle}>
        <CModalHeader ></CModalHeader>
        {mutationError ? (<div>
          <p>Error :( Please try again)</p>
          <CButton name=""
            onClick={refreshPage}
            size="sm" color="primary"
          >close </CButton>
        </div>) :
          loading ? (
            <CSpinner></CSpinner>
          ) : (
            <CModalBody>
              <CContainer>
                <CRow>
                  <CCol sm="12">
                    <CForm onSubmit={onSubmit}>
                      <CFormGroup>
                        <CLabel htmlFor="name">User Name</CLabel>
                        <CInput
                          type="name"
                          id="name"
                          name="name"
                          placeholder={values.name}
                          autoComplete="name"
                          onChange={onChange}
                        />
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="type">Role</CLabel>
                        <CSelect
                          id="type"
                          name="type"
                          placeholder="Enter User type"
                          onChange={onChange}
                        >
                          <option value="endUser">EndUser</option>
                          <option value="analyst">Analyst</option>
                        </CSelect>
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
        <CModalFooter></CModalFooter>
      </CModal>
    </>
  );
};

export default InputFormUser;
