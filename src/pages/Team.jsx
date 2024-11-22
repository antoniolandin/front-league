import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";

export default function Team() {
  const location = useLocation();
  const { id } = useParams("id");
  const { nombre, puntos, partidos_jugados } = location.state || {};
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchData = async () => {
      try {
        setBackgroundVisible(false);

        // fetch a la url de la api
        const response = await fetch(
          `http://localhost:3500/api/equipos/${id}/jugadores`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setJugadores(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
      <div className="flex flex-col justify-center mt-12">
        <div className="text-center ">
          <h1 className="text-white text-4xl font-bold font-montserrat">
            {nombre}
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-16 p-8 mr-0">
          {jugadores.map((jugador) => (
            <PlayerCard
              id={jugador.id}
              nombre={jugador.nombre}
              primer_apellido={jugador.primer_apellido}
              grado={jugador.grado}
              curso={jugador.curso}
            />
          ))}
        </div>
      </div>
    </>
  );
}
