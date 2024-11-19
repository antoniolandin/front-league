//  Función para obtener todos los equipos
export const fetchEquipos = async () => {
  try {
    const response = await fetch("/api/equipos/");
    if (!response.ok) {
      throw new Error("Error al obtener los equipos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchEquipos:", error);
    throw error;
  }
};

// Función para obtener un equipo por ID
export const fetchEquipoById = async (id) => {
  try {
    const response = await fetch(`/api/equipos/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el equipo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchEquipoById:", error);
    throw error;
  }
};

// Función para obtener los jugadores de un equipo
export const fetchJugadoresDeEquipo = async (idEquipo) => {
  try {
    const response = await fetch(`/api/equipos/${idEquipo}/jugadores/`);
    if (!response.ok) {
      throw new Error("Error al obtener los jugadores del equipo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchJugadoresDeEquipo:", error);
    throw error;
  }
};
