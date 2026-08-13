export const PropertyCard = ({ item }) => {
  return (
    <div className="h-45 hover:cursor-pointer group w-115 flex overflow-hidden rounded-sm bg-black">
      <div className="w-45 overflow-hidden h-full">
        <img
          src={item.images.url}
          className="w-full h-full object-cover group-hover:scale-125 transition-all transition-discrete group-hover:rotate-6"
        />
      </div>
      <div className="flex-1 p-2 flex flex-col  justify-between">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-sm px-2">{item.propertyType}</p>
          </div>
          <p className="text-sm font-bold">{item.price}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <p className="text-sm bg-zinc-700 px-2 rounded-sm">
            {item.listingType}
          </p>
          <p className="text-sm bg-zinc-700 px-2 rounded-sm">{item.status}</p>
        </div>
        <p className="text-sm text-wrap">
          {item.location.city}, {item.location.state}, {item.location.country}.
        </p>
        <button className="bg-white text-black rounded-sm py-1 px-2 w-full hover:bg-zinc-500">
          Purchase
        </button>
      </div>
    </div>
  );
};
