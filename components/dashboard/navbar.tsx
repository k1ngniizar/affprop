import Link from "next/link";
import { User, Bell, ExternalLink } from "lucide-react";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
};

export default function DashboardNavbar({ user }: Props) {
  const displayName = user.name || user.email?.split("@")[0] || "User";

  return (
    <header className="border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg text-white">Dashboard Overview</h1>
        <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/30">
          {user.role ? user.role.toUpperCase() : "PARTNER"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick View Public Site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-all"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </Link>

        {/* User Pill */}
        <Link
          href="/profile"
          className="flex items-center gap-3 pl-3 border-l border-zinc-800 group cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-green-500/50 flex items-center justify-center text-green-400 font-bold text-sm shadow-inner transition-colors">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-xs font-semibold text-white group-hover:text-green-400 capitalize transition-colors">
              {displayName}
            </p>
            <p className="text-[11px] text-zinc-400 max-w-[150px] truncate">
              {user.email}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

