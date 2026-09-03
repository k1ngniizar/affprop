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
import { Session } from "next-auth";
import Link from "next/link";
interface ctaProp {
  session?: Session | null;
}
function CTA({ session }: ctaProp) {
  return (
    <section
      id="affiliate"
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-green-500/30 p-8 sm:p-14 overflow-hidden text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10 max-w-3xl mx-auto">
          Ready to Transform Your Real Estate Business?
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto relative z-10">
          Join thousands of property managers and affiliates earning higher
          returns with AffProp.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-base transition-all shadow-xl shadow-green-500/20 flex items-center gap-2"
          >
            Join as Affiliate Partner
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href={session?.user ? "/dashboard/properties/new" : "/login"}
            className="px-8 py-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-base transition-all"
          >
            Post a Property
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
