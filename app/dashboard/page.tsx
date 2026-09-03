import Link from "next/link";
import { auth } from "@/auth";
import { getProperties } from "@/services/property.service";
import { dummyProperties } from "@/constants/dummy";
import { wholeToFrac } from "@/lib/wholeToFrac";
import {
  Building2,
  TrendingUp,
  Eye,
  Share2,
  PlusCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Banknote,
} from "lucide-react";
import { getAllPropertiesByCreatorIdAction } from "@/actions/property.actions";

export default async function DashboardPage() {
  const session = await auth();
  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Partner";

  let properties: any[] | null = [];
  try {
    const dbProps = await getAllPropertiesByCreatorIdAction();
    if (dbProps?.data && dbProps.data.length > 0) {
      properties = dbProps.data.map((p: any) => ({
        ...p,
        _id: p._id ? p._id.toString() : p.id,
      }));
    } else {
      properties = dummyProperties;
    }
  } catch (error) {
    console.log("Error in dashboard:: ", error);
    properties = dummyProperties;
  }

  if (properties === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4 opacity-50">
          <Building2 className="w-8 h-8 text-zinc-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Something went wrong.</h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          Please check your internet connection, refresh the page, or try again
          later. Thank you!
        </p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4 opacity-50">
          <Building2 className="w-8 h-8 text-zinc-500" />
        </div>
        <h2 className="text-xl font-bold text-white">No Properties Yet</h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          Start by listing your first property to activate your dashboard
          analytics and referral tracking.
        </p>
        <Link
          href="/dashboard/properties/new"
          className="mt-6 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          List Your First Property
        </Link>
      </div>
    );
  }

  // Calculate statistics
  const totalListings = properties.length;
  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalPortfolioValue = properties.reduce(
    (acc, p) => acc + (p.price || 0),
    0,
  );
  const estimatedCommission = totalPortfolioValue * 0.05; // 5% average commission rate

  const recentListings = properties.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AffProp Partner Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back,{" "}
              <span className="text-green-400 capitalize">{userName}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Track your property listings, monitor affiliate referral traffic,
              and view your estimated commission earnings in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/properties/new"
              className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              List New Property
            </Link>
            <Link
              href="/dashboard/properties"
              className="px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-xs transition-all"
            >
              Manage Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Active Listings
            </span>
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {totalListings}
            </div>
            <p className="text-xs text-green-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Active in catalog</span>
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total Views
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {totalViews}
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              Property impressions
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Portfolio Value
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ₦{wholeToFrac(totalPortfolioValue)}
            </div>
            <p className="text-xs text-emerald-400 font-medium">
              Total listed assets
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Est. Commission
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ₦{wholeToFrac(estimatedCommission)}
            </div>
            <p className="text-xs text-purple-400 font-medium">
              ~5% commission payout
            </p>
          </div>
        </div>
      </div>

      {/* Affiliate Link Share Widget */}
      {/* <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-green-400" />
              <span>Your Unique Affiliate Link</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Share your custom referral link across social media or direct
              messages to earn commissions on leads and deals.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30 self-start sm:self-auto">
            5% Commission Rate
          </span>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 p-2 rounded-xl">
          <input
            type="text"
            readOnly
            value={`https://affprop.com/ref?user=${session?.user?.id || "partner"}`}
            className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-zinc-300 focus:outline-none select-all"
          />
          <button
            // onClick={() => {
            //   navigator.clipboard.writeText(
            //     `https://affprop.com/ref?user=${session?.user?.id || "partner"}`
            //   );
            //   alert("Affiliate referral link copied to clipboard!");
            // }}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shrink-0 cursor-pointer"
          >
            Copy Link
          </button>
        </div>
      </div> */}

      {/* Recent Property Listings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Recent Properties
            </h2>
            <p className="text-xs text-zinc-400">
              Quick snapshot of your property catalog.
            </p>
          </div>
          <Link
            href="/dashboard/properties"
            className="text-xs font-semibold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentListings.map((item: any) => {
            const propId = item._id || item.id;
            const imageUrl =
              item.images?.url ||
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";
            return (
              <div
                key={propId}
                className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-zinc-950">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-green-400 border border-green-500/30">
                      {item.listingType}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/70 backdrop-blur-md text-zinc-300 border border-zinc-800">
                      {item.propertyType}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md text-white font-extrabold text-xs border border-zinc-800">
                    {wholeToFrac(item.price)} NGN
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">
                        {item.location?.city}, {item.location?.state}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-green-400" />
                      <span>{item.views || 0} views</span>
                    </div>
                    <Link
                      href={`/dashboard/properties/${propId}/edit`}
                      className="text-xs text-white hover:text-green-400 font-medium transition-colors"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
