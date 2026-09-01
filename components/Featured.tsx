import { dummyProperties } from "@/constants/dummy";
import { wholeToFrac } from "@/lib/wholeToFrac";
import { getProperties } from "@/services";
import {
  Building2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Users,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Zap,
  Award,
  Lock,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import PropertyGrid from "./PropertyGrid";
import { getAllPropertiesAction } from "@/actions/property.actions";

async function Featured() {
  let properties: any[] = [];
  try {
    const dbProps = await getAllPropertiesAction();
    if (dbProps.data && dbProps.data.length > 0) {
      properties = dbProps.data;
    } else {
      properties = dummyProperties;
    }
  } catch (error) {
    properties = dummyProperties;
  }

  // Display top 3 featured properties on the homepage
  const featuredProperties = properties.slice(0, 3);
  return (
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
            Explore high-demand residential and commercial properties available
            for sale and rent.
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

      <PropertyGrid property={featuredProperties} />
    </section>
  );
}

export default Featured;
