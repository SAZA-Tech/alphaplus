import React, { useState, useEffect } from 'react'
import {
  CCardBody,
  CDataTable,
  CButton,CBadge,CCollapse,
} from '@coreui/react'
import usersRequestData from './UsersRequestData'




const UsersRequests = () => {
  
  const [details, setDetails] = useState([])
    const [items, setItems] = useState(usersRequestData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let usersRequestData = details.slice()
    if (position !== -1) {
        usersRequestData.splice(position, 1)
    } else {
        usersRequestData = [...details, index]
    }
    setDetails(usersRequestData)
  }


  const fields = [
    { key: 'UserName', _style: { width: '20%'} },
    { key: 'UserId', _style: { width: '20%'} },
    { key: 'email', _style: { width: '20%'} },
    { key: 'type', _style: { width: '20%'} },

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
      items={usersRequestData}
      fields={fields}
      columnFilter
    //   theadTopSlot={ <CButton>
    //     <InputFormNews name="Add News"/>
    // </CButton>}
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
                  <CButton size="sm" color="primary" className="ml-1">
                  Accept
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                  Reject
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
  

}

export default UsersRequests
