import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
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

// export const useS3Url = (callback, initialState = {}) => {
//   const [values, setValues] = useState(initialState);

//   const onRequest = (event) => {
//     const response = useMutation(s3SignMutation, {
//       variables: values,
      
//     });
//   };
// };
