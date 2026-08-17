import PropertyGrid from "@/components/PropertyGrid";
import { dummyProperties } from "@/constants/dummy";
import { getProperties } from "@/services";

async function DashboardPropertyPage() {
  const property = dummyProperties;
  console.log(property[0]);
  return (
    <div>
      DashboardPropertyPage
      <p>{property[0].id}</p>
      <PropertyGrid property={property} />
    </div>
  );
}

export default DashboardPropertyPage;
