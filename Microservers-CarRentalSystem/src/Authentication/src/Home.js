import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  const login = async () => oktaAuth.signInWithRedirect();

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    history.push("/protected");
  }

  return (
    <div className=" container">
      <div className="row">
        <div className=" col-md-6 m-auto mt-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Not Logged in yet</h5>
              <button className="btn btn-primary" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
