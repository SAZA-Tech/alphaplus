import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { FOLLOW_USER_GQL } from "../graphql/Auth/authGql";
import { currentFollwedUsers } from "../storage/cache";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export const useFollow = (id, initialState = false) => {
  const [followed, setFollowed] = useState(initialState);

  const toggleFollow = () => {
    setFollowed(!followed);
    callFollow();
  };
  // const {user}=useContext(AuthContext);
  // follow mutaion ==> updates cache
  const [callFollow, { loading }] = useMutation(FOLLOW_USER_GQL, {
    variables: {
      userId: id,
    },
    update(_, { data: { followUser: currentUser } }) {
      currentFollwedUsers(currentUser.following);
      console.log(currentFollwedUsers());
    },
  });
  return {
    followed,
    toggleFollow,
  };
};
