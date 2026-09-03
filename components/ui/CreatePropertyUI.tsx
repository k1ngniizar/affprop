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
      <label className=" text-sm font-bold text-green-400" htmlFor={title}>
        {label}
      </label>
      {control && (
        <textarea
          id={title}
          {...control(title)}
          placeholder={`Enter ${label} description`}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
      <label className=" text-sm font-bold text-green-400" htmlFor={title}>
        {label}
      </label>
      {control && (
        <input
          // type={inputType}
          id={title}
          {...control(title, {
            valueAsNumber: isInputTypeNumber,
          })}
          placeholder={`Enter property ${title}`}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
      <label className=" text-sm font-bold text-green-400" htmlFor={title}>
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
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
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
      <label className=" text-sm font-bold text-green-400" htmlFor={title}>
        {label}
      </label>
      {selectDropdn && (
        <>
          {control && (
            <select
              defaultValue={""}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              {...control(title)}
              id={title}
            >
              <option
                className="text-foreground bg-green-500/10"
                value=""
                disabled
              >
                Select {label}
              </option>
              {selectDropdn.map((items, idx) => {
                return (
                  <option
                    className="text-foreground bg-green-500/10 rounded-sm"
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
              required
              value={value}
              name={title}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              onChange={handleChange as ChangeEventHandler<HTMLSelectElement>}
              id={title}
            >
              <option
                className="text-foreground bg-green-500/10"
                value=""
                disabled
              >
                Select {label}
              </option>
              {selectDropdn.map((items, idx) => {
                return (
                  <option
                    className="text-foreground bg-green-500/10"
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
