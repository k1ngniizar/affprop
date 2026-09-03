import { auth } from "@/auth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Featured from "@/components/Featured";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Top Navigation Header */}
      <Header session={session} />

      {/* Hero Section */}
      <Hero session={session} />

      {/* Metrics / Social Proof Section */}
      <Metrics />
      {/* Featured Properties Section */}
      <Featured />

      {/* Why Choose AffProp Section */}
      <WhyUs />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Call To Action Banner */}
      <CTA session={session} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
