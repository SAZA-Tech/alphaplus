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
import CIcon from '@coreui/icons-react'
import InputFormSector from './InputFormSector'
import AddFormSector from './AddFormSector'
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GET_SECTORS = gql`

  query getSectors{
    getSectors{
     
      id
      Secname
   
    }
  }
`;
const DELETE_SECTOR = gql`
  mutation deleteSector($sectorID: ID!) {
    deleteSector(sectorID: $sectorID)
  }
`;


const Sectors = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [warning, setWarning] = useState(false);

  const { loading, error, data } = useQuery(GET_SECTORS, {
   onCompleted(data) {
     setItems(data.getSectors);
   },
 });
 const [delteSector, { loading: deleteLoading }] = useMutation(DELETE_SECTOR,{
   onCompleted(){
    refreshPage();
   }
 }); 

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
    { key: 'id', _style: { width: '20%'} },
    { key: 'Secname', _style: { width: '20%'} },

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const deleteSectorAction = (sectorID) => {
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
            <CModalTitle>Delete Sector</CModalTitle>
          </CModalHeader>
          {deleteLoading ? (
            <CSpinner />
          ) : (
            <CModalBody>Are you sure you want to delete this Sector ?</CModalBody>
          )}{" "}
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                delteSector({ variables: { sectorID } });
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
      theadTopSlot={ <CButton>
        <AddFormSector buttonName="Add Sector"/>
    </CButton>}
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        
        show_details:
          (item, index)=>{
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
                    {item.username}
                  </h4>
                  <CButton>
                    <InputFormSector buttonName="Edit"
                    
                    Secname={item.Secname}
                    sectorID={item.id}

                    />
                  </CButton>

                  {deleteSectorAction(item.id)}

                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
  

}

export default Sectors
