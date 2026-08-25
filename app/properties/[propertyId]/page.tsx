"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPropertyAction } from "@/actions/property.actions";
import PropertyDetailsPage from "@/components/PropertyDetailsPage";
import Link from "next/link";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { dummyProperties } from "@/constants/dummy";

function PropertyPreviewPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const data = await getPropertyAction(propertyId as string);
        if (data?.data) {
          setProperty(data.data);
        } else {
          // Fallback to dummy property if matching id or default
          const found = dummyProperties.find((p) => p.id === propertyId) || dummyProperties[0];
          setProperty(found);
        }
      } catch (error) {
        const found = dummyProperties.find((p) => p.id === propertyId) || dummyProperties[0];
        setProperty(found);
      } finally {
        setLoading(false);
      }
    }

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black flex flex-col">
      {/* Header */}
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
            <Link href="/#features" className="hover:text-green-400 transition-colors">
              Why AffProp
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-md shadow-green-500/10 flex items-center gap-2"
            >
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && (
          <div className="p-12 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin mx-auto" />
            <p className="text-sm text-zinc-400 font-medium">Loading property details...</p>
          </div>
        )}

        {!loading && property && <PropertyDetailsPage property={property} />}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800/80 py-12 text-zinc-500 text-sm mt-auto">
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
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Next.js 16 App Router</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} AffProp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default PropertyPreviewPage;

