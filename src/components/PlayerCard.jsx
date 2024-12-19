import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlayerCard({
  id,
  nombre,
  primer_apellido,
  segundo_apellido,
  grado,
  curso,
  partidos,
  goles,
  photo,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jugador/${id}`, {
      state: {
        id,
        nombre,
        primer_apellido,
        segundo_apellido,
        grado,
        curso,
        partidos,
        goles,
        photo,
      },
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <div
      className="flex flex-col bg-gray-400 bg-opacity-30 border-2 border-white mb-6 rounded-lg bg-grey-700 justify-center shadow-lg md:flex-col items-center gap-4 w-2/5 p-4 transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:-translate-y-5 md:shadow-lg"
      onClick={handleClick}
    >
      <img
        className="object-cover max-w-full max-h-40 rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
        src={`/${photo}`}
        alt=""
      />
      <div className="text-center">
        <h5 className="mb-2 text-2xl font-bold font-montserrat tracking-tight text-gray-900 dark:text-white">
          {nombre}
        </h5>
        <h4 className="mb-2 text-xl font-montserrat italic tracking-tight text-gray-700 dark:text-white">
          {`Goles: ${goles}`}
        </h4>
      </div>
    </div>
  );
}
