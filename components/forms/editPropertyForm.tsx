"use client";
import { editPropertyProps } from "@/app/dashboard/properties/[propertyId]/edit/page";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Textarea, SelectInput } from "../ui/CreatePropertyUI";
import { LISTING_TYPE_VALUES, PROPERTY_TYPE_VALUES } from "@/constants";
import { LucideCheck } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import toast from "react-hot-toast";
import { updatePropertyAction } from "@/actions/property.actions";
import { useRouter } from "next/navigation";
import { PropertySchema } from "@/models/property.model";

interface editPropertyDetailsProps {
  property: editPropertyProps;
}

function EditPropertyForm({ property }: editPropertyDetailsProps) {
  const router = useRouter();
  const [editPropertyDetails, setEditPropertyDetails] = useState(property);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(
    editPropertyDetails.images?.url,
  );
  console.log("Edit property details:: ", editPropertyDetails);

  const checkImage = !!image;

  const getComparableDetails = (details: editPropertyProps) => ({
    title: details.title ?? "",
    description: details.description ?? "",
    price: Number(details.price) || 0,
    propertyType: details.propertyType ?? "",
    listingType: details.listingType ?? "",
    bedrooms: Number(details.bedrooms) || 0,
    bathrooms: Number(details.bathrooms) || 0,
    parking: Number(details.parking) || 0,
    area: Number(details.area) || 0,
    images: {
      publicId: details.images?.publicId ?? "",
      url: details.images?.url ?? "",
    },
    location: {
      address: details.location?.address ?? "",
      city: details.location?.city ?? "",
      state: details.location?.state ?? "",
      country: details.location?.country ?? "",
      latitude: Number(details.location?.latitude) || 0,
      longitude: Number(details.location?.longitude) || 0,
    },
  });

  const checkDetailsChange =
    JSON.stringify(getComparableDetails(property)) !==
    JSON.stringify(getComparableDetails(editPropertyDetails));

  const checkForChange = checkDetailsChange || checkImage;

  useEffect(() => {
    if (!image) return;

    // if ()
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;
    if (!file) return;
    const imageFile = file?.[0];
    setImage(imageFile);
  };

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value, name } = e.currentTarget;
    console.log(value);
    console.log(name);
    const checkName = [
      "address",
      "city",
      "state",
      "country",
      "latitude",
      "longitude",
    ].includes(name);
    if (checkName) {
      setEditPropertyDetails((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
      return;
    }
    setEditPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkForChange) {
      toast.error("No changes detected!");
      return;
    }

    if (!!image) {
      const uploadedImageData = await uploadImage(image);
      if (uploadedImageData.error) {
        toast.error(uploadedImageData.message);
        return;
      }

      const uploadedImage = {
        publicId: uploadedImageData.publicId,
        url: uploadedImageData.url,
      };

      // console.log("Check image upload:: ", uploadedImage);

      const updatedDetails: Partial<PropertySchema> = {
        title: editPropertyDetails.title,
        description: editPropertyDetails.description,
        price: Number(editPropertyDetails.price),
        propertyType: editPropertyDetails.propertyType,
        listingType: editPropertyDetails.listingType,
        bedrooms: Number(editPropertyDetails.bedrooms),
        bathrooms: Number(editPropertyDetails.bathrooms),
        parking: Number(editPropertyDetails.parking),
        area: Number(editPropertyDetails.area),
        images: uploadedImage,
        location: {
          address: editPropertyDetails.location?.address,
          city: editPropertyDetails.location?.city,
          state: editPropertyDetails.location?.state,
          country: editPropertyDetails.location?.country,
          latitude: Number(editPropertyDetails.location?.latitude),
          longitude: Number(editPropertyDetails.location?.longitude),
        },
      };

      console.log("Check updated detaials image present:: ", updatedDetails);

      // await updatePropertyAction(editPropertyDetails._id, updatedDetails);
    } else {
      const updatedDetails: Partial<PropertySchema> = {
        title: editPropertyDetails.title,
        description: editPropertyDetails.description,
        price: Number(editPropertyDetails.price),
        propertyType: editPropertyDetails.propertyType,
        listingType: editPropertyDetails.listingType,
        bedrooms: Number(editPropertyDetails.bedrooms),
        bathrooms: Number(editPropertyDetails.bathrooms),
        parking: Number(editPropertyDetails.parking),
        area: Number(editPropertyDetails.area),
        images: editPropertyDetails.images,
        location: {
          address: editPropertyDetails.location?.address,
          city: editPropertyDetails.location?.city,
          state: editPropertyDetails.location?.state,
          country: editPropertyDetails.location?.country,
          latitude: Number(editPropertyDetails.location?.latitude),
          longitude: Number(editPropertyDetails.location?.longitude),
        },
      };
      console.log("Check updated detaials:: ", updatedDetails);
      // await updatePropertyAction(editPropertyDetails._id, updatedDetails);
    }

    toast.success("Updated successfully");

    console.log("submitted");
    router.push("/dashboard/properties");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1>EditPropertyForm</h1>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2>General Information</h2>
        <div className="space-y-3">
          <Input
            value={editPropertyDetails.title || ""}
            label="Title"
            title="title"
            handleChange={handleInputChange}
          />
          <Textarea
            value={editPropertyDetails.description || ""}
            label="Description"
            title="description"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.price || ""}
            label="Price"
            inputType="number"
            title="price"
            handleChange={handleInputChange}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Specifications</h2>
        <div className="flex gap-3">
          <Input
            value={editPropertyDetails.bedrooms || ""}
            label="Bedrooms"
            inputType="number"
            title="bedrooms"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.bathrooms || ""}
            label="Bathrooms"
            inputType="number"
            title="bathrooms"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.parking || ""}
            label="Parking space"
            inputType="number"
            title="parking"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.area || ""}
            label="Area"
            inputType="number"
            title="area"
            handleChange={handleInputChange}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Listing preference</h2>
        <div className="flex gap-3">
          <SelectInput
            value={editPropertyDetails.propertyType}
            selectDropdn={PROPERTY_TYPE_VALUES}
            label="Property type"
            title="propertyType"
            handleChange={handleInputChange}
          />
          <SelectInput
            value={editPropertyDetails.listingType}
            selectDropdn={LISTING_TYPE_VALUES}
            label="Listing type"
            title="listingType"
            handleChange={handleInputChange}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            value={editPropertyDetails?.location?.address || ""}
            label="Property address"
            title="address"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.location?.city || ""}
            label="Property city"
            title="city"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.location?.state || ""}
            label="Property state"
            title="state"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.location?.country || ""}
            label="Property country"
            title="country"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.location?.latitude || ""}
            inputType="number"
            label="Property latitude"
            title="latitude"
            handleChange={handleInputChange}
          />
          <Input
            value={editPropertyDetails.location?.longitude || ""}
            inputType="number"
            label="Property longitude"
            title="longitude"
            handleChange={handleInputChange}
          />
        </div>
      </div>
      <div className="relative border border-zinc-700 bg-black rounded-sm p-4 space-y-4">
        <h2 className="text-2xl font-bold">Image upload</h2>
        <div className="border border-zinc-700 max-w-lg mx-auto flex-col flex h-100 rounded-sm overflow-hidden">
          <div className="flex-1 overflow-hidden flex items-center justify-center">
            {!imagePreview && <p>Select an image to Preview</p>}
            {imagePreview && (
              <img src={imagePreview} className="w-full h-full" />
            )}
          </div>
          <div className="p-4">
            <label className=" font-bold" htmlFor="image">
              Add image
            </label>
            <input
              id="image"
              onChange={handleImageChange}
              type="file"
              className=" w-full border-zinc-700 border-2 outline-0 focus:border-zinc-400 rounded-lg p-3 object-cover"
            />
            {/* {err && <p className="text-red-400">Please select an image.</p>} */}
          </div>
        </div>
      </div>
      <button className="border w-full p-2 flex gap-1 justify-center items-center rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300">
        <div>
          <LucideCheck />
        </div>
        Edit Listing
      </button>
    </form>
  );
}

export default EditPropertyForm;
