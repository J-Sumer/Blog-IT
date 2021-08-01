import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
  });

  const handleChange = (type) => (event) => {
    setState({
      ...state,
      [type]: event.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({ name, email, password });
    axios
      .post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  };

  const { name, email, password, error, success, buttonText } = state;

  const RegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          User Name
        </label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control no-box-shadow"
          id="name"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control no-box-shadow"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter your Email"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control no-box-shadow"
          id="exampleInputPassword1"
          placeholder="Type your password"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input no-box-shadow"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          I accept all terms and conditions
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-full-width btn-outline-dark no-box-shadow"
      >
        {buttonText}
      </button>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 ms-auto">
        <h1>Register</h1>
        {RegisterForm()}
      </div>
    </Layout>
  );
};

export default Register;
