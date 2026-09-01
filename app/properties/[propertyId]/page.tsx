"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPropertyAction } from "@/actions/property.actions";
import PropertyDetailsPage from "@/components/PropertyDetailsPage";
import Link from "next/link";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { dummyProperties } from "@/constants/dummy";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";

function PropertyPreviewPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        toast.success("Loading");
        setLoading(true);
        const data = await getPropertyAction(propertyId as string);
        if (data?.data) {
          setProperty(data.data);
          toast.success("Fetched");
        } else {
          // Fallback to dummy property if matching id or default
          const found =
            dummyProperties.find((p) => p.id === propertyId) ||
            dummyProperties[0];
          setProperty(found);
          toast.success("Found");
        }
      } catch (error) {
        const found =
          dummyProperties.find((p) => p.id === propertyId) ||
          dummyProperties[0];
        setProperty(found);
        toast.error("Failed");
      } finally {
        setLoading(false);
        toast.success("Final");
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
            <Link
              href="/#features"
              className="hover:text-green-400 transition-colors"
            >
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
            <p className="text-sm text-zinc-400 font-medium">
              Loading property details...
            </p>
          </div>
        )}

        {!loading && property && <PropertyDetailsPage property={property} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PropertyPreviewPage;
