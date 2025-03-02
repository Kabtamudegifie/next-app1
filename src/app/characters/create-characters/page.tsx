"use client";
import { MORTY_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

enum Status {
  DEAD = "Dead",
  ALIVE = "Alive",
  UNKNOWN = "Unknown",
}
export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>(Status.UNKNOWN);
  const [species, setSpecies] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const clearForm = () => {
    setImageUrl("");
    setName("");
    setSpecies("");
    setStatus(Status.UNKNOWN);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([status, species, imageUrl, name].some((v) => !v)) {
      return;
    }
    const data = JSON.stringify({
      status,
      species,
      imageUrl,
      name,
    });

    localStorage.setItem(MORTY_STORAGE_KEY, data);
    clearForm();
    router.push("/characters");
  };

  return (
    <div className="flex flex-col gap-6 h-screen w-full items-center justify-center">
      <h1>Add new character</h1>
      <form className="flex flex-col gap-6 w-1/2" onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Name"
        />
        <select onSelect={(e) => setStatus(e.currentTarget.value as Status)}>
          <option value={Status.ALIVE}>{Status.ALIVE}</option>
          <option value={Status.DEAD}>{Status.DEAD}</option>
          <option value={Status.UNKNOWN}>{Status.UNKNOWN}</option>
        </select>
        <input
          value={species}
          onChange={(e) => setSpecies(e.currentTarget.value)}
          placeholder="Species"
        />

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.currentTarget.value)}
          placeholder="Image url"
        />
        <button
          type="submit"
          className="bg-green-400 px-6 py-2 rounded-lg text-lg font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
}
