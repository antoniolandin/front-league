import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div
        className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: 'url("/fondo.png")', zIndex: -999 }}
      ></div>
      <div className="text-center">
        <h1 className="text-6xl font-montserrat font-bold text-white">Home</h1>
      </div>
    </>
  );
};

export default Home;
