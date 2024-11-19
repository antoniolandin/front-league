//  Función para obtener todos los equipos
export const fetchEquipos = async () => {
    try {
        // obtenemos la url de la api de las variables de entorno
        const url = process.env.REACT_APP_API_URL;
        
        const response = await fetch(`${url}/api/equipos`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const teams = await response.json();

        return teams;
    } catch (error) {
        console.error('Error fetching teams:', error);

        return null; // or you can return an empty array or any other fallback
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
