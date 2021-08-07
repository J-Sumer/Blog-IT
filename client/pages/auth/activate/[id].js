import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import welcome from "../../../public/images/welcome.jpg";
import axios from "axios";
import { useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/messageHandler";
import Layout from "../../../components/Layout";

const activate = () => {
  const router = useRouter();
  const query = router.query.id;

  const [state, setState] = useState({
    jwt: "",
    success: "",
    error: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios
        .post(`${process.env.API}/register/activate`, {
          query,
        })
        .then((res) => {
          setState({
            ...state,
            success:
              "Your Account has been activated. Please go back to login page",
            error: "",
          });
        })
        .catch((err) => {
          setState({
            ...state,
            success: "",
            error:
              err.response.data.error ||
              "Cannot activate your account currently. Please try again after some time",
          });
        });
    } catch (err) {
      setState({
        ...state,
        success: "",
        error: "Something bad happened",
      });
    }
  };
  const { success, error } = state;

  return (
    <React.Fragment>
      <Layout>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" type="text/css" href="/static/bootstrap.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/confirmRegistration.css"
          />
          <title>Confirm Registration</title>
        </Head>
        <div>
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <div className="card">
            <div className="text-cr">
              <p>
                Hi Ninja, welcome to Blog-IT. Thank you for joining our family.
                Click on below button to confirm your registration
              </p>
            </div>
            <div className="welcome-image">
              <Image
                src={welcome}
                alt="Picture of the author"
                width={500}
                height={300}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-outline-secondary no-box-shadow"
            >
              Register
            </button>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default activate;
