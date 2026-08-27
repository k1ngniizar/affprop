"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, type RegisterInput } from "@/validations";
import {
  Eye,
  EyeClosed,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { registerAction } from "@/actions/auth.actions";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    try {
      const result = await registerAction(data);

      if (!result.success) {
        toast.error("User registration failed. Please try again.");
        return;
      }

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      const isError =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(isError);
    }
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
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop"
          alt="Modern Real Estate Estate"
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
            <span>Join 5,000+ Real Estate Partners</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Start Listing & Earning 5% Commissions.
          </h2>

          <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Free partner account setup in under 2 minutes</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Publish unlimited property listings with photo gallery</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              <span>Share unique referral links for instant commissions</span>
            </li>
          </ul>
        </div>

        <p className="relative z-20 text-xs text-zinc-500">
          © {new Date().getFullYear()} AffProp. All rights reserved.
        </p>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Account ✨
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Sign up as a property owner, buyer, or affiliate partner.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="firstName" className="text-xs font-semibold text-zinc-300">
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName")}
                placeholder="John"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
              {errors.firstName && (
                <p className="text-[11px] text-red-400 font-medium">
                  {errors.firstName.message || "First name required"}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="text-xs font-semibold text-zinc-300">
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName")}
                placeholder="Doe"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
              {errors.lastName && (
                <p className="text-[11px] text-red-400 font-medium">
                  {errors.lastName.message || "Last name required"}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-semibold text-zinc-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-400 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-xs font-semibold text-zinc-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-400 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <>
                <span>Create Partner Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-3 border-t border-zinc-800/80 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 font-bold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

