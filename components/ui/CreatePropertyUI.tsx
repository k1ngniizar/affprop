import { CreatePropertyInput } from "@/validations";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CreatePropertyUiProps {
  inputType?: string;
  label: string;
  title: keyof CreatePropertyInput;
  control: UseFormRegister<CreatePropertyInput>;
  errors: FieldError | undefined;
  errorMsg: string | undefined;
  imageFile?: File | undefined;
}

export function Textarea({
  label,
  title,
  control,
  errors,
  errorMsg,
}: CreatePropertyUiProps) {
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label}
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
  label,
}: CreatePropertyUiProps) {
  const isInputTypeNumber = inputType === "number";
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label}
      </label>
      <input
        type={inputType}
        id={title}
        {...control(title, {
          valueAsNumber: isInputTypeNumber,
        })}
        placeholder={`Enter property ${title}`}
        className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-lg p-3"
      />

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}
export function FileInput({
  title,
  control,
  errors,
  errorMsg,
  label,
  imageFile,
}: CreatePropertyUiProps) {
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        disabled
        id={title}
        {...control(title, {
          setValueAs: (value = imageFile) => value,
        })}
        placeholder={`Enter property ${title}`}
        className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-lg p-3"
      />

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}
