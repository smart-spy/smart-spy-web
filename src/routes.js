import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import GlobalStyle from "./styles/global"

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SmartSpy from "./pages/App";
import CameraList from "./pages/CameraList";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <GlobalStyle />
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/cameras" component={CameraList} />
        <PrivateRoute exact_path="/" component={SmartSpy} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
  </BrowserRouter>
);

export default Routes;