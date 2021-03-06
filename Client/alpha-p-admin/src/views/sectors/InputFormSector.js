import React, { useState, useEffect } from 'react'
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
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useForm } from "../../../../alpha-p-admin/src/util/hooks";


const EDIT_SECTOR = gql`

mutation editSector($SectorInput: SectorInput!) {
  editSector(SectorInput:$SectorInput){
  
    Secname
    
  }
}
`;


const InputFormSector = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    console.log(values);
  };
  const { onChange, onSubmit, values } = useForm(CreateSectorInfoCallBack, {
    SectorID: props.sectorID,
    SecnameInput: props.Secname,
  });
  const [CreateSectorInfo, { loading ,error: mutationError }] = useMutation(EDIT_SECTOR, {
    onError(error) {
      console.log(`Error Happend Updating user info ${error}`);
    },
    onCompleted(data) {
      refreshPage();
      console.log("here");
    },
  });
  function refreshPage() {
    window.location.reload(false);
  }
  function CreateSectorInfoCallBack() {
    console.log(`Called `);
    CreateSectorInfo();
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
        <CModalHeader >
        </CModalHeader>
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
                  <CForm onSubmit={(event) => {
                    event.preventDefault();
                    var SectorInput = {
                      SecnameInput: values.SecnameInput,
                      SectorID: values.SectorID
                    }
                    CreateSectorInfo({ variables: { SectorInput } });
                  }}>

                    <CFormGroup>
                      <CLabel htmlFor="SecnameInput">Old Sector Name:  {values.SecnameInput}	</CLabel>
                      <CInput
                        id="SecnameInput"
                        name="SecnameInput"
                        placeholder="Enter Sector Name"
                        autoComplete="SecnameInput"
                        onChange={onChange}

                      />
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
        <CModalFooter>

        </CModalFooter>
      </CModal>
    </>
  )

}

export default InputFormSector