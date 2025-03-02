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
          "bg-green-500": status === "Alive",
          "bg-red-500 ": status === "Dead",
          "bg-gray-500": !!status,
        }
      )}
    >
      <span>{status}</span>
    </div>
  );
}
