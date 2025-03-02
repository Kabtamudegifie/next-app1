"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Character } from "@/models/character.model";
import CharacterCard from "@/components/character/card/CharacterCard";

export default function CharactersPage() {
  const [morties, setMorties] = useState<Character[]>([]);

  const { data: characters, ...charactersState } = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const querySnapshot = await fetch(
        "https://rickandmortyapi.com/api/character"
      );
      if (querySnapshot.ok) {
        return ((await querySnapshot.json()) as any).results;
      }
      return [];
    },
  });

  useEffect(() => {
    if (charactersState.isSuccess) {
      //   const data = localStorage.getItem(MORTY_STORAGE_KEY);
      //     if (data) {
      //       const allData = [
      //         structuredClone(JSON.parse(data)),
      //         structuredClone(characters),
      //       ];
      //       setMorties(allData);
      //     } else {
      setMorties(structuredClone(characters));
      // }
    }
  }, [charactersState.isSuccess]);

  return (
    <div className="flex flex-row flex-wrap gap-x-6 gap-y-7">
      {charactersState.isLoading && <p>Loading...</p>}
      {characters && characters.length > 0 && (
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-7">
          {morties.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
