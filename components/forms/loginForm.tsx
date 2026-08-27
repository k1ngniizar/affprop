"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/validations";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/auth.actions";
import {
  Eye,
  EyeClosed,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(data: LoginInput) {
    startTransition(async () => {
      try {
        const result = await loginAction(data);

        if (!result?.success) {
          toast.error(result.message || "Invalid credentials.");
          return;
        }

        toast.success("Welcome back!");
        window.location.href = "/dashboard";
      } catch (error: any) {
        toast.error(error.message || "Failed to sign in.");
      }
    });
  }

  return (
    <div className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Left Column: Visual Showcase */}
      <div className="hidden md:flex md:w-1/2 relative bg-zinc-950 p-8 lg:p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent z-10" />
        {/* Ambient Green Circle Orbs */}
        <div className="absolute top-1/4 -right-10 w-56 h-56 bg-green-500/30 blur-3xl rounded-full z-10 pointer-events-none" />
        <div className="absolute bottom-10 -left-10 w-48 h-48 bg-emerald-400/25 blur-2xl rounded-full z-10 pointer-events-none" />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          alt="Luxury Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />

        {/* Brand Badge */}
        <div className="relative z-20">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Aff<span className="text-green-400">Prop</span>
            </span>
          </Link>
        </div>

        {/* Value Prop */}
        <div className="relative z-20 space-y-6 my-auto pt-12 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Affiliate Real Estate</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Monetize & Manage Listings Effortlessly.
          </h2>

          <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Instant affiliate referral tracking</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Verified property listings & transparent payouts</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Real-time impression & lead analytics</span>
            </li>
          </ul>
        </div>

        <p className="relative z-20 text-xs text-zinc-500">
          © {new Date().getFullYear()} AffProp. All rights reserved.
        </p>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back 👋
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Sign in to access your partner dashboard and manage properties.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
            />
            {errors.email && (
              <p className="text-xs text-red-400 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-zinc-300">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-zinc-800/80 text-center text-xs text-zinc-400">
          Don't have an account yet?{" "}
          <Link
            href="/register"
            className="text-green-400 hover:text-green-300 font-bold transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

