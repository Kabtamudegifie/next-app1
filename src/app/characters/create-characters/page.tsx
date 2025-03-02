"use client";
import { MORTY_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Textfield from "@/components/forms/input/Textfield";
import SelectField from "@/components/forms/select/SelectField";

enum Status {
  DEAD = "Dead",
  ALIVE = "Alive",
  UNKNOWN = "Unknown",
}

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

  const onSubmit = (data: FormValues) => {
    const newMorty = JSON.stringify({
      status: data.status,
      species: data.species,
      imageUrl: data.imageUrl,
      name: data.name,
    });

    localStorage.setItem(MORTY_STORAGE_KEY, newMorty);
    router.push("/characters");
  };

  return (
    <div className="flex flex-col gap-6 h-screen w-full items-center justify-center">
      <h1>Add new character</h1>
      <form
        className="flex flex-col gap-6 w-1/2"
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
