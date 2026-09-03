"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Users,
  ShieldCheck,
  Search,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter,
  Building2,
  AlertTriangle,
  Mail,
  Phone,
  Shield,
  Calendar,
} from "lucide-react";
import {
  updateUserDetailsAction,
  deleteUserAction,
} from "@/actions/user.actions";

export type UserItem = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  isVerified?: boolean;
  createdAt?: string;
};

type Props = {
  users: UserItem[];
};

export default function UsersTable({ users: initialUsers }: Props) {
  const router = useRouter();
  const [usersList, setUsersList] = useState<UserItem[]>(initialUsers || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  // Modal States
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  // Edit Form State
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "USER",
    isVerified: false,
  });

  // Open Edit Modal
  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "USER",
      isVerified: !!user.isVerified,
    });
  };

  // Submit Edit Form
  const handleSaveEdit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    startTransition(async () => {
      const res = await updateUserDetailsAction(editingUser._id, editForm);
      if (res?.success) {
        toast.success("User updated successfully!");
        setUsersList((prev) =>
          prev.map((u) =>
            u._id === editingUser._id ? { ...u, ...editForm } : u,
          ),
        );
        setEditingUser(null);
        router.refresh();
      } else {
        toast.error(res?.error || "Failed to update user.");
      }
    });
  };

  // Execute Delete User
  const handleConfirmDelete = () => {
    if (!deletingUser) return;

    startTransition(async () => {
      const res = await deleteUserAction(deletingUser._id);
      if (res?.success) {
        toast.success("User deleted successfully!");
        setUsersList((prev) => prev.filter((u) => u._id !== deletingUser._id));
        setDeletingUser(null);
        router.refresh();
      } else {
        toast.error(res?.error || "Failed to delete user.");
      }
    });
  };

  // Filtered Users
  const filteredUsers = usersList.filter((user) => {
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchTerm));

    const matchesRole =
      roleFilter === "ALL" ? true : user.role?.toUpperCase() === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Calculate Statistics
  const totalUsers = usersList.length;
  const adminCount = usersList.filter((u) => u.role === "ADMIN").length;
  const agentCount = usersList.filter((u) => u.role === "AGENT").length;
  const verifiedCount = usersList.filter((u) => u.isVerified).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AffProp User Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              User Directory & Spreadsheet
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              View, edit roles, verify partner credentials, and manage all
              registered user accounts in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Users
            </span>
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalUsers}
          </div>
          <p className="text-xs text-zinc-400">Registered platform accounts</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Verified Accounts
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {verifiedCount}
          </div>
          <p className="text-xs text-zinc-400">Identity-verified users</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Administrators
            </span>
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">
            {adminCount}
          </div>
          <p className="text-xs text-zinc-400">Full control role</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Agents & Partners
            </span>
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
            {agentCount}
          </div>
          <p className="text-xs text-zinc-400">Listing creators</p>
        </div>
      </div>

      {/* Toolbar: Search & Role Filter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Role Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Role:
          </span>
          {["ALL", "ADMIN", "AGENT", "USER"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                roleFilter === role
                  ? "bg-green-500 text-black shadow-md shadow-green-500/20"
                  : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Spreadsheet Data Table Container */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4 text-center w-12 border-r border-zinc-800/60">
                  #
                </th>
                <th className="py-4 px-5 border-r border-zinc-800/60">
                  User Information
                </th>
                <th className="py-4 px-4 border-r border-zinc-800/60">Role</th>
                <th className="py-4 px-4 border-r border-zinc-800/60">
                  Phone Number
                </th>
                <th className="py-4 px-4 border-r border-zinc-800/60">
                  Verification
                </th>
                <th className="py-4 px-4 border-r border-zinc-800/60">
                  Joined
                </th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => {
                  const initial = (
                    user.firstName?.[0] ||
                    user.email[0] ||
                    "U"
                  ).toUpperCase();
                  const fullName =
                    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                    "N/A";

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-zinc-800/40 transition-colors group"
                    >
                      {/* Row Index */}
                      <td className="py-4 px-4 text-center font-mono text-zinc-500 border-r border-zinc-800/60 group-hover:text-zinc-300">
                        {idx + 1}
                      </td>

                      {/* User Info (Avatar + Name + Email) */}
                      <td className="py-4 px-5 border-r border-zinc-800/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-black font-extrabold text-sm shadow-md shadow-green-500/10 shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white group-hover:text-green-400 transition-colors truncate">
                              {fullName}
                            </div>
                            <div className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
                              <Mail className="w-3 h-3 text-zinc-500 shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4 border-r border-zinc-800/60">
                        {user.role === "ADMIN" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                            <Shield className="w-3 h-3" />
                            ADMIN
                          </span>
                        )}
                        {user.role === "AGENT" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            <Building2 className="w-3 h-3" />
                            AGENT
                          </span>
                        )}
                        {user.role !== "ADMIN" && user.role !== "AGENT" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                            USER
                          </span>
                        )}
                      </td>

                      {/* Phone Number */}
                      <td className="py-4 px-4 font-mono text-xs border-r border-zinc-800/60">
                        {user.phoneNumber ? (
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Phone className="w-3 h-3 text-zinc-500" />
                            {user.phoneNumber}
                          </span>
                        ) : (
                          <span className="text-zinc-600 italic">Not set</span>
                        )}
                      </td>

                      {/* Verification Status */}
                      <td className="py-4 px-4 border-r border-zinc-800/60">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <Clock className="w-3.5 h-3.5" />
                            Unverified
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-4 text-xs text-zinc-400 border-r border-zinc-800/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            title="Edit User Details"
                            className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-green-500/50 hover:bg-green-500/10 text-zinc-400 hover:text-green-400 transition-all cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingUser(user)}
                            title="Delete User"
                            className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-zinc-400">
                        No users found matching query
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setRoleFilter("ALL");
                        }}
                        className="text-xs text-green-400 hover:underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Bar */}
        <div className="px-5 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredUsers.length}</strong> of{" "}
            <strong className="text-white">{usersList.length}</strong> users
          </span>
          <span className="text-[11px] text-zinc-500">
            Spreadsheet View • Live Updates
          </span>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Pencil className="w-5 h-5 text-green-400" />
                <span>Edit User Account</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Update account details for{" "}
                <span className="text-white font-medium">
                  {editingUser.email}
                </span>
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500/50"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editForm.phoneNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phoneNumber: e.target.value })
                  }
                  placeholder="+234 800 000 0000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Role Permission
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({ ...editForm, role: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500/50"
                >
                  <option value="USER">USER (Standard Partner)</option>
                  <option value="AGENT">AGENT (Property Partner)</option>
                  <option value="ADMIN">ADMIN (Full Platform Access)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <input
                  type="checkbox"
                  id="isVerifiedCheckbox"
                  checked={editForm.isVerified}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isVerified: e.target.checked })
                  }
                  className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-green-500 focus:ring-green-500 cursor-pointer"
                />
                <label
                  htmlFor="isVerifiedCheckbox"
                  className="text-xs font-semibold text-white cursor-pointer select-none"
                >
                  Mark Account as Identity Verified
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Delete User Account
                </h3>
                <p className="text-xs text-zinc-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              Are you sure you want to delete{" "}
              <strong className="text-white">
                {deletingUser.firstName} {deletingUser.lastName}
              </strong>{" "}
              (<span className="text-green-400">{deletingUser.email}</span>)?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs transition-all shadow-lg shadow-red-500/20 cursor-pointer disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
