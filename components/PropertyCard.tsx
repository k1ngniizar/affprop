"use client";
import { wholeToFrac } from "@/lib/wholeToFrac";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PropertyCard = ({ item }) => {
  const router = useRouter();
  const [openDelModal, setOpenDelModal] = useState(false);
  return (
    <>
      {openDelModal && (
        <div className="fixed right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 border border-red-600 h-45 w-md rounded-sm z-50 p-2 bg-red-50 text-red-600 font-bold">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-2xl">Delete Property</h1>
            <p
              className="p-2 hover:scale-125  cursor-pointer"
              onClick={() => setOpenDelModal(false)}
            >
              X
            </p>
          </div>
          <div className="p-2">
            <p>Are you sure you want to delete the listing?</p>
            <div className="py-2 flex gap-2">
              <button className="border border-red-600 p-2 rounded-sm">
                Delete
              </button>
              <button
                onClick={() => setOpenDelModal(false)}
                className="bg-white text-black p-2 rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-fit  group flex overflow-hidden flex-col rounded-sm bg-black">
        <div className=" rounded-t-sm rounded-b-2xl border-b-zinc-700 border-b-4 h-35 overflow-hidden relative">
          <img
            src={item.images.url}
            className="w-full h-full object-cover group-hover:scale-125 transition-all 
          rounded-sm group-hover:rotate-6"
          />
          <div className="absolute top-0 w-full h-full group-hover:block hidden bg-black/30">
            <a
              className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white hover:bg-zinc-300 text-black py-1 px-2 rounded-sm text-nowrap  group-hover:block hidden text-sm font-bold"
              href={`/dashboard/properties/${item.id}`}
            >
              View details
            </a>
          </div>
        </div>
        <div className="flex-1 p-2 py-4 flex flex-col justify-center gap-2 lg:gap-4">
          <div className=" text-left relative">
            <div className="text-left">
              <h2 className="text-lg font-bold text-nowrap truncate w-full">
                {item.title}
              </h2>
              <div className="flex gap-2 items-center">
                <p className="text-sm px-2 font-bold text-zinc-400 text-nowrap">
                  {item.propertyType}
                </p>
                <p className="text-xs font-bold text-green-400 w-fit  rounded-sm">
                  {item.listingType}
                </p>
              </div>
            </div>
            <p className="text-[14px] absolute -top-10 -right-1 bg-green-900 rounded-full px-2 py-1 leading-[100%] tracking-0 font-bold  h-fit text-nowrap flex-1 text-right ">
              {wholeToFrac(item.price)}{" "}
              <span className="text-[12px] leading-[100%] tracking-0   text-green-400  font-bold">
                NGN
              </span>
            </p>
          </div>

          <p className="text-sm text-wrap font-bold text-zinc-400 px-2">
            {item.location.city}, {item.location.state}, {item.location.country}
            .
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/dashboard/properties/${item.id}/edit`)
              }
              className="bg-white text-black rounded-sm py-1 px-2 w-full hover:bg-zinc-300"
            >
              Edit
            </button>
            <button
              onClick={() => setOpenDelModal(true)}
              className="border border-red-400 text-red-400 hover:bg-red-900/50 rounded-sm py-1 px-2 w-full "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
