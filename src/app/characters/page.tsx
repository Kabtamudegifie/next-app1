"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Character } from "@/models/character.model";
import CharacterCard from "@/components/character/card/CharacterCard";
import { Modal } from "@/components/modals/Modal";
import { MORTY_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/navigation";

export default function CharactersPage() {
  const [morties, setMorties] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  const router = useRouter();
  const fetchCharacters = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageParam}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const results = await res.json();
    return results;
  };

  const { data: characters, ...charactersState } = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPages = Math.ceil(lastPage.total / 3);
      const nextPage = pages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    getPreviousPageParam: (_firstPage, pages) => {
      return pages.length > 1 ? pages.length - 1 : undefined;
    },
  });

  const openDeleteModal = (character: Character) => {
    setIsModalOpen((prev) => {
      setSelectedCharacter(character);
      return !prev;
    });
  };

  const onDeleteHandler = () => {
    if (!selectedCharacter) return;
    const data = localStorage.getItem(MORTY_STORAGE_KEY);
    if (selectedCharacter.fromLocal && data) {
      try {
        const localMorties: Character[] = JSON.parse(data);
        const localIndex = localMorties.findIndex(
          (localMorty) => localMorty.id === selectedCharacter.id
        );
        const apiMorties: Character[] = characters?.pages
          .map((v) => v.results)
          .reduce((acc, curr) => acc.concat(curr), []);

        if (localIndex !== -1) {
          localMorties.splice(localIndex, 1);
          const allData: Character[] = [
            ...structuredClone(localMorties),
            ...structuredClone(apiMorties),
          ];
          setMorties(allData);
        }
        setIsModalOpen(false);
      } catch (error) {
        if (error instanceof SyntaxError) {
          setGlobalError("Unable to parse local data.");
        } else {
          setGlobalError("Something went wrong while parsing data.");
        }
      }
    }
  };

  useEffect(() => {
    if (charactersState.isSuccess) {
      const apiCharacters: Character[] = characters?.pages
        .map((v) => v.results)
        .reduce((acc, curr) => acc.concat(curr), []);

      const localCharacters = localStorage.getItem(MORTY_STORAGE_KEY);

      if (localCharacters) {
        const parsedLocalCharacter =
          (JSON.parse(localCharacters) as Character[]) ?? [];

        if (parsedLocalCharacter.length > 0) {
          const allCharacters: Character[] = [
            ...structuredClone(JSON.parse(localCharacters)),
            ...structuredClone(apiCharacters),
          ];
          setMorties(allCharacters);
        }
      } else {
        setMorties(structuredClone(apiCharacters));
      }
    }
  }, [characters?.pages, charactersState.isSuccess]);

  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-screen">
      <div className="flex flex-row gap-6 items-center justify-between">
        <h1 className="font-bold text-lg text-white">Characters</h1>
        <button
          onClick={() => router.push("/characters/create-characters")}
          className="text-white rounded-md p-3 bg-green-400"
        >
          Add new
        </button>
      </div>
      {globalError && <p className="text-red-400">{globalError}</p>}
      {charactersState.isLoading && <p>Loading...</p>}
      {morties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {morties.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              onDeleteModalShow={() => openDeleteModal(character)}
            />
          ))}
        </div>
      )}
      <button
        onClick={() => charactersState.fetchNextPage()}
        disabled={
          !charactersState.hasNextPage || charactersState.isFetchingNextPage
        }
        className="disabled:text-gray-500"
      >
        Load more..
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={onDeleteHandler}
      >
        <h2 className="text-xl font-bold">Delete character</h2>
        <p className="mt-2">
          Are you sure you want to delete the character? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
