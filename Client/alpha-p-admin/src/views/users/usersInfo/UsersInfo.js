import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import InputFormUser from "./InputFormUser";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      email
      username
      id
      name
      createdAt
      type
    }
  }
`;
const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const Users = () => {

  function refreshPage() {
    window.location.reload(false);
  }
  const [details, setDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [warning, setWarning] = useState(false);

  const { loading, error, data } = useQuery(GET_USERS, {
    onCompleted(data) {
      setItems(data.getUsers);
    },
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER,{
    onCompleted(){
      refreshPage();
    }
  });

  const history = useHistory();
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "username", _style: { width: "20%" } },
    { key: "id", _style: { width: "20%" } },
    { key: "email", _style: { width: "20%" } },
    { key: "UserTwitterAcc", _style: { width: "20%" } },
    { key: "UserGoogleAcc", _style: { width: "20%" } },
    { key: "type", _style: { width: "20%" } },
    { key: "createdAt", _style: { width: "20%" } },

    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  const deleteUserAction = (id) => {
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
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          {deleteLoading ? (
            <CSpinner />
          ) : (
            <CModalBody>Are you sure you want to delete this user ?</CModalBody>
          )}{" "}
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                deleteUser({ variables: { id } });
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
  //setItems(data.getUsers);

  return loading ? (
    <div>loading</div>
  ) : (
    <CDataTable
      items={items}
      fields={fields}
      columnFilter
      theadTopSlot={
        <CButton>
          <InputFormUser buttonName="Add User" />
        </CButton>
      }
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        show_details: (item, index) => {
          return (
            (
              <CButton size="sm" color="danger" className="ml-1">
                Delete
              </CButton>
            ),
            (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            )
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <h4>{item.username}</h4>

                <CButton>
                  <InputFormUser
                    buttonName="Edit"
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    // onSubmit={(e) => {
                    //   e.preventDefault();
                    // }}
                  />
                </CButton>
                {deleteUserAction(item.id)}
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default Users;
