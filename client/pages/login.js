import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../helpers/messageHandler";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    success: "",
    error: "",
  });

  console.log(isAuth());

  useEffect(() => {
    isAuth() &&
      (isAuth().role === "admin"
        ? Router.push("/admin")
        : Router.push("/user"));
  }, []);

  const { email, password, success, error } = state;

  const handleChange = (id) => (event) => {
    setState({
      ...state,
      [id]: event.target.value,
      success: "",
      error: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(`${process.env.API}/login`, {
        email,
        password,
      });
      console.log(result);
      authenticate(result, () =>
        isAuth() && isAuth().role === "admin"
          ? Router.push("/admin")
          : Router.push("/")
      );
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        error: err.response.data.error,
        success: "",
      });
    }
    /*
    axios
      .post(`${process.env.API}/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log("response");
        console.log(response);
      })
      .catch((err) => {
        console.log("err");
        console.log(err.response.data.error);
      });
    */
  };

  return (
    <Layout>
      <div className="height-90">
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
      </div>
      <div className="font-80 width-40 margin-left-30 login-box">
        <div className="inline-block">
          <h1 className="auth-text margin-left-35">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email ID
            </label>
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              className="form-control no-box-shadow"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange("password")}
              value={password}
              type="password"
              className="form-control no-box-shadow"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-outline-dark no-box-shadow btn-login"
          >
            Login
          </button>
        </form>
        <Link href="#" className="forgot-password-link">
          Forgot Password??
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
