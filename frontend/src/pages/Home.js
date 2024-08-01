import React from "react";
import GetStarted from "../components/GetStarted";
// import GetInTouch from '../components/GetInTouch';
// import GetStarted from '../components/Details';
import Details from "../components/Details";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Details />
      <GetStarted />
    </>
  );
};

export default Home;
