import Link from "next/link";
import { auth } from "@/auth";
import { getAllPropertiesAction } from "@/actions/property.actions";
import { dummyProperties } from "@/constants/dummy";
import PropertyGrid from "@/components/PropertyGrid";
import {
  Building2,
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PROPERTY_TYPE_VALUES } from "@/constants/property";
import Footer from "@/components/Footer";

export default async function PropertyPage(props: {
  searchParams?: Promise<{
    search?: string;
    type?: string;
    listingType?: string;
  }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;

  const searchQuery = searchParams?.search?.toLowerCase() || "";
  const selectedType = searchParams?.type || "";
  const selectedListingType = searchParams?.listingType || "";

  let allProperties: any[] = [];
  try {
    const res = await getAllPropertiesAction();
    if (res?.data && res.data.length > 0) {
      allProperties = res.data;
    } else {
      allProperties = dummyProperties;
    }
  } catch (error) {
    allProperties = dummyProperties;
  }

  // Filter properties based on search params
  const filteredProperties = allProperties.filter((item: any) => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery);
    const cityMatch = item.location?.city?.toLowerCase().includes(searchQuery);
    const stateMatch = item.location?.state
      ?.toLowerCase()
      .includes(searchQuery);
    const matchesSearch = !searchQuery || titleMatch || cityMatch || stateMatch;

    const matchesType = !selectedType || item.propertyType === selectedType;
    const matchesListingType =
      !selectedListingType || item.listingType === selectedListingType;

    return matchesSearch && matchesType && matchesListingType;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Aff<span className="text-green-400">Prop</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/properties" className="text-green-400 font-semibold">
              Explore Properties
            </Link>
            <Link
              href="/#features"
              className="hover:text-green-400 transition-colors"
            >
              Why AffProp
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-green-400 transition-colors"
            >
              How It Works
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-md shadow-green-500/10 flex items-center gap-2"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-md shadow-green-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Catalog Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Page Banner Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Real Estate Listings</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore Available Properties
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Find luxury duplexes, modern apartments, commercial offices, and
              prime land plots available for sale and rent.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 relative z-10 p-3 rounded-2xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl">
            <form
              action="/properties"
              method="GET"
              className="grid grid-cols-1 sm:grid-cols-4 gap-3"
            >
              <div className="relative col-span-1 sm:col-span-2">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search city, state, or title..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
                />
              </div>

              <select
                name="type"
                defaultValue={selectedType}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-green-500/50 transition-all cursor-pointer"
              >
                <option value="">All Types</option>
                {PROPERTY_TYPE_VALUES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl py-2.5 px-5 text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-zinc-400 font-medium">
            Showing{" "}
            <span className="text-white font-bold">
              {filteredProperties.length}
            </span>{" "}
            properties
          </p>
          {(searchQuery || selectedType || selectedListingType) && (
            <Link
              href="/properties"
              className="text-xs text-green-400 hover:text-green-300 font-semibold underline underline-offset-4"
            >
              Clear Filters
            </Link>
          )}
        </div>

        {/* Property Grid */}
        <PropertyGrid property={filteredProperties} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
// http://192.168.24.228:3000/
