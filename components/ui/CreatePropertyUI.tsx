import { CreatePropertyInput } from "@/validations";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CreatePropertyUiProps {
  inputType?: string;
  label: string;
  title: keyof CreatePropertyInput;
  control?: UseFormRegister<CreatePropertyInput>;
  handleChange?: () => void;
  errors?: FieldError | string | undefined;
  errorMsg?: string | undefined;
  imageFile?: File | string | undefined;
  selectDropdn?: string[];
  value?: string;
}

export function Textarea({
  label,
  title,
  control,
  errors,
  errorMsg,
  handleChange,
}: CreatePropertyUiProps) {
  const newControl = () => {};
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label}
      </label>
      {control && (
        <textarea
          id={title}
          required
          {...control(title)}
          placeholder={`Enter ${label} description`}
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}
      {handleChange && (
        <textarea
          id={title}
          required
          onChange={handleChange}
          placeholder="Enter property description"
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}

export function Input({
  inputType = "text",
  title,
  control,
  handleChange,
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
      {control && (
        <input
          type={inputType}
          required
          id={title}
          {...control(title, {
            valueAsNumber: isInputTypeNumber,
          })}
          placeholder={`Enter property ${title}`}
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}
      {handleChange && (
        <input
          type={inputType}
          required
          id={title}
          onChange={handleChange}
          placeholder={`Enter property ${title}`}
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}
export function FileInput({
  title,
  control,
  handleChange,
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
      {control && (
        <input
          type="file"
          accept="image/*"
          disabled
          id={title}
          {...control(title, {
            setValueAs: (value = imageFile) => value,
          })}
          placeholder={`Enter property ${title}`}
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}
      {handleChange && (
        <input
          type="file"
          accept="image/*"
          disabled
          id={title}
          onChange={handleChange}
          placeholder={`Enter property ${title}`}
          className="w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-sm p-3"
        />
      )}

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}

export function SelectInput({
  title,
  control,
  handleChange,
  errors,
  errorMsg,
  label,
  selectDropdn,
}: CreatePropertyUiProps) {
  return (
    <div className="flex flex-col flex-1">
      <label className=" text-sm font-bold" htmlFor={title}>
        {label}
      </label>
      {selectDropdn && (
        <>
          {control && (
            <select
              defaultValue={""}
              className="border-accent border-2 p-3 rounded-sm w-full max-w-md"
              {...control(title)}
              id={title}
            >
              <option
                className="text-foreground bg-background hover:bg-accent"
                value=""
                disabled
              >
                Select {label}
              </option>
              {selectDropdn.map((items, idx) => {
                return (
                  <option
                    className="text-foreground bg-background hover:bg-accent"
                    key={idx}
                    value={items}
                  >
                    {items}
                  </option>
                );
              })}
            </select>
          )}
          {handleChange && (
            <select
              defaultValue={""}
              className="border-accent border-2 p-3 rounded-sm w-full max-w-md"
              onChange={handleChange}
              id={title}
            >
              <option
                className="text-foreground bg-background hover:bg-accent"
                value=""
                disabled
              >
                Select {label}
              </option>
              {selectDropdn.map((items, idx) => {
                return (
                  <option
                    className="text-foreground bg-background hover:bg-accent"
                    key={idx}
                    value={items}
                  >
                    {items}
                  </option>
                );
              })}
            </select>
          )}
        </>
      )}

      {errors && <p className="text-red-400">{errorMsg}</p>}
    </div>
  );
}
