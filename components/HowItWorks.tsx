import React from "react";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How AffProp Works
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base">
          Get started in three simple steps whether you want to list properties
          or earn commissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
            1
          </div>
          <h3 className="text-lg font-bold text-white">Create Your Account</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Sign up as a seller, buyer, or affiliate in under 2 minutes with
            secure credentials.
          </p>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
            2
          </div>
          <h3 className="text-lg font-bold text-white">
            List or Share Properties
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Property owners publish listings; affiliates grab unique referral
            links for social media & marketing.
          </p>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-2xl relative text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-500 text-black font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
            3
          </div>
          <h3 className="text-lg font-bold text-white">
            Earn & Manage Profits
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Close deals, track property views and commissions live from your
            personalized dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
