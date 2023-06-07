import React from "react";
import { SecureRoute, Security, LoginCallback } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { Route, useHistory } from "react-router-dom";
import Home from "./Home";
import Protected from "./Protected";
import oktaAuth from "./config";
import Nav from "./Header/Nav";

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    console.log(_oktaAuth, originalUri, "yes");
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Nav />
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/protected" component={Protected} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
};

export default App;
