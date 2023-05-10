import Head from "next/head";
import React from "react";
import LoginComponent from "../PagesComponents/Auth/login";

const Login = () => {
  return (
    <>
      <Head>
        <title>Mungin: Login</title>
      </Head>
      <LoginComponent />;
    </>
  );
};

export default Login;
