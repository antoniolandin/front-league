import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Player() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const location = useLocation();
  const {
    id,
    nombre,
    primer_apellido,
    segundo_apellido,
    grado,
    curso,
    partidos,
  } = location.state || {};

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
        style={{ backgroundImage: 'url("/fondo1.png")', zIndex: -999 }}
      ></div>
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-white font-bold text-4xl font-montserrat">
          {nombre}
        </h1>
      </div>
    </>
  );
}
