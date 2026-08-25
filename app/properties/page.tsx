import { getAllPropertiesAction } from "@/actions/property.actions";
import { PropertySchema } from "@/models/property.model";
import PropertyGrid from "@/components/PropertyGrid";
import React from "react";

async function PropertyPage() {
  const data = await getAllPropertiesAction();
  console.log("Check CALL ERROR:: ", data);
  const property: Partial<PropertySchema[]> = data.data;
  return (
    <div className="p-3">
      DashboardPropertyPage
      <p>{property[0]?.location?.city}</p>
      <PropertyGrid property={property} />
    </div>
  );
}
export default PropertyPage;
