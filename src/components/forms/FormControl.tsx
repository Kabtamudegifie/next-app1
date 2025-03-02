import React from "react";
interface Props {
  label?: string;
  error?: string;
  children?: React.ReactNode;
}
export default function FormControl({ label, error, children }: Props) {
  return (
    <div className="flex flex-col gap-1 items-start">
      {label && <span className="font-semibold">{label}</span>}
      {children}
      {error && <span className="text-red-400">{error}</span>}
    </div>
  );
}
