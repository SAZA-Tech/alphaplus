import React, { useState, useEffect } from 'react'
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
import commentsData from './CommentsData'
import InputFormComment from './InputFormComment'
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GET_COMMENTS = gql`
query getComments(
  $companyId: ID = null
  $articleId: ID = null
  $tags: [String!] = null
  $userId: ID = null
) {
  getComments(
    filter: {
      articleId: $articleId
      companyId: $companyId
      tags: $tags
      userId: $userId
    }
  ) {
    
    id
    commentBody
    createdAt
  }
}
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
const DELETE_COMMENT= gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`;


const Comments = () => {

  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [warning, setWarning] = useState(false);

  const { loading, error, data } = useQuery(GET_COMMENTS, {
   onCompleted(data) {
     console.log(data.getComments)
     setItems(data.getComments);
   },
 });

 const [delteComment, { loading: deleteLoading }] = useMutation(DELETE_COMMENT); 

  
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
    { key: 'articleId', _style: { width: '20%'} },
    {key: 'commentBody', _style: { width: '20%'}},
    { key: 'createdAt', _style: { width: '20%'} },

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ] 
  const deleteCommentAction = (commentId) => {
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
            <CModalTitle>Delete Comment</CModalTitle>
          </CModalHeader>
          {deleteLoading ? (
            <CSpinner />
          ) : (
            <CModalBody>Are you sure you want to delete this Comment ?</CModalBody>
          )}{" "}
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                delteComment({ variables: { commentId } });
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
        <InputFormComment buttonName="Add Comment"/>
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
                    {item.commentBody}
                  </h4>
                  <CButton>
                    <InputFormComment buttonName="Edit"
                    
                    name={item.commentBody}
                    id={item.id}
                    type={item.createdAt}
                    
                    />
                  </CButton>
                  {deleteCommentAction(item.id)}
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
  

}

export default Comments