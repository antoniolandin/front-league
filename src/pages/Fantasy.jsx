import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PlayerCard from "../components/FantasyCard";
import AddFantasyCard from "../components/AddFantasyCard";
import './Fantasy.css';

export default function Fantasy() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const { id } = useParams();
  const [jugadores, setJugadores] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [cartera, setCartera] = useState(0);
  const [addPlayers, setAddPlayers] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    setCartera(localStorage.getItem("cartera"));
    setBackgroundVisible(false);

    const timeout = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    setBackgroundVisible(false);

    const fetchFantasy = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3500/api/fantasy_equipos/equipo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setFantasy(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchJugadores = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_equipo = fantasy.id;
        const response = await fetch(
          `http://localhost:3500/api/fantasy_equipos/${id}/jugadores`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setJugadores(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPlayers = async () => {
      try {
        const response = await fetch(`http://localhost:3500/api/jugadores`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setAllPlayers(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFantasy();
    fetchJugadores();
    fetchAllPlayers();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleRemove = async (id_jugador) => {
    const jugador = await jugadores.find((jugador) => jugador.id === id_jugador);
    const token = await localStorage.getItem("token");
    const response = await fetch(`http://localhost:3500/api/fantasy_equipos/jugadores/${id_jugador}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const precio = parseInt(jugador.precio);
    const cartera_inicial = parseInt(cartera);
    console.log(cartera_inicial, precio);
    setCartera(cartera_inicial + precio);
    localStorage.setItem("cartera", cartera_inicial + precio);
    //document.getElementById(`${jugador.nombre}-${jugador.id}`).classList.add("hidden");

    setJugadores(jugadores.filter(player => player.id !== id_jugador));
  }

  const handleAdd = () => {
    if (!addPlayers && jugadores.length >= 5) {
        alert("No puedes añadir mas jugadores, alcanzaste el máximo de 5");
    } else {
        setAddPlayers(!addPlayers);
    }
    console.log(addPlayers);
  }

  const handleAddNew = (player) => {
    console.log(player);
    const fetchAddPlayer = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3500/api/fantasy_equipos/jugadores`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_equipo_fantasy: fantasy.id,
                id_jugador: player.id,
            })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.cartera);
        setCartera(result.cartera);
        localStorage.setItem("cartera", result.cartera);
        const nuevo_jugador = {
            id: player.id,
            nombre: player.nombre,
            primer_apellido: player.primer_apellido,
            grado: player.grado,
            curso: player.curso,
            precio: player.precio
        }

        setJugadores([...jugadores, nuevo_jugador]);
        setAddPlayers(false);
    }

    fetchAddPlayer();
  }
    
  return (
    <>
      <Navbar></Navbar>
      <div
        className={`fixed inset-0 bg-cover transition-opacity duration-500 ease-in-out ${backgroundVisible ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: 'url("/fondo1.png")', zIndex: -999 }}
      ></div>
      <div className="flex flex-col justify-center mt-12">
        <div className="text-center ">
          <h1 className="text-white text-4xl font-bold font-montserrat">
            Fantasy
          </h1>
          <p className="fantasy-cartera">Dinero: {cartera}</p>
        </div>
        <div
          className={`place-items-center grid ${jugadores.length % 3 === 0 ? "grid-cols-3" : "grid-cols-3 justify-items-center"} gap-4 mt-16 p-8`}
        >
          {jugadores.map((jugador) => (
            <PlayerCard
              id={jugador.id}
              deteccion={`${jugador.nombre}-${jugador.id}`}
              nombre={jugador.nombre}
              primer_apellido={jugador.primer_apellido}
              grado={jugador.grado}
              curso={jugador.curso}
              onRemove={() => handleRemove(jugador.id)}
            />
          ))}
        </div>
        <div className="fantasy-add">
            <button className="fantasy-add-button" onClick={handleAdd}>Añadir Jugadores</button>
        </div>
      </div>
      {addPlayers && (
      <div className="add-player">
        <div className="add-player-close" onClick={handleAdd}>x</div>
        <div className="add-player-panel">
            <div className="add-player-header">
                <p>Dinero: {cartera}</p>
                <p>Nombre</p>
                <p>Equipo</p>
                <p>Precio</p>
            </div>
            {allPlayers.map((player) => (
                <AddFantasyCard 
                    id={player.id}
                    precio={player.precio}
                    nombre={player.nombre}
                    id_equipo={player.id_equipo}
                    onAdd={() => handleAddNew(player)}
                /> 
            ))}
        </div>
        <div className="add-player-bg"></div>
      </div>
      )}
    </>
  );
}
