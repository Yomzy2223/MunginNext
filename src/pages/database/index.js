import DatabaseComponent from "@/PagesComponents/Database";
import React from "react";

const Login = (prop) => {
  console.log(prop);

  return <DatabaseComponent />;
};

export default Login;

export async function getServerSideProps() {
  return {
    props: { id: 3, name: "Sayo" },
  };
}
