import {
  CButton,
  CCol,CRow,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'




const Colors = () => {
  return (
    <CRow className="justify-content-center">
  <CCol md="6">

    <CInputGroup className="input-prepend">
      <CInputGroupPrepend>
        <CInputGroupText>
          <CIcon name="cil-magnifying-glass" />
        </CInputGroupText>
      </CInputGroupPrepend>
      <CInput size="16" type="text" placeholder="What are you looking for?" />
      <CInputGroupAppend>
        <CButton color="info">Search</CButton>
      </CInputGroupAppend>
    </CInputGroup>
  </CCol>
</CRow>
  )
}

export default Colors
