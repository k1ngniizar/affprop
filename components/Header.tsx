import { ArrowRight, Building2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

interface heroProp {
  session?: Session | null;
}
async function Header({ session }: heroProp) {
  return (
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
  );
}

export default Header;
