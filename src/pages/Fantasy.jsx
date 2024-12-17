import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PlayerCard from "../components/PlayerCard";

export default function Fantasy() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const { id } = useParams();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchData = async () => {
      try {
        setBackgroundVisible(false);

        const token = "tu_token_aqui"; // Reemplaza esto con tu token real

        const response = await fetch(
          `http://localhost:3500/api/fantasy_equipos/equipo`,
          {
            method: "GET", // Método de la solicitud
            headers: {
              "Content-Type": "application/json", // Tipo de contenido
              Authorization: `Bearer ${token}`, // Agrega el token aquí
            },
          },
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
            Fantasy
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
