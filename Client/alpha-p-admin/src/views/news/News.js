import React, { useState, useEffect } from 'react'
import {
  CCardBody,
  CDataTable,
  CButton,CBadge,CCollapse,
} from '@coreui/react'
import newsData from './NewsData'
import InputFormNews from './InputFormNews'




const News = () => {
  
  const [details, setDetails] = useState([])
   const [items, setItems] = useState(newsData)

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
    { key: 'NewsId', _style: { width: '20%'} },
    { key: 'NewsTopic', _style: { width: '20%'} },
    {key: 'PublisherName', _style: { width: '20%'}},
    { key: 'PublishingDate', _style: { width: '20%'} },

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
      items={newsData}
      fields={fields}
      columnFilter
      theadTopSlot={ <CButton>
        <InputFormNews name="Add News"/>
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
                    <InputFormNews name="Edit"/>
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

export default News
