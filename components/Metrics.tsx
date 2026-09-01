import { Building2, ShieldCheck, Users, Banknote } from "lucide-react";

function Metrics() {
  return (
    <section className="py-12 border-y border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
              <Banknote className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                ₦500M+
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Commissions Distributed
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
              <Building2 className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                1,200+
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Verified Listings
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                5,000+
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">Active Partners</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-green-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                100%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Verified & Transparent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
