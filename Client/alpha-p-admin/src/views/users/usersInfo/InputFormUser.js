import React, { useState, useEffect } from 'react'
import {
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton,CModal,
    CContainer,CCol,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CRow
  } from '@coreui/react' 
  import { gql, useMutation } from '@apollo/client';
 
 
 





  const InputFormUser = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = ()=>{
    setModal(!modal);
    console.log(props)
  }


  return (
    
    <>
      <CButton name=""
        onClick={toggle}
         size="sm" color="primary"
      >{props.name} </CButton>
      
      
      <CModal
       
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>
          
                </CModalHeader>
        <CModalBody>
        
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="name">User Name</CLabel>
              <CInput
                type="name"
                id="name"
                name="name"
                placeholder="Enter User name"
                autoComplete="name"
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="id">User Id</CLabel>
              <CInput
                type="number"
                id="id"
                name="id"
                placeholder="Enter User Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="UserEmail">User Email</CLabel>
              <CInput
                type="email"
                id="UserEmail"
                name="UserEmail"
                placeholder="Enter User Email"
                
              />
            </CFormGroup>
            <CFormGroup>
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
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="type">Role</CLabel>
              <CInput
                type="text"
                id="type"
                name="type"
                placeholder="Enter User type"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="RegisterDate">Register Date</CLabel>
              <CInput
                type="date"
                id="RegisterDate"
                name="RegisterDate"
                placeholder="Enter User Register Date"
                
              />
            </CFormGroup>
            
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  

        </CModalBody>
        <CModalFooter>
          <CButton color="primary" 
          type="submit"
          >Submit</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )

  } 

  export default InputFormUser
