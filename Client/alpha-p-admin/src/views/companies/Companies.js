
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,CDataTable,CBadge,
 CCollapse,
  CCardBody,
 
} from '@coreui/react'

import companiesData from './CompaniesData'
import InputFormCompany from './InputFormCompany'
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GET_COMPANIES = gql`

  query getCompanies(
    $Comname: String = null
    $Symbol: String = null
    $CompanyID: String = null
    $Market: String = null
    $SectorID: String = null

  ) {
    getCompanies(

      CompanyInput:{
        Comname: $Comname
        Symbol: $Symbol
        CompanyID: $CompanyID
        Market: $Market
        SectorID: $SectorID

      }
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
  mutation deleteCompany($companyId: ID!) {
    deleteCompany(companyId: $companyId)
  }
`;


const Companies = () => {
  const [details, setDetails] = useState([])
   const [items, setItems] = useState([])
   const [warning, setWarning] = useState(false);

   const { loading, error, data } = useQuery(GET_COMPANIES, {
    onCompleted(data) {
      console.log(data.getCompanies)
      setItems(data.getCompanies);
    },
  });
  const [delteCompany, { loading: deleteLoading }] = useMutation(DELETE_COMPANY); 


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
    { key: 'CompanyName', _style: { width: '40%'} },
    { key: 'CompanyId', _style: { width: '20%'} },
    { key: 'symbol', _style: { width: '20%'} },
    { key: 'sectorId', _style: { width: '20%'} },
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

  return loading ? (
    <div>loading</div>
  ) : (
    <CDataTable
      items={items}
      fields={fields}
      columnFilter
      theadTopSlot={ <CButton>
        <InputFormCompany name="Add Company"/>
    </CButton>}
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        show_details:(item, index)=>{
            return (             
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
                    <InputFormCompany name="Edit"

                    name={item.comname}
                    id={item.id}
                    type={item.symbol}

                    />
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />

  );
  

}

export default Companies
