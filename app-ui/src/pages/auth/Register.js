import React, { useState } from "react";
import { register, isAuthenticated } from "../../api/auth";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (e) =>
    setUser({ ...user, [name]: e.target.value });

  const { name, email, password, error, success } = user;

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({ ...user, error: false });

    register({ name, email, password }).then((data) => {
      if (data.error) {
        setUser({ ...data, error: data.error, success: false });
      } else {
        setUser({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  if (isAuthenticated()) {
    props.history.push("/");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {success ? (
        <div className="alert alert-success">Account successfully created</div>
      ) : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}

      <h3 className="text-center text-muted mb-5">Create An Account</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          value={name || ""}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          value={email || ""}
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          value={password || ""}
          onChange={handleChange("password")}
        />
      </div>
      <div className="text-center">
        <input
          type="submit"
          className="btn btn-outline-secondary"
          value="Register"
        />
      </div>
    </form>
  );
};

export default Register;
