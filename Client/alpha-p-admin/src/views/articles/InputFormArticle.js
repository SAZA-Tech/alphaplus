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
  

  const InputFormArticle = (props) => {
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
              <CLabel htmlFor="ArticleId">Article Id</CLabel>
              <CInput
                type="number"
                id="ArticleId"
                name="ArticleId"
                placeholder="Enter Article Id"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="ArticleTopic">Article Topic	</CLabel>
              <CInput
                type="name"
                id="ArticleTopic"
                name="ArticleTopic"
                placeholder="Enter Article Topic"
                
              />
              </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="AnalystName">Analyst Name</CLabel>
              <CInput
                type="name"
                id="AnalystName"
                name="AnalystName"
                placeholder="Enter Analyst Name"
                
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="ArticleDate">Article Date</CLabel>
              <CInput
                type="date"
                id="ArticleDate"
                name="ArticleDate"
                placeholder="Enter Article Date"
                
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

  export default InputFormArticle