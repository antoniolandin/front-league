import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";

const FantasyRanking = () => {
    const [backgroundVisible, setBackgroundVisible] = useState(false);
    const [teamsFantasy, setTeamsFantasy] = useState([]);
    const [loading, setLoading] = useState(true);
    var posicion = 1;
    var partidos_jugados;

    useEffect(() => {
      setBackgroundVisible(false);
      setTimeout(() => {
        setBackgroundVisible(true);
      }, 500)

      const fetchData = async () => {
        try {
            // fetch a la url de la api
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3500/api/fantasy_equipos`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            setTeamsFantasy(result);
            console.log(result);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
      }

      fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    
    return (
        <>
            <Navbar />
            <div
                className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
                style={{ backgroundImage: 'url("/fondo2.png")', zIndex: -1 }}
            ></div>
            <div className="ranking-contenedor">
                {teamsFantasy.map((teamFantasy) => (
                    <TeamCard 
                        id={teamFantasy.id}
                        nombre={teamFantasy.nombre}
                        puntos={teamFantasy.puntos}
                        partidos_jugados={partidos_jugados}
                        posicion={posicion++}
                    />
                ))}
            </div>
        </>
    );
}

export default FantasyRanking;
