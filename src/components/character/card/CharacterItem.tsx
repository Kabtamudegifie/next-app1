import React from "react";
interface Props {
  label: string;
  value: React.ReactNode;
}
export default function CharacterItem({ label, value }: Props) {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
