import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/auth";
import { FOLLOW_USER_GQL } from "../graphql/Auth/authGql";
import { FOLLOW_COMPANY_GQL } from "../graphql/Company/portfolioGql";
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
  const [callFollow] = useMutation(FOLLOW_USER_GQL, {
    variables: {
      userId: id,
    },
    update(_, { data: { followUser: currentUser } }) {
      userConfigVar({
        followedUsers: currentUser.following,
        portfolio: userConfigVar().portfolio,
        username: userConfigVar().username,
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
  const [callLiked] = useMutation(LIKE_ARTCIEL_GQL, {
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
export const useCompanyFollow = (companySybmol, initialState = false) => {
  const [followedCompany, setFollowedCompany] = useState(initialState);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const toggleFollowCompany = () => {
    if (user) {
      if (userConfigVar().portfolio.id === "")
        return history.push("/Portfolio");
      setFollowedCompany(!followedCompany);
      callFollowCompany();
    } else {
      history.push("/login");
    }
  };
  const porto = userConfigVar().portfolio;
  // const {user}=useContext(AuthContext);
  // follow mutaion ==> updates cache
  const [callFollowCompany] = useMutation(FOLLOW_COMPANY_GQL, {
    variables: {
      portoId: porto.id,
      symbol: companySybmol,
    },
    update(_, { data: { followCompany: portfolio } }) {
      userConfigVar({
        portfolio: portfolio,
        followedUsers: userConfigVar().followedUsers,
        username: userConfigVar().username,
      });
      saveUserConfig();
      // console.log(userConfigVar().followedUsers);
    },
  });
  return {
    followedCompany,
    toggleFollowCompany,
  };
};
