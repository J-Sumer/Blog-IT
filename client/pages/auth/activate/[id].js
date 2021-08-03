import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import welcome from "../../../public/images/welcome.jpg";

const activate = () => {
  const router = useRouter();

  return (
    <React.Fragment>
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
        <div className="card">
          <div className="text-cr">
            <p>
              Hi Ninja, welcome to Blog-IT. Thank you for joining our family.
              Click on below button to confirm your registration
            </p>
          </div>
          <div class="welcome-image">
            <Image
              src={welcome}
              alt="Picture of the author"
              width={500}
              height={300}
            />
          </div>
          <button className="btn btn-outline-secondary no-box-shadow">
            Register
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default activate;
