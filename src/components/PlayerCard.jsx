import React from "react";

export default function PlayerCard({
  nombre,
  primer_apellido,
  segundo_apellido,
  grado,
  curso,
  partidos,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className="w-65 flex flex-col items-center bg-white border m-6 mb-0 ml-0 border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 hover:pr-5">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="/profile.jpg"
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nombre}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{team}</p>
        <p className="mb-3 font-light text-gray-700 dark:text-gray-400">
          {grado}
        </p>
        <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-white">
          {curso}
        </h4>
      </div>
    </a>
  );
}
