"use client";
import { CreatePropertyInput, createPropertySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function PropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
  });

  async function onSubmit(data: CreatePropertyInput) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          {...register("title")}
          placeholder="Enter property title"
          className="w-full border rounded-lg p-3"
        />

        {errors.title && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          {...register("description")}
          placeholder="Enter property description"
          className="w-full border rounded-lg p-3"
        />

        {errors.description && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          {...register("price")}
          placeholder="Enter property price"
          className="w-full border rounded-lg p-3"
        />

        {errors.price && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="bedrooms"
          {...register("bedrooms")}
          placeholder="Enter property bedrooms"
          className="w-full border rounded-lg p-3"
        />

        {errors.bedrooms && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="bathrooms"
          {...register("bathrooms")}
          placeholder="Enter property bathrooms"
          className="w-full border rounded-lg p-3"
        />

        {errors.bathrooms && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="parking">parking:</label>
        <input
          type="number"
          id="parking"
          {...register("parking")}
          placeholder="Enter property parking"
          className="w-full border rounded-lg p-3"
        />

        {errors.parking && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="area">Area:</label>
        <input
          type="number"
          id="area"
          {...register("area")}
          placeholder="Enter property area"
          className="w-full border rounded-lg p-3"
        />

        {errors.area && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
    </form>
  );
}

export default PropertyForm;
