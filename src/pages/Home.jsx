import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";

const Home = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchData = async () => {
      try {
        setBackgroundVisible(false);

        const response = await fetch(`http://localhost:3500/api/partidos`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPartidos(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const partidosJugados = partidos.filter(
    (partido) => partido.goles_uno !== null && partido.goles_dos !== null,
  );
  const partidosNoJugados = partidos.filter(
    (partido) => partido.goles_uno === null && partido.goles_dos === null,
  );

  return (
    <>
      <Navbar />
      <div
        className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: 'url("/fondo.png")', zIndex: -999 }}
      ></div>
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-montserrat font-bold text-white">
          Últimos partidos
        </h1>
        <div className="flex flex-col justify-center mt-12 mb-12">
          {partidosJugados.map((partido) => (
            <MatchCard
              key={partido.id}
              equipo_uno={partido.equipo_uno}
              equipo_dos={partido.equipo_dos}
              equipo_ganador={partido.equipo_ganador}
              goles_uno={partido.goles_uno}
              goles_dos={partido.goles_dos}
              fecha={partido.fecha}
            />
          ))}
        </div>
        <h2 className="text-4xl font-montserrat font-bold text-white mt-12">
          Próximos partidos
        </h2>
        <div className="flex flex-col justify-center mt-4 mb-12">
          {partidosNoJugados.map((partido) => (
            <MatchCard
              key={partido.id}
              equipo_uno={partido.equipo_uno}
              equipo_dos={partido.equipo_dos}
              equipo_ganador={partido.equipo_ganador}
              goles_uno={partido.goles_uno}
              goles_dos={partido.goles_dos}
              fecha={partido.fecha}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
