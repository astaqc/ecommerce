import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../api/auth";
import { totalItemsInCart } from "../utils";

const Navbar = ({ history }) => {
  // Set active class
  const isActive = (history, path) =>
    history.location.pathname === path && "active";

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
      <Link className="navbar-brand" to="/">
        The Market
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated() ? (
            <>
              {isAuthenticated().user.role === 1 ? (
                <>
                  <li
                    className={`nav-item ${isActive(
                      history,
                      "/admin/dashboard"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={`nav-item ${isActive(
                      history,
                      "/user/dashboard"
                    )}`}
                  >
                    <Link className="nav-link" to="/user/dashboard">
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
              <li className={`nav-item`}>
                <Link className="nav-link" to="/cart">
                  Cart{" "}
                  <sup className="badge badge-primary">{totalItemsInCart()}</sup>
                </Link>
              </li>

              <li className={`nav-item`} onClick={handleLogout}>
                <Link className="nav-link" to="#">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={`nav-item ${isActive(history, "/register")}`}>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className={`nav-item ${isActive(history, "/login")}`}>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
