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
  



  const InputFormNews = (props) => {
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
              <CLabel htmlFor="NewsId	">News Id</CLabel>
              <CInput
                type="number"
                id="NewsId"
                name="NewsId"
                placeholder="Enter News Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="NewsTopic">News Topic</CLabel>
              <CInput
                type="name"
                id="NewsTopic"
                name="NewsTopic"
                placeholder="Enter News Topic"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="PublisherName">Publisher Name</CLabel>
              <CInput
                type="name"
                id="PublisherName"
                name="PublisherName"
                placeholder="Enter Publisher Name"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="PublishingDate">Publishing Date</CLabel>
              <CInput
                type="date"
                id="PublishingDate"
                name="Publishing Date"
                placeholder="Enter Publishing Date"
                
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

  export default InputFormNews