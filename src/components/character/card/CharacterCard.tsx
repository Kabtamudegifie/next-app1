import { Character } from "@/models/character.model";
import Image from "next/image";
import React from "react";
import CharacterItem from "./CharacterItem";
import CharacterBadge from "../CharacterStatusBadge";

interface Props {
  character: Character;
}
export default function CharacterCard({ character }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-md shadow-sm border border-gray-100/20 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="relative w-full rounded-md h-64">
        <Image
          src={character.image}
          className="rounded-md"
          fill
          alt="Character image"
        />
      </div>
      <div className="flex flex-col gap-5 p-4">
        <CharacterItem label="Name" value={character.name} />
        <CharacterItem label="Species" value={character.species} />
        <CharacterItem
          label="Status"
          value={<CharacterBadge status={character.status} />}
        />
      </div>
    </div>
  );
}
