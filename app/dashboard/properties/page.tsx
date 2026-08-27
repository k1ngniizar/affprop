import {
  getAllPropertiesAction,
  getAllPropertiesByCreatorIdAction,
} from "@/actions/property.actions";
import PropertyGrid from "@/components/PropertyGrid";
import { dummyProperties } from "@/constants/dummy";
import Link from "next/link";
import { PlusCircle, Building2, Search } from "lucide-react";

async function DashboardPropertyPage() {
  let propertyList: any[] = [];
  try {
    console.log("Bankai");
    const res = await getAllPropertiesByCreatorIdAction();
    console.log("Check response:: ", res);
    if (res?.data && res.data.length > 0) {
      propertyList = res.data;
    } else {
      propertyList = dummyProperties;
    }
  } catch (error) {
    console.log("Checking error:: ", error);
    propertyList = dummyProperties;
  }

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Property Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Property Listings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your real estate listings, edit property details, and track
            performance.
          </p>
        </div>

        <Link
          href="/dashboard/properties/new"
          className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          List New Property
        </Link>
      </div>

      {/* Property Grid */}
      <PropertyGrid property={propertyList} isPublic={true} />
    </div>
  );
}

export default DashboardPropertyPage;
