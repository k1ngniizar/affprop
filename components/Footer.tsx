import { Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 py-12 text-zinc-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">AffProp</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Empowering property owners and affiliate marketers through a
            unified, transparent real estate platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/properties"
                className="hover:text-green-400 transition-colors"
              >
                All Properties
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-green-400 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-green-400 transition-colors"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-green-400 transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">
            Property Types
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/properties?type=Duplex"
                className="hover:text-green-400 transition-colors"
              >
                Luxury Duplexes
              </Link>
            </li>
            <li>
              <Link
                href="/properties?type=Apartment"
                className="hover:text-green-400 transition-colors"
              >
                Modern Apartments
              </Link>
            </li>
            <li>
              <Link
                href="/properties?type=Office+Space"
                className="hover:text-green-400 transition-colors"
              >
                Commercial Offices
              </Link>
            </li>
            <li>
              <Link
                href="/properties?type=Land"
                className="hover:text-green-400 transition-colors"
              >
                Lands & Plots
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
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span>Tailwind CSS v4</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span>MongoDB & NextAuth</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} AffProp. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-zinc-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-zinc-300">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
