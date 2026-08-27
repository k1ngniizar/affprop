import LoginForm from "@/components/forms/loginForm";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white font-sans flex flex-col justify-between relative overflow-hidden selection:bg-green-500 selection:text-black">
      {/* Background Glow Circles */}
      <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-green-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-emerald-500/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-green-400/15 blur-[170px] rounded-full pointer-events-none" />


      {/* Top Bar Navigation */}
      <header className="p-4 sm:p-6 max-w-7xl w-full mx-auto flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Form Container */}
      <div className="w-full flex items-center justify-center p-4 sm:p-6 z-10 my-auto">
        <LoginForm />
      </div>

      {/* Footer Text */}
      <footer className="p-4 text-center text-xs text-zinc-600 z-10">
        <p>© {new Date().getFullYear()} AffProp. Secure Authentication.</p>
      </footer>
    </main>
  );
}

export default LoginPage;

