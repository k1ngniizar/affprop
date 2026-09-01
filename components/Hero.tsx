import { Session } from "next-auth";
import Link from "next/link";
import { Search, Sparkles, ChevronRight } from "lucide-react";

interface userProp {
  name: string;
  email: string;
  id: string;
  role: string;
}

interface heroProp {
  session: Session | null;
}

function Hero({ session }: heroProp) {
  return (
    <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-green-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen Affiliate Real Estate Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Monetize & Discover Premium Properties{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400">
            Effortlessly.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          The modern real estate marketplace connecting sellers, buyers, and
          affiliate partners. Share verified listings and earn high commissions
          on every closing.
        </p>

        {/* Quick Search Widget */}
        <div className="mt-10 max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-xl">
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
                placeholder="Search city, state, or property title..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
            </div>

            <select
              name="type"
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-green-500/50 transition-all cursor-pointer"
            >
              <option value="">All Property Types</option>
              <option value="Duplex">Duplex</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Terrace">Terrace</option>
              <option value="Land">Land</option>
              <option value="Office Space">Office Space</option>
            </select>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl py-3 px-6 text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
            >
              <Search className="w-4 h-4" />
              Find Properties
            </button>
          </form>
        </div>

        {/* Quick Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/properties"
            className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-green-500/50 text-white font-semibold text-sm transition-all flex items-center gap-2 group"
          >
            Browse All Listings
            <ChevronRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={session?.user ? "/dashboard/properties/new" : "/register"}
            className="px-6 py-3.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 font-semibold text-sm transition-all flex items-center gap-2"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
