import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
const Team = () => {
  const [players, setPlayers] = useState([]);
  const [currentId, setCurrentId] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    const fetchPlayers = async (ruta) => {
      try {
        const response = await fetch(ruta);
        if (!response.ok) throw new Error("No se han encontrado los jugadores");
        const players = await response.json();
        var id = parseInt(localStorage.getItem("currentId"));
        if (id) {
          setCurrentId(id);
          const filteredPlayers = players.filter((player) =>
            player.owners.includes(id),
          );
          console.log(filteredPlayers);
          setPlayers(filteredPlayers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const changeBack = () => {
      setBackgroundVisible(false);

      const timeout = setTimeout(() => {
        setBackgroundVisible(true);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    };

    fetchPlayers("/players.json");
    changeBack();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: 'url("/fondo1.png")', zIndex: -999 }}
      ></div>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-montserrat font-bold text-white mb-8">
          {currentId ? "My Team" : ""}
        </h1>
        <TeamCard players={players} />
      </div>
    </>
  );
};

export default Team;
