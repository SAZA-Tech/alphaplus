import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/auth";
import { FOLLOW_USER_GQL } from "../graphql/Auth/authGql";
import { LIKE_ARTCIEL_GQL } from "../graphql/Content/articleGql";
import { saveUserConfig, userConfigVar } from "../storage/userConfig";

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
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const toggleFollow = () => {
    if (user) {
      setFollowed(!followed);
      callFollow();
    } else {
      history.push("/login");
    }
  };
  const [callFollow, { loading }] = useMutation(FOLLOW_USER_GQL, {
    variables: {
      userId: id,
    },
    update(_, { data: { followUser: currentUser } }) {
      userConfigVar({
        followedUsers: currentUser.following,
      });
      saveUserConfig();
      console.log(userConfigVar().followedUsers);
    },
  });

  return {
    followed,
    toggleFollow,
  };
};
export const useLike = (articleId, initialState = false) => {
  const [liked, setLiked] = useState(initialState);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const toggleLike = () => {
    if (user) {
      setLiked(!liked);
      callLiked();
    } else {
      history.push("/login");
    }
  };
  // const {user}=useContext(AuthContext);
  // follow mutaion ==> updates cache
  const [callLiked, { loading }] = useMutation(LIKE_ARTCIEL_GQL, {
    variables: {
      articleId,
    },
    update(_, { data: { likeArticle: LikedArticle } }) {
      // userConfigVar({
      //   followedUsers: currentUser.following,
      // });
      saveUserConfig();
      // console.log(userConfigVar().followedUsers);
    },
  });
  return {
    liked,
    toggleLike,
  };
};
