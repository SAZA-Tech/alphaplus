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
import articlesData from './ArticlesData'
import InputFormArticle from './InputFormArticle'
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";


 const GET_ARTICLES = gql`
  query getArticles(
    $companyId: ID = null
    $articleId: ID = null
    $tags: [String!] = null
    $userId: ID = null
  ) {
    getArticles(
      filter: {
        articleId: $articleId
        companyId: $companyId
        tags: $tags
        userId: $userId
      }
    ) {
      id
      articleBody
      updatedAt
      createdAt
      articleTitle
    }
  }
`;

const DELETE_ARTICLE= gql`
  mutation deleteArticle($id: ID! ,$articleId: ID!) {
    deleteArticle(id: $id , articleId: $articleId)
  }
`;

// const EDIT_ARTICLE = gql`
//   mutation editDraft($articleId: ID!, $id: ID!, $contentInput: ContentInput) {
//     editDraft(articleId: $articleId, id: $id, contentInput: $contentInput) {
//       createdAt
//       updatedAt
//       id
//       articleAuthor {
//         id
//         username
//       }
//     }
//   }
// `;


const Articles = () => {
  
  const [details, setDetails] = useState([])
   const [items, setItems] = useState([])
   const [warning, setWarning] = useState(false);

   const { loading, error, data } = useQuery(GET_ARTICLES, {
    onCompleted(data) {
      console.log(data.getArticles)
      setItems(data.getArticles);
    },
  });
    const [deleteArticle, { loading: deleteLoading }] = useMutation(DELETE_ARTICLE);

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
    { key: 'articleTitle', _style: { width: '20%'} },
    {key: 'createdAt', _style: { width: '20%'}},
    { key: 'updatedAt', _style: { width: '20%'} },

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  const deleteArticleAction = (articleId) => {
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
            <CModalTitle>Delete Article</CModalTitle>
          </CModalHeader>
          {deleteLoading ? (
            <CSpinner />
          ) : (
            <CModalBody>Are you sure you want to delete this Article ?</CModalBody>
          )}{" "}
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                const id="604cb03f70aeaa09fc60fff7"; //temp
                deleteArticle({ variables: { id,articleId} });
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
        <InputFormArticle buttonName="Add Article"/>
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
                    {item.articleTitle}
                  </h4>
                  <CButton>
                    <InputFormArticle buttonName="Edit"
                    
                    name={item.articleTitle}
                    id={item.id}
                    type={item.createdAt}
                    
                    />
                  </CButton>

                  { 
                  deleteArticleAction(item.id)}

                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
  

}

export default Articles
