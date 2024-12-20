import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './AddFantasyCard.css';

const AddFantasyCard = ({ id, precio, nombre, id_equipo, onAdd }) => {
    const [equipo, setEquipo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipo = async () => {
            const response = await fetch(`http://localhost:3500/api/equipos/${id_equipo}`);

            if (!response.ok) {
                throw new Error("Error al obtener el equipo");
            }
            const data = await response.json();
            setEquipo(data);
        }

        fetchEquipo();
    }, [])

    return (
        <>
            <div className="add-fantasy-contenedor" onClick={onAdd}>
                <div className="add-fantasy-nombre">{nombre}</div>
                <div className="add-fantasy-equipo">{equipo.nombre}</div>
                <div className="add-fantasy-precio">{precio}</div>
            </div>
        </>
    );
}

export default AddFantasyCard;
