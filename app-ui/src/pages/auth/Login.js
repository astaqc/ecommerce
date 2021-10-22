import React, { useState } from "react";
import { login, authenticate, isAuthenticated } from "../../api/auth";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleChange = (name) => (e) =>
    setUser({ ...user, [name]: e.target.value });

  const { email, password, error, loading } = user;

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({ ...user, error: false, loading: true });

    login({ email, password }).then((data) => {
      if (data.error) {
        setUser({ ...data, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setUser({
            email: "",
            password: "",
            error: "",
            loading: false,
          });
          props.history.push("/");
        });
      }
    });
  };

  if (isAuthenticated()) {
    props.history.push("/");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error ? <div className="alert alert-danger">{error}</div> : null}

      <h3 className="text-center text-muted mb-5">Login</h3>
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
        <button
          className="btn btn-outline-secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Logging In...
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
