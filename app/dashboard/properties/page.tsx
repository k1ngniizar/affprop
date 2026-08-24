import PropertyGrid from "@/components/PropertyGrid";
import { dummyProperties } from "@/constants/dummy";
import { getProperties } from "@/services";

async function DashboardPropertyPage() {
  // const property = dummyProperties;
  const property = await getProperties();
  console.log("Check CALL ERROR:: ", property);
  return (
    <div>
      DashboardPropertyPage
      <p>{property[0].id}</p>
      <PropertyGrid property={property} />
    </div>
  );
}

export default DashboardPropertyPage;
