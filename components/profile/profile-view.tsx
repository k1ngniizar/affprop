"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  Share2,
  Sparkles,
  Pencil,
  CheckCircle2,
  Clock,
  MapPin,
  Eye,
  ArrowRight,
  Shield,
  Calendar,
  Save,
  Check,
} from "lucide-react";
import { updateUserDetailsAction } from "@/actions/user.actions";
import { wholeToFrac } from "@/lib/wholeToFrac";
import PropertyGrid from "../PropertyGrid";

type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  isVerified?: boolean;
  createdAt?: string;
};

type PropertyData = {
  _id: string;
  title: string;
  price: number;
  listingType: string;
  propertyType: string;
  views?: number;
  images?: { url?: string };
  location?: { city?: string; state?: string };
};

type Props = {
  user: UserData;
  properties: PropertyData[];
  isOwner: boolean;
  isAdmin: boolean;
};

export default function ProfileView({
  user,
  properties,
  isOwner,
  isAdmin,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
  });

  const canEdit = isOwner || isAdmin;
  const initial = (user.firstName?.[0] || user.email?.[0] || "U").toUpperCase();
  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User Partner";
  const referralLink = `https://affprop.com/ref?user=${user._id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Affiliate referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    startTransition(async () => {
      const res = await updateUserDetailsAction(user._id, form);
      if (res?.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res?.error || "Failed to update profile.");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* User Header / Hero Card */}
      <div className="relative rounded-3xl bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* User Initials Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-black font-black text-3xl shadow-xl shadow-green-500/20 shrink-0">
              {initial}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {fullName}
                </h1>

                {/* Role Badge */}
                {user.role === "ADMIN" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    ADMIN
                  </span>
                )}
                {user.role === "AGENT" && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    AGENT
                  </span>
                )}
                {user.role !== "ADMIN" && user.role !== "AGENT" && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                    PARTNER
                  </span>
                )}

                {/* Verification Badge */}
                {user.isVerified ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Partner
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Pending Verification
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {user.email}
                </span>

                {user.phoneNumber && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    {user.phoneNumber}
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Member since{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "2026"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-center">
              <span className="block text-xl font-extrabold text-white">
                {properties.length}
              </span>
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Listings
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left Section: Personal Information Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-green-400" />
                  <span>Personal Details</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {canEdit
                    ? "Update your profile details and contact preferences."
                    : "Public details for this AffProp partner."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 disabled:opacity-60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 disabled:opacity-60 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none cursor-not-allowed"
                />
                <p className="text-[11px] text-zinc-500">
                  Email is used for account authentication and payouts.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                  placeholder="+234 800 000 0000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 disabled:opacity-60 transition-all"
                />
              </div>

              {canEdit && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {isPending ? "Saving Details..." : "Save Profile Details"}
                    </span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Sidebar: Referral Link Share & Partner Badges */}
        <div className="space-y-6">
          {/* Affiliate Referral Share Widget */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-green-400" />
                <span>Affiliate Referral Link</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Share this referral link across social media or clients to earn
                up to 5% commission.
              </p>
            </div>

            <div className="space-y-2">
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl">
                <p className="text-xs font-mono text-zinc-300 break-all select-all">
                  {referralLink}
                </p>
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-md shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Referral Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Referral Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Commission Payout Rate</span>
              <span className="font-bold text-green-400 bg-green-500/10 border border-green-500/30 px-2.5 py-0.5 rounded-full">
                5% Average
              </span>
            </div>
          </div>

          {/* Account Credentials Card */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Partner Status</span>
            </h3>

            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-center justify-between">
                <span className="text-zinc-400">Role Status</span>
                <span className="font-semibold text-white uppercase">
                  {user.role}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-zinc-400">Identity Verification</span>
                <span
                  className={
                    user.isVerified
                      ? "text-emerald-400 font-bold"
                      : "text-amber-400 font-bold"
                  }
                >
                  {user.isVerified ? "Verified" : "Pending Review"}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-zinc-400">Platform Security</span>
                <span className="text-green-400 font-medium">
                  Encrypted Session
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Property Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Property Listings ({properties.length})
            </h3>
            <p className="text-xs text-zinc-400">
              Properties published by {fullName}.
            </p>
          </div>
        </div>

        {properties.length > 0 ? (
          <PropertyGrid property={properties} isPublic={false} />
        ) : (
          <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">
              No Properties Listed Yet
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              This user has not published any property listings to the AffProp
              catalog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
