import React from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Router from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();

const Layout = ({ children }) => {
  const head = () => (
    <Head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link rel="stylesheet" type="text/css" href="/static/bootstrap.css" />
      {/* 
      Instead of importing the cdn link, we are using css present in nprogress in node_modules
      or
      The above step can be done. Paste all the CSS in public/static/nprogress.css and use it
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      /> */}
    </Head>
  );

  const nav = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand blog-it-brand" href="#">
            Blog-IT
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link" href="#">
                  Login
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link" href="#">
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const scripts = () => (
    <Script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></Script>
  );

  return (
    <React.Fragment>
      {head()} {nav()} {scripts()}{" "}
      <div className="container pt-5 pb-5">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
