import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchEquipos } from "../services/teams.js"
import { useState } from "react";

const Ranking = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch a la url de la api
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/equipos`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setTeams(result); // Assuming result is an array of locations
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
