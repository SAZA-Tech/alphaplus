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

const CREATE_COMPANY = gql`

  mutation createCompany($CompanyInput: CompanyInput! ) {
    createCompany(CompanyInput:$CompanyInput) {
    
      market
      sectorId
      id
      comname
      symbol
    }
  }
`;

const GET_SECTORS = gql`

  query getSectors{
    getSectors{
     
      id
      Secname
   
    }
  }
`;
const GET_COMPANIES = gql`

query getCompanies(
  $companyFilter: CompanyFilter = {
  Comname: null
  CompanyID: null
  Market: null
  SectorID: null
  Symbol: null
},
) {
  getCompanies(companyFilter: $companyFilter
  ) {
    market
    sectorId
    id
    comname
    symbol

  }
}
`;

const AddFormCompany = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    console.log(values);
  };

  const { data: SectosData, loading: FetchSectors } = useQuery(GET_SECTORS)
  const { onChange, onSubmit, values } = useForm(CreateCompanyInfoCallBack, {
    CompanyID: props.CompanyID,
    Comname: props.Comname,
    SectorID: "",
    Market: "",
    Symbol: props.Symbol
  });
  const [CreateCompanyInfo, { loading, error: mutationError }] = useMutation(CREATE_COMPANY, {
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
  function CreateCompanyInfoCallBack() {
    console.log(`Called `);
    CreateCompanyInfo();
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
        <CModalHeader>
        </CModalHeader>
        {mutationError ? (<div>
          <p>Error :( Please try again)</p>
          <CButton name=""
            onClick={refreshPage}
            size="sm" color="primary"
          >close </CButton>
        </div>) : loading ? (<CSpinner></CSpinner>) : (
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol sm="12">
                  <CForm onSubmit={(event) => {
                    event.preventDefault();
                    var CompanyInput = {
                      CompanyID: values.CompanyID,
                      Comname: values.Comname,
                      SectorID: values.SectorID,
                      Market: values.Market,
                      Symbol: values.Symbol

                    };
                    CreateCompanyInfo({ variables: { CompanyInput } });
                  }}>

                    <CFormGroup>
                      <CLabel htmlFor="Comname">company name {values.Comname}</CLabel>
                      <CInput
                        id="Comname"
                        name="Comname"
                        placeholder="Enter Company Name"
                        autoComplete="Comname"
                        onChange={onChange}

                      />
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="Market">market</CLabel>
                      <CInput
                        name="Market"
                        id="Market"
                        placeholder="Enter Company market"
                        autoComplete="Market"
                        onChange={onChange}
                      />
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="Symbol">Company symbol</CLabel>
                      <CInput
                        name="Symbol"
                        id="Symbol"
                        placeholder="Enter User symbol"
                        autoComplete="Symbol"
                        onChange={onChange}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="SectorID">Role</CLabel>
                      <CSelect
                        id="SectorID"
                        name="SectorID"
                        placeholder="Enter User type"
                        onChange={onChange}
                        value={values.SectorID}
                      >

                        {
                          FetchSectors ? null :
                            SectosData.getSectors.map((e) => <option value={e.id}>{e.Secname}</option>)
                        }
                      </CSelect>
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
          </CModalBody>)}
        <CModalFooter>

        </CModalFooter>
      </CModal>
    </>
  )

}

export default AddFormCompany