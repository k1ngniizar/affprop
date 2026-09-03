"use client";
import { CreatePropertyInput, createPropertySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, SelectInput, Textarea } from "../ui/CreatePropertyUI";
import { ChangeEvent, useEffect, useState } from "react";
import { LISTING_TYPE_VALUES, PROPERTY_TYPE_VALUES } from "@/constants";
import { uploadImage } from "@/lib/cloudinary";
import toast from "react-hot-toast";
import { createPropertyAction } from "@/actions/property.actions";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

function PropertyForm() {
  const router = useRouter();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
  });

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const file = e.currentTarget.files;
    if (!file) return;
    const imageFile = file?.[0];
    setImage(imageFile);
  };

  async function onSubmit(data: CreatePropertyInput) {
    if (!image) {
      setErr(true);
      return;
    }
    setErr(false);
    console.log({ ...data, image });
    try {
      const uploadedImageData = await uploadImage(image);
      if (uploadedImageData.error) {
        toast.error(uploadedImageData.message);
        return;
      }

      const uploadedImage = {
        publicId: uploadedImageData.publicId,
        url: uploadedImageData.url,
      };
      console.log("Uploaded image:: ", uploadedImage);

      const result = await createPropertyAction(data, uploadedImage);
      console.log(result);
      toast.success("Property listing success.");
      router.push("/dashboard/properties");
    } catch (error) {
      console.log("error in property-form:: ", error);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">General Information</h2>
        <div className="space-y-3">
          <Input
            label="Title"
            title="title"
            control={register}
            errors={errors.title}
            errorMsg={errors.title?.message}
          />
          <Textarea
            label="Description"
            title="description"
            control={register}
            errors={errors.description}
            errorMsg={errors.description?.message}
          />
          <Input
            label="Price"
            inputType="number"
            title="price"
            control={register}
            errors={errors.price}
            errorMsg={errors.price?.message}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Specifications</h2>
        <div className="flex gap-3">
          <Input
            label="Bedrooms"
            inputType="number"
            title="bedrooms"
            control={register}
            errors={errors.bedrooms}
            errorMsg={errors.bedrooms?.message}
          />
          <Input
            label="Bathrooms"
            inputType="number"
            title="bathrooms"
            control={register}
            errors={errors.bathrooms}
            errorMsg={errors.bathrooms?.message}
          />
          <Input
            label="Parking space"
            inputType="number"
            title="parking"
            control={register}
            errors={errors.parking}
            errorMsg={errors.parking?.message}
          />
          <Input
            label="Area"
            inputType="number"
            title="area"
            control={register}
            errors={errors.area}
            errorMsg={errors.area?.message}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Listing preference</h2>
        <div className="flex gap-3">
          <SelectInput
            selectDropdn={PROPERTY_TYPE_VALUES}
            label="Property type"
            title="propertyType"
            control={register}
            errors={errors.propertyType}
            errorMsg={errors.propertyType?.message}
          />
          <SelectInput
            selectDropdn={LISTING_TYPE_VALUES}
            label="Listing type"
            title="listingType"
            control={register}
            errors={errors.listingType}
            errorMsg={errors.listingType?.message}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Property address"
            title="address"
            control={register}
            errors={errors.address}
            errorMsg={errors.address?.message}
          />
          <Input
            label="Property city"
            title="city"
            control={register}
            errors={errors.city}
            errorMsg={errors.city?.message}
          />
          <Input
            label="Property state"
            title="state"
            control={register}
            errors={errors.state}
            errorMsg={errors.state?.message}
          />
          <Input
            label="Property country"
            title="country"
            control={register}
            errors={errors.country}
            errorMsg={errors.country?.message}
          />
          <Input
            inputType="number"
            label="Property latitude"
            title="latitude"
            control={register}
            errors={errors.latitude}
            errorMsg={errors.latitude?.message}
          />
          <Input
            inputType="number"
            label="Property longitude"
            title="longitude"
            control={register}
            errors={errors.longitude}
            errorMsg={errors.longitude?.message}
          />
        </div>
      </div>

      <div className="relative border border-zinc-700 bg-black rounded-sm p-4 space-y-4">
        <h2 className="text-2xl font-bold">Image upload</h2>
        <div className="border border-green-500/50 max-w-lg mx-auto flex-col flex h-100 rounded-sm overflow-hidden">
          <div className="flex-1 overflow-hidden flex items-center justify-center">
            {!imagePreview && (
              <p className="text-gray-400">Select an image to Preview</p>
            )}
            {imagePreview && (
              <img src={imagePreview} className="w-full h-full" />
            )}
          </div>
          <div className="p-4">
            <label
              className=" font-bold text-sm text-green-400"
              htmlFor="image"
            >
              Add image
            </label>
            <div className="flex gap-1 text-green-500/50 items-center">
              <label
                htmlFor="image"
                className="bg-green-500/10 rounded-sm border p-3"
              >
                <Upload className="h-4 w-4 " />
              </label>
              <input
                id="image"
                onChange={handleImageChange}
                type="file"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
            </div>
            {err && <p className="text-red-400">Please select an image.</p>}
          </div>
        </div>
      </div>

      <button
        className="border w-full p-2 rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create property"}
      </button>
    </form>
  );
}

export default PropertyForm;
