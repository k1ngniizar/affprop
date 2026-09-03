import { PropertyCard } from "./PropertyCard";
import { Building2 } from "lucide-react";

function PropertyGrid({
  property,
  isPublic,
}: {
  property: any[];
  isPublic?: boolean;
}) {
  if (!property || property.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-4 max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto">
          <Building2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">
          No Properties Listed Yet
        </h3>
        <p className="text-sm text-zinc-400">
          Start building your real estate portfolio by adding your first
          property listing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {property.map((item: any) => {
          const propId = item._id || item.id;
          return <PropertyCard key={propId} item={item} isPublic={isPublic} />;
        })}
      </div>
    </div>
  );
}

export default PropertyGrid;
