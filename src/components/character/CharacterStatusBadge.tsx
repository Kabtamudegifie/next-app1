import { Status } from "@/models/character.model";
import clsx from "clsx";
import React from "react";
interface Props {
  status: Status;
}
export default function CharacterStatusBadge({ status }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-row items-center uppercase px-6 py-1 rounded-md text-white",
        {
          "bg-green-600": status === "Alive",
          "bg-red-600 ": status === "Dead",
          "bg-gray-600": !!status,
        }
      )}
    >
      <span>{status}</span>
    </div>
  );
}
