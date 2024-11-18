#!/bin/bash

 curl -X POST "http://localhost:3000/api/equipos" -H "Content-Type: application/json" -d '{"nombre":"Wolfram City"}'

 curl -X POST "http://localhost:3000/api/jugadores" -H "Content-Type: application/json" -d '{"id_equipo":1, "nombre":"Antonio"}'
