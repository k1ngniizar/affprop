"use client";
import { logoutAction } from "@/actions/auth.actions";
import { dashboardNav } from "@/constants/dashboard-nav";
import { Cross, LucidePlus } from "lucide-react";
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
    <aside className="rounded-sm px-2 py-6 sticky bg-zinc-900 top-0 bottom-0 w-1/7 min-w-50 max-w-xs flex flex-col border border-zinc-700 gap-2 items-center">
      <h2 className=" w-full px-3 border-b border-zinc-700  text-2xl font-bold">
        AffProp
      </h2>

      <nav className="space-y-3 flex flex-col border-b flex-1">
        {dashboardNav.map((navItem) => {
          const isActive = pathname === navItem.href;
          return (
            <Link
              className={`${isActive ? "bg-zinc-100 text-black hover:text-white font-bold" : ""} flex gap-1 items-center hover:bg-zinc-800 py-1 px-3 rounded-sm`}
              key={navItem.title}
              href={navItem.href}
            >
              <div>{navItem.icon}</div>
              <span className="hidden md:block">{navItem.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="bg-gray-700/50 p-1 rounded-sm border-zinc-700 border-2 backdrop-blur-xs h-45 w-full ">
        <Link
          className={`bg-green-400 text-black hover:text-green-400 font-bold flex gap-1 items-center hover:bg-zinc-800 p-1 rounded-sm`}
          href={"/dashboard/properties/new"}
        >
          <div>
            <LucidePlus />
          </div>
          <span className="hidden md:block text-xs text-nowrap">
            List new Property
          </span>
        </Link>
      </div>
      <button
        className="bg-red-400 hover:cursor-pointer hover:bg-zinc-800 hover:text-red-400 font-bold w-full rounded-sm py-1 px-3"
        onClick={signOutFn}
      >
        Logout
      </button>
      {/* </div>? */}
    </aside>
  );
}
