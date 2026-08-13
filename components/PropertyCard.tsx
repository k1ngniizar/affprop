export const PropertyCard = ({ item }) => {
  return (
    <div className="h-45  group flex overflow-hidden rounded-sm bg-black">
      <div className="w-45 overflow-hidden h-full relative">
        <img
          src={item.images.url}
          className="w-full h-full object-cover group-hover:scale-125 transition-all transition-discrete group-hover:rotate-6"
        />
        <div className="absolute top-0 w-full h-full group-hover:block hidden bg-black/30">
          <a
            className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white hover:bg-zinc-300 text-black py-1 px-2 rounded-sm text-nowrap text-sm font-bold"
            href={`/dashboard/properties/${item.id}`}
          >
            View details
          </a>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{item.title}</h2>
            <div className="flex gap-2 items-center">
              <p className="text-sm px-2 font-bold text-zinc-400">
                {item.propertyType}
              </p>
              <p className="text-xs font-bold text-green-400 w-fit  rounded-sm">
                {item.listingType}
              </p>
            </div>
          </div>
          <p className="text-sm font-bold  h-fit">
            {item.price}{" "}
            <span className="text-xs   text-green-400  font-bold">NGN</span>
          </p>
        </div>

        <p className="text-sm text-wrap font-bold text-zinc-400 px-2">
          {item.location.city}, {item.location.state}, {item.location.country}.
        </p>
        <button className="bg-white text-black rounded-sm py-1 px-2 w-full hover:bg-zinc-300">
          Purchase
        </button>
      </div>
    </div>
  );
};
