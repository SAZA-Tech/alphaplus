import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCardBody,
  CDataTable,
  CButton,
  CCollapse
  } from '@coreui/react'
import InputFormUser from './InputFormUser'
import { gql, useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";

const GET_USERS = gql`
 query getUsers {
  getUsers{
  email
  username
  id
  name
  createdAt
  type
  }
 }`
  ;

  const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) 
  }
`;
 
const Users = () => {


  

  
  const [details, setDetails] = useState([])
   const [items, setItems] = useState([])
   const { loading, error, data } = useQuery(GET_USERS,{
    onCompleted(data){
      setItems(data.getUsers);    
    }
  }) 
  
  const [deleteUser] = useMutation(DELETE_USER);

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
    { key: 'username', _style: { width: '20%'} },
    { key: 'id', _style: { width: '20%'} },
    { key: 'email', _style: { width: '20%'} },
    { key: 'UserTwitterAcc', _style: { width: '20%'} },
    { key: 'UserGoogleAcc', _style: { width: '20%'} },
    { key: 'type', _style: { width: '20%'} },
    { key: 'createdAt', _style: { width: '20%'} },
   
  

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  //setItems(data.getUsers);

  return (

   
    loading?<div>
      loading 
    </div>:
    <CDataTable

    
      
      items={items}
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
                  <CButton type="submit" size="sm" color="danger" className="ml-1">
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
