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
  



  const InputFormComment = (props) => {
    console.log(props)
    const [modal, setModal] = useState(false);
    const toggle = ()=>{
    setModal(!modal);
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
        <CModalBody>
        
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="CommentId">Comment Id</CLabel>
              <CInput
                type="number"
                id="CommentId"
                name="CommentId"
                placeholder="Enter Comment Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="CommentTopic">Comment Topic</CLabel>
              <CInput
                type="name"
                id="CommentTopic"
                name="CommentTopic"
                placeholder="Enter Comment Topic"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="UserName">User Name</CLabel>
              <CInput
                type="name"
                id="UserName"
                name="UserName"
                placeholder="Enter User Name"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="Comment Date">Comment Date</CLabel>
              <CInput
                type="date"
                id="CommentDate"
                name="CommentDate"
                placeholder="Enter Comment Date"
                
              />
            </CFormGroup>
            
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  

        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Submit</CButton>{' '}
          <CButton
            color="secondary"
            onClick={toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )

  } 

  export default InputFormComment