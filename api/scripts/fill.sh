#!/bin/bash
# Description: Script para rellenar la base de datos con los jugadores y equipos por defecto
# Se necesita el servidor de la api levantado

 curl -X POST "http://localhost:3000/api/equipos" -H "Content-Type: application/json" -d '{"nombre":"Wolfram City"}'

 curl -X POST "http://localhost:3000/api/jugadores" -H "Content-Type: application/json" -d '{"id_equipo":1, "nombre":"Antonio", "primer_apellido":"Cabrera"}'
 curl -X POST "http://localhost:3000/api/jugadores" -H "Content-Type: application/json" -d '{"id_equipo":1, "nombre":"Antonio", "primer_apellido":"Pérez"}'
 curl -X POST "http://localhost:3000/api/jugadores" -H "Content-Type: application/json" -d '{"id_equipo":1, "nombre":"Alvaro", "primer_apellido":"Salís"}'
