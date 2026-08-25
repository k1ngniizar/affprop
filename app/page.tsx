import Link from "next/link";
import { auth } from "@/auth";
import { getProperties } from "@/services/property.service";
import { dummyProperties } from "@/constants/dummy";
import { wholeToFrac } from "@/lib/wholeToFrac";
import {
  Building2,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Users,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Zap,
  Award,
  Lock,
} from "lucide-react";

export default async function Home() {
  const session = await auth();

  let properties: any[] = [];
  try {
    const dbProps = await getProperties();
    if (dbProps && dbProps.length > 0) {
      properties = dbProps.map((p: any) => ({
        ...p,
        _id: p._id ? p._id.toString() : p.id,
      }));
    } else {
      properties = dummyProperties;
    }
  } catch (error) {
    properties = dummyProperties;
  }

  // Display top 3 featured properties on the homepage
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Top Navigation Header */}
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
            <Link
              href="/properties"
              className="hover:text-green-400 transition-colors"
            >
              Explore Properties
            </Link>
            <a
              href="#features"
              className="hover:text-green-400 transition-colors"
            >
              Why AffProp
            </a>
            <a
              href="#how-it-works"
              className="hover:text-green-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#affiliate"
              className="hover:text-green-400 transition-colors"
            >
              Affiliate Perks
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-md shadow-green-500/10 flex items-center gap-2"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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

      {/* Hero Section */}
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

      {/* Metrics / Social Proof Section */}
      <section className="py-12 border-y border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
                <DollarSign className="w-5 h-5" />
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  ₦500M+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Commissions Distributed
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
                <Building2 className="w-5 h-5" />
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  1,200+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Verified Listings
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  5,000+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Active Partners
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  100%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                Verified & Transparent
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Handpicked Real Estate</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Properties
            </h2>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              Explore high-demand residential and commercial properties available for sale and rent.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors self-start md:self-auto"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((item: any) => {
            const propId = item._id || item.id;
            const imageUrl =
              item.images?.url ||
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";
            return (
              <div
                key={propId}
                className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl"
              >
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
                    <span className="text-xs text-green-400 font-semibold">
                      NGN
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">
                        {item.location?.address
                          ? `${item.location.address}, `
                          : ""}
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

                  <Link
                    href={`/properties/${propId}`}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose AffProp Section */}
      <section id="features" className="py-20 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Sellers, Buyers & Affiliates
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base">
              AffProp combines real estate management with an automated affiliate referral network so everyone wins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Automated Referral Tracking</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generate custom affiliate links for properties instantly. Track clicks, lead submissions, and total conversions in real time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Verified Property Listings</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every property listed on AffProp undergoes rigorous verification to guarantee authentic data, pricing, and owner identity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Transparent Commission Payouts</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Never worry about delayed commissions. Automated payout workflows ensure affiliates receive rewards directly upon deal closure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How AffProp Works
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Get started in three simple steps whether you want to list properties or earn commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Create Your Account</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Sign up as a seller, buyer, or affiliate in under 2 minutes with secure credentials.
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white">List or Share Properties</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Property owners publish listings; affiliates grab unique referral links for social media & marketing.
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Earn & Manage Profits</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Close deals, track property views and commissions live from your personalized dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section id="affiliate" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-green-500/30 p-8 sm:p-14 overflow-hidden text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10 max-w-3xl mx-auto">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto relative z-10">
            Join thousands of property managers and affiliates earning higher returns with AffProp.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-base transition-all shadow-xl shadow-green-500/20 flex items-center gap-2"
            >
              Join as Affiliate Partner
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={session?.user ? "/dashboard/properties/new" : "/login"}
              className="px-8 py-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-base transition-all"
            >
              Post a Property
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800/80 py-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">AffProp</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Empowering property owners and affiliate marketers through a unified, transparent real estate platform.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties" className="hover:text-green-400 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-green-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-green-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Property Types</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties?type=Duplex" className="hover:text-green-400 transition-colors">
                  Luxury Duplexes
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Apartment" className="hover:text-green-400 transition-colors">
                  Modern Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Office+Space" className="hover:text-green-400 transition-colors">
                  Commercial Offices
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Land" className="hover:text-green-400 transition-colors">
                  Lands & Plots
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Next.js 16 App Router</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>MongoDB & NextAuth</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} AffProp. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

