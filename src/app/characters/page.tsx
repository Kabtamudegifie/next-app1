"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { MORTY_STORAGE_KEY } from "@/constants";

export default function CharactersPage() {
  const [morties, setMorties] = useState<any[]>([]);

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
      const data = localStorage.getItem(MORTY_STORAGE_KEY);
      if (data) {
        const allData = [
          structuredClone(JSON.parse(data)),
          structuredClone(characters),
        ];
        setMorties(allData);
      } else {
        setMorties(structuredClone(characters));
      }
    }
  }, [charactersState.isSuccess]);

  return (
    <div className="flex flex-row flex-wrap gap-x-6 gap-y-7">
      {charactersState.isLoading && <p>Loading...</p>}
      {characters && characters.length > 0 && (
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-7">
          {morties.map((character, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 rounded-md shadow-sm border border-gray-100/50 p-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <p>Name:</p>
                <span>{character.name}</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p>Species:</p>
                <span>{character.species}</span>
              </div>
              <Image
                src={character.image}
                width={80}
                height={50}
                alt="Character image"
              />
              <div className="flex flex-row gap-2 items-center">
                <p>Status:</p>
                <div
                  className={clsx(
                    "flex flex-row items-center uppercase px-6 py-1 rounded-md text-white",
                    {
                      "bg-green-500": character.status === "Alive",
                      "bg-red-500 ": character.status === "Dead",
                      "bg-gray-500": !!character.status,
                    }
                  )}
                >
                  <span>{character.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
