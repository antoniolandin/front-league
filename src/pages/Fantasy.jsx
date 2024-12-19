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
  const [fantasy, setFantasy] = useState([]);

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    setBackgroundVisible(false);

    const fetchFantasy = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3500/api/fantasy_equipos/equipo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setFantasy(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchJugadores = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_equipo = fantasy.id;
        const response = await fetch(
          `http://localhost:3500/api/fantasy_equipos/${id}/jugadores`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setJugadores(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFantasy();
    fetchJugadores();

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
        <div
          className={`place-items-center grid ${jugadores.length % 3 === 0 ? "grid-cols-3" : "grid-cols-3 justify-items-center"} gap-4 mt-16 p-8`}
        >
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
