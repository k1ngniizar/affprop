import { CreatePropertyInput } from "@/validations";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CreatePropertyUiProps {
  inputType?: string;
  label: string;
  title: keyof CreatePropertyInput;
  control?: UseFormRegister<CreatePropertyInput>;
  handleChange?:
    | ((e: ChangeEvent<HTMLInputElement>) => void)
    | ((e: ChangeEvent<HTMLSelectElement>) => void)
    | ((e: ChangeEvent<HTMLTextAreaElement>) => void);
  errors?: FieldError | string | undefined;
  errorMsg?: string | undefined;
  imageFile?: File | string | undefined;
  selectDropdn?: string[];
  value?: string | number;
}

export function Textarea({
  label,
  title,
  control,
  errors,
  errorMsg,
  value,
  handleChange,
}: CreatePropertyUiProps) {
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label} {title}
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
          name={title}
          value={value}
          id={title}
          required
          onChange={handleChange as ChangeEventHandler<HTMLTextAreaElement>}
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
  value,
}: CreatePropertyUiProps) {
  const isInputTypeNumber = inputType === "number";
  return (
    <div>
      <label className=" text-sm font-bold" htmlFor={title}>
        {label} {title}
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
          name={title}
          value={isInputTypeNumber ? value || 0 : value}
          type={inputType}
          required
          id={title}
          onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
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
          onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
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
  value,
}: CreatePropertyUiProps) {
  return (
    <div className="flex flex-col flex-1">
      <label className=" text-sm font-bold" htmlFor={title}>
        {label} {title}
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
              value={value}
              name={title}
              className="border-accent border-2 p-3 rounded-sm w-full max-w-md"
              onChange={handleChange as ChangeEventHandler<HTMLSelectElement>}
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
