"use client";
import React, { useEffect, useState } from "react";
import { Character } from "@/models/character.model";
import CharacterCard from "@/components/character/card/CharacterCard";
import { Modal } from "@/components/modals/Modal";
import { MORTY_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/navigation";
import Button from "@/components/forms/button/Button";
import useGetInfiniteCharacters from "@/hooks/useGetInfiniteCharacters";
import { deleteLocalItemAndMerge, mergeLocalData } from "@/utils/object.util";

export default function CharactersPage() {
  const [morties, setMorties] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  const router = useRouter();

  const { data: characters, ...charactersState } = useGetInfiniteCharacters(
    "https://rickandmortyapi.com/api/character"
  );

  const openDeleteModal = (character: Character) => {
    setSelectedCharacter(() => {
      setIsModalOpen(true);
      return character;
    });
  };

  const onDeleteHandler = () => {
    if (!selectedCharacter) return;
    const data = localStorage.getItem(MORTY_STORAGE_KEY);
    if (selectedCharacter.fromLocal && data) {
      try {
        const apiMorties: Character[] =
          characters?.pages
            .map((v) => v.results)
            .reduce((acc, curr) => acc.concat(curr), []) ?? [];

        const allData = deleteLocalItemAndMerge<Character>(
          apiMorties,
          selectedCharacter
        );
        if (allData) {
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
      const apiCharacters: Character[] =
        characters?.pages
          .map((v) => v.results)
          .reduce((acc, curr) => acc.concat(curr), []) ?? [];

      const mergedCharacters = mergeLocalData(apiCharacters);
      if (mergedCharacters.length > 0) {
        setMorties(mergedCharacters);
      }
    }
  }, [characters?.pages, charactersState.isSuccess]);

  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-screen">
      <div className="flex flex-row gap-6 items-center justify-between">
        <h1 className="font-bold text-lg text-white">Characters</h1>

        <Button onClick={() => router.push("/characters/create-characters")}>
          Add new
        </Button>
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
