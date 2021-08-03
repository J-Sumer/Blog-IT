import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../helpers/messageHandler";
import Image from "next/image";
import profilePic from "../public/images/Mobile-login.jpg";

const Register = () => {
  const [state, setState] = useState({
    name: "Test",
    email: "mj@tcs.com",
    password: "aasdfsdf",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({
      ...state,
      buttonText: "Submitting",
    });

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });

      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        error: "",
        success: response.data,
        buttonText: "Submitted",
      });
    } catch (err) {
      setState({
        ...state,
        success: "",
        error: err.response.data.error,
        buttonText: "Register",
      });
    }
  };

  const handleSubmitWithPromise = (event) => {
    event.preventDefault();
    setState({
      ...state,
      buttonText: "Submitting",
    });
    axios
      .post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        setState({
          ...state,
          name: "",
          email: "",
          password: "",
          error: "",
          success: res.data,
          buttonText: "Submitted",
        });
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data.error);
          setState({
            ...state,
            success: "",
            error: err.response.data.error,
            buttonText: "Register",
          });
        }
      });
  };

  const { name, email, password, error, success, buttonText } = state;

  const RegisterForm = () => (
    <div style={{ width: "70%" }}>
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
            Don't worry, we'll never share your email with anyone else.
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
        <button
          type="submit"
          className="btn btn-sm btn-full-width btn-outline-dark no-box-shadow"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <div className="float-left">
        <Image
          src={profilePic}
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
      <div className="col-md-6 ms-auto font-80">
        <h1>Register</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {RegisterForm()}
      </div>
    </Layout>
  );
};

export default Register;
