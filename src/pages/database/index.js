import DatabaseComponent from "@/PagesComponents/Database";
import Head from "next/head";
import React from "react";

const Login = (prop) => {
  console.log(prop);

  return (
    <>
      <Head>
        <title>Mungin: Database</title>
      </Head>
      <DatabaseComponent />;
    </>
  );
};

export default Login;

// export async function getServerSideProps() {
//   return {
//     props: { id: 3, name: "Sayo" },
//   };
// }
