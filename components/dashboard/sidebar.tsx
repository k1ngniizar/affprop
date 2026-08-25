"use client";
import { logoutAction } from "@/actions/auth.actions";
import { dashboardNav } from "@/constants/dashboard-nav";
import { Building2, PlusCircle, LogOut, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const signOutFn = async () => {
    const result = await logoutAction();
    if (!result.success) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Logged out successfully.");
  };

  return (
    <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800/80 p-5 flex flex-col justify-between shrink-0 sticky top-0 md:h-screen z-40">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Aff<span className="text-green-400">Prop</span>
            </span>
          </Link>

          <Link
            href="/"
            title="View Public Site"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Menu
          </p>
          {dashboardNav.map((navItem) => {
            const isActive = pathname === navItem.href;
            return (
              <Link
                key={navItem.title}
                href={navItem.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <div className={`${isActive ? "text-green-400" : "text-zinc-400"}`}>
                  {navItem.icon}
                </div>
                <span>{navItem.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* List Property Callout Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-900/60 border border-green-500/20 relative overflow-hidden hidden md:block">
          <div className="flex items-center gap-2 text-green-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grow Your Portfolio</span>
          </div>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Publish new listings to start tracking affiliate referrals and inquiries.
          </p>
          <Link
            href="/dashboard/properties/new"
            className="w-full py-2 px-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            List New Property
          </Link>
        </div>
      </div>

      {/* Logout Footer Button */}
      <div className="pt-4 border-t border-zinc-800">
        <button
          onClick={signOutFn}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

