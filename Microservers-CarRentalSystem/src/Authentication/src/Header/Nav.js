import { useOktaAuth } from "@okta/okta-react/";
import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Nav = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  const logout = async () =>{
     oktaAuth.signOut("/")
    history.push('/')
    };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          OKTA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {authState?.isAuthenticated ? (
              <>
                
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/protected">
                    Protected
                  </Link>
                </li> */}
                <li className="nav-item">
                  <button onClick={logout} className=" nav-link active">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
