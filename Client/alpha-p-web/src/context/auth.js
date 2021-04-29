import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  initialUserConfig,
  saveUserConfig,
  userConfigVar,
} from "../storage/userConfig";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    userConfigVar({
      followedUsers: userData.following,
      username: userData.username,
      portfolio:
        userData.portfolios.length > 0
          ? userData.portfolios[0]
          : {
              __typename: "",
              follwedTags: [],
              id: "",
              name: "",
            },
    });
    saveUserConfig();
    // console.log(userConfigVar().followedUsers);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("alph.userConfig");
    userConfigVar(initialUserConfig);

    window.location.reload();

    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
