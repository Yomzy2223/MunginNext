import Head from "next/head";
import React from "react";
import RegisterComponent from "../PagesComponents/Auth/register";

const Register = () => {
  return (
    <>
      <Head>
        <title>Mungin: Register</title>
      </Head>
      <RegisterComponent />;
    </>
  );
};

export default Register;
