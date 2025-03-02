import React, { InputHTMLAttributes } from "react";
import FormControl from "../FormControl";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export default function Textfield({ label, error, ...rest }: Props) {
  return (
    <FormControl label={label} error={error}>
      <input {...rest} className="border p-2 w-full rounded" />
    </FormControl>
  );
}
