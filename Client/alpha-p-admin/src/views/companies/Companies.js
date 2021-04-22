
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse,
  CForm,
  CSpinner,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import companiesData from './CompaniesData'
import InputFormCompany from './InputFormCompany'
import AddFormCompany from './AddFormCompany'
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

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

const DELETE_COMPANY = gql`
  mutation deleteCompany($id:ID! , $companyId: ID!) {
    deleteCompany(companyId: $companyId , id: $id )
  }
`;


const Companies = () => {

  function refreshPage() {
    window.location.reload(false);
  }
  const [details, setDetails] = useState([])
   const [items, setItems] = useState([])
   const [warning, setWarning] = useState(false);

   const { loading, error, data } = useQuery(GET_COMPANIES, {
    onCompleted(data) {
      setItems(data.getCompanies);
    },
  });
  const [delteCompany, { loading: deleteLoading }] = useMutation(DELETE_COMPANY,{
    onCompleted(data){
      refreshPage();
    }

  }); 
  const history = useHistory();

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'comname', _style: { width: '40%'} },
    { key: 'id', _style: { width: '20%'} },
    { key: 'symbol', _style: { width: '20%'} },
    { key: 'sectorId', _style: { width: '20%'} },
    { key: 'market', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }


  const deleteCompanyAction = (companyId) => {
    return (
      <>
        <CButton
          type="submit"
          onClick={() => setWarning(true)}
          size="sm"
          color="danger"
          className="ml-1"
        >
          Delete
        </CButton>
        <CModal
          show={warning}
          onClose={() => setWarning(!warning)}
          color="warning"
        >
          <CModalHeader closeButton>
            <CModalTitle>Delete Company</CModalTitle>
          </CModalHeader>
          {deleteLoading ? (
            <CSpinner />
          ) : (
            <CModalBody>Are you sure you want to delete this Company ?  </CModalBody>
          )}{" "}
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                const id="604cb03f70aeaa09fc60fff7";//temp
                delteCompany({ variables:{companyId,id}  });
                
                if (!deleteLoading) setWarning(!warning);
              }}
            >
              Yes{" "}
            </CButton>
            <CButton color="secondary" onClick={() => setWarning(!warning)}>
              no
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };



  return loading ? (
    <div>loading</div>
    ) : (
    <CDataTable
      items={items}
      fields={fields}
      columnFilter
      theadTopSlot={
        
         <CButton>
        <AddFormCompany buttonName="Add Company"
        />
    </CButton>
         }
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        show_details:(item, index)=>{
            return (
              (
                <CButton size="sm" color="danger" className="ml-1">
                  Delete
                </CButton>
              ),             
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{toggleDetails(index)}}
                >
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
              )
          },
          details:
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.comname}
                  </h4>
                  <CButton>
                    <InputFormCompany buttonName="Edit"
                      Comname={item.comname}
                      Market={item.market}
                      CompanyID={item.id}
                      SectorID={item.sectorId}
                    />
                  </CButton>
                  {deleteCompanyAction(item.id)}
                </CCardBody>
              </CCollapse>
            )
          }
      }
    }
    />

  );
  

}

export default Companies
