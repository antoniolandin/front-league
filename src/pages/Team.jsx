import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
const Team = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPlayers = async (ruta) => {
      try {
        const response = await fetch(ruta);
        if (!response.ok) throw new Error("No se han encontrado los jugadores");

        const data = await response.json();
        console.log(data);
        if (isMounted) setPlayers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayers("/data.json");

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="text-center">
        <h1 className="text-6xl font-montserrat font-bold text-white">
          My Team
        </h1>
        <TeamCard players={players} />
      </div>
    </>
  );
};

export default Team;
