/* eslint-disable react-hooks/exhaustive-deps */
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
  const router = useRouter();
  const fetchCharacters = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageParam}`
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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

  const openDeleteModal = () => {
    setIsModalOpen(true);
    //TODO: I can't get delete api
  };
  const onDeleteHandler = () => {};

  useEffect(() => {
    if (charactersState.isSuccess) {
      const charactersData = characters?.pages
        .map((v) => v.results)
        .reduce((acc, curr) => acc.concat(curr), []);

      const data = localStorage.getItem(MORTY_STORAGE_KEY);
      if (data) {
        const allData = [
          structuredClone(JSON.parse(data)),
          structuredClone(charactersData),
        ];
        setMorties(allData);
      } else {
        setMorties(structuredClone(charactersData));
      }
    }
  }, [charactersState.isSuccess]);

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
      {charactersState.isLoading && <p>Loading...</p>}
      {morties.length > 0 && (
        <div className="flex flex-row justify-center flex-wrap gap-x-6 gap-y-7">
          {morties.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              //   onDeleteModalShow={() => openDeleteModal(character.id)}
              onDeleteModalShow={openDeleteModal}
            />
          ))}
        </div>
      )}
      <button
        onClick={() => charactersState.fetchNextPage()}
        disabled={
          !charactersState.hasNextPage || charactersState.isFetchingNextPage
        }
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
