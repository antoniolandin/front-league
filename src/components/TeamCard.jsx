import React from "react";
import PlayerCard from "./PlayerCard";

export default function TeamCard({ name, players, matches, wins, losses, points }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold font-montserrat mb-4">{name}</h1>
      <div className="flex flex-wrap justify-center">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            name={player.name}
            team={player.team}
            position={player.position}
            points={player.points}
            photo={player.photo}
          ></PlayerCard>
        ))}
      </div>
    </div>
  );
}
