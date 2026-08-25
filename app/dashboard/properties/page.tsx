import { getAllPropertiesAction } from "@/actions/property.actions";
import PropertyGrid from "@/components/PropertyGrid";
import { dummyProperties } from "@/constants/dummy";
import { PropertySchema } from "@/models/property.model";
// import { getProperties } from "@/services";

async function DashboardPropertyPage() {
  // const property = dummyProperties;
  const data = await getAllPropertiesAction();
  console.log("Check CALL ERROR:: ", data);
  const property: Partial<PropertySchema[]> = data.data;
  return (
    <div>
      DashboardPropertyPage
      <p>{property[0]?.location?.city}</p>
      <PropertyGrid property={property} />
    </div>
  );
}

export default DashboardPropertyPage;
