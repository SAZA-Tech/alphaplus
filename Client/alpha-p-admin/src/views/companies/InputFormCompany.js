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
  



  const InputFormCompany = (props) => {
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
          Edit
          
                </CModalHeader>
        <CModalBody>
        
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="CompanyName">Company Name	</CLabel>
              <CInput
                type="name"
                id="CompanyName"
                name="CompanyName"
                placeholder="Enter Company Name"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="CompanyId">Company Id	</CLabel>
              <CInput
                type="number"
                id="CompanyId"
                name="CompanyId"
                placeholder="Enter Company Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="CompanyEmail	">Company Email	</CLabel>
              <CInput
                type="email"
                id="CompanyEmail"
                name="CompanyEmail"
                placeholder="Enter User Email"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="Sectors">Sectors</CLabel>
              <CInput
                type="text"
                id="Sectors"
                name="Sectors"
                placeholder="Enter Sectors"
                
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

  export default InputFormCompany