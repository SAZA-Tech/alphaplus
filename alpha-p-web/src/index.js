import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Client/Admin/App";
import * as serviceWorker from "./serviceWorker";

import { icons } from "./Client/Admin/assets/icons";

import { Provider } from "react-redux";
import store from "./store";
import EApp from "./Client/End-user/E_App";
import ApolloProvider from "./ApolloProvider";

React.icons = icons;

ReactDOM.render(ApolloProvider, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
