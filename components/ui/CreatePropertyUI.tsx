import { CreatePropertyInput } from "@/validations";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextareaProps {
  inputType?: string;
  title: keyof CreatePropertyInput;
  control: UseFormRegister<CreatePropertyInput>;
  errors?: FieldError | undefined;
  errorMsg?: string | undefined;
}

export function Textarea({ title, control, errors, errorMsg }: TextareaProps) {
  return (
    <div>
      <label className="uppercase text-xs font-bold" htmlFor={title}>
        {title}
      </label>
      <textarea
        id={title}
        {...control(title)}
        placeholder="Enter property description"
        className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-lg p-3"
      />

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}

export function Input({
  inputType = "text",
  title,
  control,
  errors,
  errorMsg,
}: TextareaProps) {
  return (
    <div>
      <label className="uppercase text-sm font-bold" htmlFor={title}>
        {title}
      </label>
      <input
        type={inputType}
        id={title}
        {...control(title)}
        placeholder="Enter property title"
        className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-lg p-3"
      />

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}
