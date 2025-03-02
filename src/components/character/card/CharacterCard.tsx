import { Character } from "@/models/character.model";
import Image from "next/image";
import React from "react";
import CharacterItem from "./CharacterItem";
import CharacterBadge from "../CharacterStatusBadge";
import Button from "@/components/forms/button/Button";

interface Props {
  character: Character;
  onDeleteModalShow: () => void;
}
export default function CharacterCard({ character, onDeleteModalShow }: Props) {
  return (
    <div className="flex group flex-col gap-5 rounded-md shadow-lg border border-gray-100/20 w-full">
      <div className="relative w-full rounded-md h-64">
        <Image
          src={character.image}
          className="rounded-md"
          fill
          alt="Character image"
        />
      </div>
      <div className="flex flex-col gap-5 p-4">
        <CharacterItem
          label="Status"
          value={<CharacterBadge status={character.status} />}
        />
        <CharacterItem label="Name" value={character.name} />
        <CharacterItem label="Species" value={character.species} />
        {character.fromLocal && (
          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 self-end">
            <Button variant="danger" onClick={onDeleteModalShow}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
