import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse
  } from '@coreui/react'
import usersData from './UsersData'
import InputFormUser from './InputFormUser'


const Users = () => {

  
  
  const [details, setDetails] = useState([])
   const [items, setItems] = useState(usersData)
   const history = useHistory()
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
    { key: 'UserName', _style: { width: '20%'} },
    { key: 'UserId', _style: { width: '20%'} },
    { key: 'UserEmail', _style: { width: '20%'} },
    { key: 'UserTwitterAcc', _style: { width: '20%'} },
    { key: 'UserGoogleAcc', _style: { width: '20%'} },
    { key: 'Role', _style: { width: '20%'} },
    { key: 'RegisterDate', _style: { width: '20%'} },
   
  

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  

  return (


    
    <CDataTable

    
      
      items={usersData}
      fields={fields}
      columnFilter
      
      theadTopSlot={ <CButton>
        <InputFormUser name="Add User"/>
    </CButton>}
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots = {{
        
        'show_details':
          (item, index)=>{
            return (
              
              <CButton size="sm" color="danger" className="ml-1">
              Delete
            </CButton>,
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
        'details':
            (item, index)=>{
              return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.username}
                  </h4>
                  <CButton>
                    <InputFormUser name="Edit"/>
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
  )
  

}

export default Users
