//Función para obtener todos los jugadores
export const fetchJugadores = async () => {
  try {
    const response = await fetch(`/api/jugadores/`);
    if (!response.ok) {
      throw new Error("Error al obtener los jugadores");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchJugadores:", error);
    throw error;
  }
};

// Función para obtener un jugador por ID
export const fetchJugadorById = async (id) => {
  try {
    const response = await fetch(`/api/jugadores/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el jugador");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchJugadorById:", error);
    throw error;
  }
};
