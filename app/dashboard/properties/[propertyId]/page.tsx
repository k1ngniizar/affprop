"use client";
import { useParams } from "next/navigation";
import { editPropertyProps } from "./edit/page";
import { useEffect, useState } from "react";
import { getPropertyAction } from "@/actions/property.actions";
import PropertyDetailsPage from "@/components/PropertyDetailsPage";

function DashboardPropertyPreviewPage() {
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
      <h1>DashboardPropertyPreviewPage</h1>
      <p>{propertyId}</p>
      {!property && <p>Loading...</p>}
      {property && <PropertyDetailsPage property={property} />}
    </div>
  );
}

export default DashboardPropertyPreviewPage;
