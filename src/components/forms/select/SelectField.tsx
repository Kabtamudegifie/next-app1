import React, { SelectHTMLAttributes } from "react";
import FormControl from "../FormControl";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
export default function SelectField({ label, error, options, ...rest }: Props) {
  return (
    <FormControl label={label} error={error}>
      <select className="border p-2 w-full rounded" {...rest}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormControl>
  );
}
