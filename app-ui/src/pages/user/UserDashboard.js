import React from "react";
import { isAuthenticated } from "../../api/auth";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <div>
      <div className="jumbotron">
        <h3>User Dashboard</h3>
        <h4>Welcome {name}</h4>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="card mb-5">
            <div className="card-header">
              <h3>Links</h3>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="list-group-item">
                <Link to="/profile">Update Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="col-1"/> */}
        <div className="col-9">
          <div className="card mb-5">
            <div className="card-header">
              <h3>User Information</h3>
            </div>

            <ul className="list-group">
              <li className="list-group-item">{name}</li>
              <li className="list-group-item">{email}</li>
              <li className="list-group-item">
                {role === 0 ? "User" : "Admin"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-header">
          <h3>Purchase History</h3>
        </div>

        <ul className="list-group">
          <li className="list-group-item">To be added</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
