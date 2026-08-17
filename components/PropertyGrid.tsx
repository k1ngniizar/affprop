import { PropertyCard } from "./PropertyCard";

function PropertyGrid({ property }) {
  return (
    <div className="relative">
      <h1 className="text-2xl bg-zinc-700/70 backdrop-blur-xs py-2 sticky top-0 px-4 my-4 z-10">
        Properties You Listed
      </h1>
      <div className="grid md:grid-cols-2  gap-4 overflow-hidden">
        {property.map((item) => {
          return <PropertyCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default PropertyGrid;
