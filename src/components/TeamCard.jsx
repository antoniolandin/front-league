import React from "react";

export default function TeamCard({ nombre, puntos, partidos_jugados }) {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between bg-greenCard bg-opacity-40 border border-white-200 rounded-lg p-5 shadow-md">
        <h1 className="text-2xl text-white font-bold font-montserrat">
          {nombre}
        </h1>
        <h1 className="text-xl text-white font-semibold font-montserrat mt-1">
          Puntos: {puntos}
        </h1>
      </div>
    </div>
  );
}
