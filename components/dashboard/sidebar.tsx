"use client";
import { logoutAction } from "@/actions/auth.actions";
import { dashboardNav } from "@/constants/dashboard-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const signOutFn = async () => {
    const result = await logoutAction();
    if (!result.success) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Logged out.");
  };
  return (
    <aside className="rounded-sm px-2 py-6 sticky bg-zinc-900 top-0 bottom-0 w-1/5 max-w-sm flex flex-col border border-zinc-700">
      <h2 className="mb-8 px-3 border-b border-zinc-700  text-2xl font-bold">
        AffProp
      </h2>

      <nav className="space-y-3 flex flex-col flex-1">
        {dashboardNav.map((navItem) => {
          const isActive = pathname === navItem.href;
          return (
            <Link
              className={`${isActive ? "bg-zinc-100 text-black hover:text-white font-bold" : ""} hover:bg-zinc-800 py-1 px-3 rounded-sm`}
              key={navItem.title}
              href={navItem.href}
            >
              {navItem.title}
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
