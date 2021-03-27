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
  const [updateUserInfo, { loading }] = useMutation(UPDATEUSERINFO, {
    onError(error) {
      console.log(`Error Happend Updating user info ${error}`);
    },
    onCompleted(data) {
      props.history.push("/users/usersInfo");
    },
    variables: values,
  });
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
        <CModalHeader closeButton></CModalHeader>
        {loading ? (
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
                    {/* <CFormGroup>
              <CLabel htmlFor="id">User Id</CLabel>
              <CInput
                type="number"
                id="id"
                name="id"
                placeholder="Enter User Id"
                
              />
            </CFormGroup> */}
                    {/* <CFormGroup>
                    <CLabel htmlFor="UserEmail">User Email</CLabel>
                    <CInput
                      type="email"
                      id="UserEmail"
                      name="UserEmail"
                      placeholder="Enter User Email"
                    />
                  </CFormGroup> */}
                    {/* <CFormGroup>
              <CLabel htmlFor="UserTwitterAcc">User Twitter Acc</CLabel>
              <CInput
                type="text"
                id="UserTwitterAcc"
                name="UserTwitterAcc"
                placeholder="Enter User Twitter Acc"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="UserGoogleAcc">User Google Acc</CLabel>
              <CInput
                type="text"
                id="UserGoogleAcc"
                name="UserGoogleAcc"
                placeholder="Enter User Google Acc"
                
              />
            </CFormGroup> */}
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
                    {/* <CFormGroup>
              <CLabel htmlFor="RegisterDate">Register Date</CLabel>
              <CInput
                type="date"
                id="RegisterDate"
                name="RegisterDate"
                placeholder="Enter User Register Date"
                
              />
            </CFormGroup> */}
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
