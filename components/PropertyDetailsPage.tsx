"use client";
import Link from "next/link";
import { wholeToFrac } from "@/lib/wholeToFrac";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  Eye,
  Share2,
  ArrowLeft,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building2,
  Heart,
  HandCoins,
  SearchCheck,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

type PropertyDetailsPageProps = {
  property: any;
};

export default function PropertyDetailsPage({
  property,
}: PropertyDetailsPageProps) {
  const imageUrl =
    property.images?.url ||
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";

  const propId = property._id || property.id;
  const locationText = [
    property.location?.address,
    property.location?.city,
    property.location?.state,
    property.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const copyAffiliateLink = () => {
    const link = `https://affprop.com/properties/${propId}?ref=partner`;
    navigator.clipboard.writeText(link);
    toast.success("Affiliate referral link copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      {/* Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>

        <div className="text-xs text-zinc-500 font-medium">
          <span>Properties</span> /{" "}
          <span className="text-zinc-300">{property.propertyType}</span> /{" "}
          <span className="text-green-400 font-semibold">{property.title}</span>
        </div>
      </div>

      {/* Main Grid */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-black/80 backdrop-blur-md text-green-400 border border-green-500/30">
                {property.listingType}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/80 backdrop-blur-md text-zinc-300 border border-zinc-800">
                {property.propertyType}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md text-white font-extrabold text-lg border border-zinc-800">
              ₦{wholeToFrac(property.price)}{" "}
              <span className="text-xs text-green-400 font-semibold">NGN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Property
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-green-400" />
                  {property.views || 0} Views
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {property.title}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 mt-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>{locationText}</span>
              </p>
            </div>

            {/* Price Badge */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-400 font-medium block">
                  Listing Price
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white">
                  ₦{property.price?.toLocaleString()}
                </span>
              </div>
              <span className="text-xs text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20">
                {property.status || "Available"}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="space-y-1">
                <Bed className="w-4 h-4 text-green-400 mx-auto" />
                <span className="block text-sm font-bold text-white">
                  {property.bedrooms ?? 0}
                </span>
                <span className="text-[11px] text-zinc-500">Beds</span>
              </div>
              <div className="space-y-1">
                <Bath className="w-4 h-4 text-green-400 mx-auto" />
                <span className="block text-sm font-bold text-white">
                  {property.bathrooms ?? 0}
                </span>
                <span className="text-[11px] text-zinc-500">Baths</span>
              </div>
              <div className="space-y-1">
                <Car className="w-4 h-4 text-green-400 mx-auto" />
                <span className="block text-sm font-bold text-white">
                  {property.parking ?? 0}
                </span>
                <span className="text-[11px] text-zinc-500">Parking</span>
              </div>
              <div className="space-y-1">
                <Maximize2 className="w-4 h-4 text-green-400 mx-auto" />
                <span className="block text-sm font-bold text-white">
                  {property.area ?? 0}
                </span>
                <span className="text-[11px] text-zinc-500">sqft</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-1">
              <button
                onClick={() =>
                  toast.success(
                    "Contact request sent! Agent will reach out shortly.",
                  )
                }
                className="flex-2 py-3.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all flex items-center justify-center gap-2  cursor-pointer"
              >
                <HandCoins className="w-4 h-4" />
                Initiate Property Transfer
              </button>
              <button
                onClick={() => toast.success("Added to favorites.")}
                className="flex-1 py-3.5 px-4 rounded-xl border-2 border-green-500 hover:bg-green-400/10 text-green-500 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                Favorite
              </button>
            </div>
            {/* Affiliate Link Generator */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-green-500/20 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  Schedule Inspection
                </span>
                <SearchCheck className="w-4 h-4 text-green-400" />
              </div>
              <button
                onClick={copyAffiliateLink}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-green-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Copy Referral Link
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Description Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Property Description
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
          {property.description || "No description provided for this listing."}
        </p>
      </section>
    </div>
  );
}
