import React from "react";

export default function MatchCard({
  equipo_uno,
  equipo_dos,
  equipo_ganador,
  goles_uno,
  goles_dos,
  fecha,
}) {
  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between bg-greenCard bg-opacity-40 border border-white-200 rounded-lg p-5 shadow-md">
        <h1 className="text-2xl text-white font-bold font-montserrat">
          {fecha}
          {"  "}
          <span
            className={
              equipo_ganador === equipo_uno ? "text-green-500" : "text-white"
            }
          >
            {equipo_uno}
          </span>{" "}
          -{" "}
          <span
            className={
              equipo_ganador === equipo_dos ? "text-green-500" : "text-white"
            }
          >
            {equipo_dos}
          </span>
        </h1>
        <h1 className="text-xl text-white font-bold font-montserrat mt-1">
          Resultado: {goles_uno} - {goles_dos}
        </h1>
      </div>
    </div>
  );
}
