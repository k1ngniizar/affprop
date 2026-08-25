"use client";
import { useParams } from "next/navigation";
// import { editPropertyProps } from "./edit/page";
import { useEffect, useState } from "react";
import { getPropertyAction } from "@/actions/property.actions";
import PropertyDetailsPage from "@/components/PropertyDetailsPage";
import { editPropertyProps } from "@/app/dashboard/properties/[propertyId]/edit/page";

function PropertyPreviewPage() {
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
  return (
    <div>
      {!property && <p>Loading...</p>}
      {property && <PropertyDetailsPage property={property} />}
    </div>
  );
}

export default PropertyPreviewPage;
