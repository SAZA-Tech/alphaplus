import React, { Component, useContext, useState } from "react";
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//graphql
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

//auth
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const LOGIN_ADMIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    AdminLogin(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;





const AdminLogin = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="email"
                       name="email"
                       type="email"
                       placeHolder="email"
                       value={values.email}
                       errors={errors.email}
                       onChange = {onChange} />

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="password"
                       name="password"
                       type="password"
                       placeHolder="password"
                       value={values.password}
                       errors={errors.password}
                       onChange = {onChange} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton 
                        color="primary" 
                        className="px-4" 
                        type="submit"
                            title="Login"
                        onClick={() => console.log("Pressed")}>
                        Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
         </div>
      )}
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AdminLogin