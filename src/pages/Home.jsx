import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";

const Home = () => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proximosPartidos, setProximosPartidos] = useState([]);
  const [partidosJugados, setPartidosJugados] = useState([]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "numeric", month: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    const fetchProximosPartidos = async () => {
      try {
        setBackgroundVisible(false);

        const response = await fetch(
          `http://localhost:3500/api/partidos/proximos`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setProximosPartidos(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPartidosJugados = async () => {
      try {
        setBackgroundVisible(false);

        const response = await fetch(`http://localhost:3500/api/partidos/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPartidosJugados(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProximosPartidos();
    fetchPartidosJugados();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
              fecha={formatDate(partido.fecha)}
            />
          ))}
        </div>
        <h2 className="text-4xl font-montserrat font-bold text-white mt-12">
          Próximos partidos
        </h2>
        <div className="flex m-60 flex-col justify-center mt-4 mb-12">
          {proximosPartidos.map((partido) => (
            <MatchCard
              key={partido.id}
              equipo_uno={partido.equipo_uno}
              equipo_dos={partido.equipo_dos}
              equipo_ganador={null}
              goles_uno={null}
              goles_dos={null}
              fecha={formatDate(partido.fecha)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
