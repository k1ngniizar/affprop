import { editPropertyProps } from "@/app/dashboard/properties/[propertyId]/edit/page";
import React, { useState } from "react";
import { Input, Textarea, SelectInput } from "../ui/CreatePropertyUI";
import { LISTING_TYPE_VALUES, PROPERTY_TYPE_VALUES } from "@/constants";

interface editPropertyFormProps {
  property: editPropertyProps;
}

function EditPropertyForm({ property }: editPropertyFormProps) {
  const [editPropertyForm, setEditPropertyForm] = useState(property);

  const handleInputChange = () => {};
  const handleTextareaChange = () => {};
  const handleSelectChange = () => {};
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1>EditPropertyForm</h1>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2>General Information</h2>
        <div className="space-y-3">
          <Input
            value={property.title}
            label="Title"
            title="title"
            handleChange={handleInputChange}
          />
          <Textarea
            label="Description"
            title="description"
            handleChange={handleTextareaChange}
          />
          <Input
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
            label="Bedrooms"
            inputType="number"
            title="bedrooms"
            handleChange={handleInputChange}
          />
          <Input
            label="Bathrooms"
            inputType="number"
            title="bathrooms"
            handleChange={handleInputChange}
          />
          <Input
            label="Parking space"
            inputType="number"
            title="parking"
            handleChange={handleInputChange}
          />
          <Input
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
            selectDropdn={PROPERTY_TYPE_VALUES}
            label="Property type"
            title="propertyType"
            handleChange={handleSelectChange}
          />
          <SelectInput
            selectDropdn={LISTING_TYPE_VALUES}
            label="Listing type"
            title="listingType"
            handleChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="border border-zinc-700 rounded-sm p-4 bg-black space-y-4">
        <h2 className="text-2xl font-bold">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Property address"
            title="address"
            handleChange={handleInputChange}
          />
          <Input
            label="Property city"
            title="city"
            handleChange={handleInputChange}
          />
          <Input
            label="Property state"
            title="state"
            handleChange={handleInputChange}
          />
          <Input
            label="Property country"
            title="country"
            handleChange={handleInputChange}
          />
          <Input
            inputType="number"
            label="Property latitude"
            title="latitude"
            handleChange={handleInputChange}
          />
          <Input
            inputType="number"
            label="Property longitude"
            title="longitude"
            handleChange={handleInputChange}
          />
        </div>
      </div>
      <button className="border w-full p-2 rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300">
        Submit
      </button>
    </form>
  );
}

export default EditPropertyForm;
