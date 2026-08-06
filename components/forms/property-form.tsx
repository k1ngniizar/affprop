"use client";
import { CreatePropertyInput, createPropertySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "../ui/CreatePropertyUI";

function PropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
  });

  async function onSubmit(data: CreatePropertyInput) {
    console.log(data);
  }

  return (
    <form className="grid grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="title"
        control={register}
        errors={errors.title}
        errorMsg={errors.title?.message}
      />
      <Textarea
        title="description"
        control={register}
        errors={errors.description}
        errorMsg={errors.description?.message}
      />
      {/* <Input
        inputType="number"
        title="price"
        control={register}
        errors={errors.price}
        errorMsg={errors.price?.message}
      /> */}
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          {...register("price")}
          placeholder="Enter property price"
          className="w-full border rounded-lg p-3"
        />

        {errors.price && <p className="text-red-400">{errors.price.message}</p>}
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
      <div>
        <label htmlFor="propertyType">Property type:</label>
        <input
          id="propertyType"
          {...register("propertyType")}
          placeholder="Enter property propertyType"
          className="w-full border rounded-lg p-3"
        />

        {errors.propertyType && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="listingType">Listing type:</label>
        <input
          id="listingType"
          {...register("listingType")}
          placeholder="Enter property listing type"
          className="w-full border rounded-lg p-3"
        />

        {errors.listingType && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="location">Listing type:</label>
        <input
          id="location"
          {...register("location")}
          placeholder="Enter property listing type"
          className="w-full border rounded-lg p-3"
        />

        {errors.location && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="images">Listing type:</label>
        <input
          id="images"
          {...register("images")}
          placeholder="Enter property listing type"
          className="w-full border rounded-lg p-3"
        />

        {errors.images && (
          <p className="text-red-400">
            First name must be longer than two letters
          </p>
        )}
      </div>
      <button
        className="border w-full p-2 rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300"
        disabled={isSubmitting}
      >
        Create property
      </button>
    </form>
  );
}

export default PropertyForm;
