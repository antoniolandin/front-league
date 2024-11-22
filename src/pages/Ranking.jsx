import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchEquipos } from "../services/teams.js";
import { useState } from "react";
import TeamCard from "../components/TeamCard.jsx";

const Ranking = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var posicion = 1;

  useEffect(() => {
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchData = async () => {
      try {
        setBackgroundVisible(false);

        // fetch a la url de la api
        const response = await fetch(`http://localhost:3500/api/equipos`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setTeams(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <div className="flex flex-col justify-center mt-12 mb-12">
          {teams.map((team) => (
            <TeamCard
              id={team.id}
              posicion={posicion++}
              nombre={team.nombre}
              puntos={team.puntos}
              partidos_jugados={team.partidos_jugados}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Ranking;
