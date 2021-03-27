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
  



  const InputFormSector = (props) => {
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
              <CLabel htmlFor="SectorId">Sector Id</CLabel>
              <CInput
                type="number"
                id="SectorId"
                name="SectorId"
                placeholder="Enter Sector Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="Sector Topic">Sector Topic</CLabel>
              <CInput
                type="name"
                id="Sector Topic"
                name="Sector Topic"
                placeholder="Enter Sector Topic	"
                
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

  export default InputFormSector