import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Ranking = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://d23e-212-0-109-168.ngrok-free.app/api/equipos",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await console.log(response.text());
        setTeams(data);
      } catch (error) {
        throw new Error("Error: " + error.message);
      }
    };

    fetchUsers();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: 'url("/fondo2.png")', zIndex: -999 }}
      ></div>
      <div className="text-center">
        <h1 className="text-6xl font-montserrat font-bold text-white">
          Ranking
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold">{team.nombre}</h2>
              <p>Partidos Jugados: {team.partidos_jugados}</p>
              <p>Victorias: {team.victorias}</p>
              <p>Derrotas: {team.derrotas}</p>
              <p>Empates: {team.empates}</p>
              <p>Puntos: {team.puntos}</p>
              <p>Goles a Favor: {team.goles_favor}</p>
              <p>Goles en Contra: {team.goles_contra}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Ranking;
