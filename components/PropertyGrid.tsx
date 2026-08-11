import { PropertyCard } from "./PropertyCard";

function PropertyGrid({ property }) {
  return (
    <div>
      PropertyGrid
      {property.map((item) => {
        return <PropertyCard key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PropertyGrid;
