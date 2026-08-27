"use client";
import { deletePropertyAction } from "@/actions/property.actions";
import { wholeToFrac } from "@/lib/wholeToFrac";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  X,
  ArrowRight,
} from "lucide-react";

export const PropertyCard = ({
  item,
  isPublic,
}: {
  item: any;
  isPublic?: boolean;
}) => {
  const router = useRouter();
  const [openDelModal, setOpenDelModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const closeModal = () => {
    setPropertyToDelete("");
    setOpenDelModal(false);
  };

  const deleteListingFn = async (deleteString: string) => {
    try {
      setIsDeleting(true);
      await deletePropertyAction(deleteString);
      toast.success("Listing deleted successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to delete property.");
    } finally {
      setIsDeleting(false);
    }
  };

  const imageUrl =
    item.images?.url ||
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";

  const propId = item._id || item.id;

  return (
    <>
      {/* Delete Confirmation Modal */}
      {openDelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
                <AlertTriangle className="w-5 h-5" />
                <span>Confirm Deletion</span>
              </div>
              <button
                onClick={closeModal}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-white">"{item.title}"</span>? This
              action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={closeModal}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteListingFn(propertyToDelete)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-black font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Property"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Card */}
      <div className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-green-400 border border-green-500/30">
              {item.listingType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md text-zinc-300 border border-zinc-800">
              {item.propertyType}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white font-extrabold text-sm border border-zinc-800">
            {wholeToFrac(item.price)}{" "}
            <span className="text-xs text-green-400 font-semibold">NGN</span>
          </div>

          {isPublic && (
            <Link
              href={`/properties/${propId}`}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              title="View Public Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="truncate">
                {item.location?.address ? `${item.location.address}, ` : ""}
                {item.location?.city}, {item.location?.state}
              </span>
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-green-400" />
              <span>{item.bedrooms || 0} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-green-400" />
              <span>{item.bathrooms || 0} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-green-400" />
              <span>{item.area || 0} sqft</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            {isPublic && (
              <>
                <button
                  onClick={() =>
                    router.push(`/dashboard/properties/${propId}/edit`)
                  }
                  className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5 text-green-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setOpenDelModal(true);
                    setPropertyToDelete(propId);
                  }}
                  className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </>
            )}

            {!isPublic && (
              <Link
                href={`/properties/${propId}`}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 group/btn"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
