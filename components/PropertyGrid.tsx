import { PropertyCard } from "./PropertyCard";

function PropertyGrid({ property }) {
  return (
    <div>
      <h1 className="text-2xl bg-green-600">PropertyGrid</h1>
      <div className="flex flex-wrap gap-4 overflow-hidden justify-between  p-2">
        {property.map((item) => {
          return <PropertyCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default PropertyGrid;
