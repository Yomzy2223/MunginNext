import React, { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
import MiniCard from "../components/Landing/MiniCard";
import Navbar from "../components/Landing/Navbar";
import Mission from "../components/Landing/mission";
// import About from "../components/Landing/About";
// import Advert from "../components/Landing/Advert";
import Footer from "../components/Landing/Footer";
// import UserService from "../services/user.service";

import WorkProgress from "../components/Landing/WorkingProgress";
import styled from "styled-components";
import Head from "next/head";
// import Articles from "./components/Landing page/Articles";

const App = () => {
  return (
    <>
      <Head>
        <title>Mungin</title>
      </Head>
      <Navbar />
      <AppContainer>
        <Hero />
        <WorkProgress />
        {/* <MiniCard /> */}
        <Mission />
        {/* <Articles /> */}
        {/* <About /> */}
        {/* <Advert /> */}
      </AppContainer>
      <Footer />
    </>
  );
};

export default App;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-inline: clamp(20px, 6vw, 100px);
  gap: 60px;
  margin-bottom: 150px;
  max-width: 100vw;
`;
