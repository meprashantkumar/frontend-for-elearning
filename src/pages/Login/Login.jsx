import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../Actions/userActions";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    await dispatch(fetchLogin(email, password));
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="login-page">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="login-button" type="submit">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
