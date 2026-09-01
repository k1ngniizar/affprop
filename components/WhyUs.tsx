import { Zap, Award, Lock } from "lucide-react";

function WhyUs() {
  return (
    <section
      id="features"
      className="py-20 bg-zinc-950 border-t border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Sellers, Buyers & Affiliates
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            AffProp combines real estate management with an automated affiliate
            referral network so everyone wins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Automated Referral Tracking
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Generate custom affiliate links for properties instantly. Track
              clicks, lead submissions, and total conversions in real time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Verified Property Listings
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every property listed on AffProp undergoes rigorous verification
              to guarantee authentic data, pricing, and owner identity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Transparent Commission Payouts
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Never worry about delayed commissions. Automated payout workflows
              ensure affiliates receive rewards directly upon deal closure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
