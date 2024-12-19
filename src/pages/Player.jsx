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
    goles,
    photo,
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
      <div className="flex justify-center gap-24 w-full h-full flex-row">
        <img
          className="object-cover w-full h-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
          src={`/${photo}`}
          alt=""
        />
        <div className="flex flex-col ml-24 justify-center text-start">
          <h1 className="text-white font-extralight text-6xl font-montserrat">
            {nombre} {primer_apellido}
          </h1>
          <h2 className="text-white font-extralight text-xl mt-6 font-montserrat">
            Grado: {grado}
          </h2>
          <h3 className="text-white font-extralight text-xl mt-2 font-montserrat">
            Curso: {curso}
          </h3>
          <h3 className="text-white font-extralight text-xl mt-2 font-montserrat">
            Partidos Jugados: {partidos}
          </h3>
          <h3 className="text-white font-extralight text-xl mt-2 font-montserrat">
            Goles: {goles}
          </h3>
        </div>
      </div>
    </>
  );
}
