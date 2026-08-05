"use client";
import { logoutAction } from "@/actions/auth.actions";
import { dashboardNav } from "@/constants/dashboard-nav";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const signOutFn = async () => {
    const result = await logoutAction();
    if (!result.success) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Logged out.");
  };
  return (
    <aside className="border-r border-zinc-400 px-2 py-6 sticky top-0 bottom-0 w-1/5 flex flex-col">
      <h2 className="mb-8 border-b border-zinc-400 text-zinc-400 text-2xl font-bold">
        AffProp
      </h2>

      <nav className="space-y-3 flex flex-col flex-1">
        {dashboardNav.map((navItems) => {
          return (
            <Link key={navItems.title} href={navItems.href}>
              {navItems.title}
            </Link>
          );
        })}
      </nav>
      <button
        className="bg-red-400 hover:cursor-pointer hover:bg-red-900 w-full mt-[100%] rounded-sm py-1 px-3"
        onClick={signOutFn}
      >
        Logout
      </button>
    </aside>
  );
}
