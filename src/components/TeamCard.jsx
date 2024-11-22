import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamCard({ id, nombre, puntos, partidos_jugados }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/equipo/${id}`, { state: { nombre, puntos, partidos_jugados } });
  };

  return (
    <div className="container mx-auto mt-4 " onClick={handleClick}>
      <div className="flex justify-between bg-greenCard bg-opacity-40 border border-white-200 rounded-lg p-5 shadow-md">
        <h1 className="text-2xl text-white font-bold font-montserrat">
          {nombre}
        </h1>
        <h1 className="text-xl text-white text-bold font-montserrat mt-1">
          Puntos: {puntos}
        </h1>
      </div>
    </div>
  );
}
