"use client";
import { MORTY_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Textfield from "@/components/forms/input/Textfield";
import SelectField from "@/components/forms/select/SelectField";
import { Character, Status } from "@/models/character.model";
import Button from "@/components/forms/button/Button";

const formValuesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.nativeEnum(Status, {
    errorMap: () => ({ message: "Status is required" }),
  }),
  species: z.string().min(1, "Species is required"),
  imageUrl: z.string().url("Invalid image URL"),
});

type FormValues = z.infer<typeof formValuesSchema>;

export default function CreateCharacterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    mode: "all",
  });
  const getRandomString = (length = 8) =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length);

  const onSubmit = (data: FormValues) => {
    const prevLocalCharacters = localStorage.getItem(MORTY_STORAGE_KEY);
    const newCharacter: Character = {
      id: getRandomString(),
      status: data.status,
      species: data.species,
      image: data.imageUrl,
      name: data.name,
      fromLocal: true,
    } as Character;
    const parsedPrevLocalCharacters: Character[] = [];
    if (prevLocalCharacters) {
      parsedPrevLocalCharacters.push(
        ...structuredClone(JSON.parse(prevLocalCharacters) ?? [])
      );
      parsedPrevLocalCharacters.push(newCharacter);
    } else {
      parsedPrevLocalCharacters.push(newCharacter);
    }

    const newMorty = JSON.stringify(parsedPrevLocalCharacters);

    localStorage.setItem(MORTY_STORAGE_KEY, newMorty);
    router.push("/characters");
  };

  return (
    <div className="flex flex-col gap-6 h-screen w-full items-center justify-center">
      <h1 className="font-bold text-xl">Add new character</h1>
      <form
        className="flex flex-col gap-6 w-full max-w-lg mx-auto p-4 sm:w-3/4 md:w-2/3 lg:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textfield
          label="Name"
          placeholder="Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <SelectField
          label="Status"
          options={Object.values(Status).map((status) => ({
            label: status,
            value: status,
          }))}
          {...register("status")}
        />
        <Textfield
          label="Species"
          placeholder="Species"
          {...register("species")}
          error={errors.species?.message}
        />

        <Textfield
          label="Image URL"
          placeholder="Image URL"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
