"use client";
import { getPropertyAction } from "@/actions/property.actions";
import { dummyProperty } from "@/constants/dummy";
import { PropertySchema } from "@/models/property.model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditPropertyForm from "@/components/forms/editPropertyForm";

export interface editPropertyProps extends PropertySchema {
  _id: string;
}

function EditPropertyPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<editPropertyProps | null>(null);

  useEffect(() => {
    async function getProperty() {
      const data = await getPropertyAction(propertyId as string);
      console.log(data);
      setProperty(data.data);
    }

    getProperty();
  }, []);

  // const property = await getPropertyAction(propertyId);
  // console.log(property);
  return (
    <div>
      <p>{propertyId}</p>
      <h1>EditPropertyPage</h1>
      {!property && <p>Loading...</p>}
      {property && <EditPropertyForm property={property} />}
    </div>
  );
}

export default EditPropertyPage;
