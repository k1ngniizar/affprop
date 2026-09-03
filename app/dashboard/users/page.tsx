import { getAllUsersAction } from "@/actions/user.actions";
import UsersTable from "@/components/dashboard/users-table";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  const result = await getAllUsersAction();

  if (!result || !result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Restricted</h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          {result?.error ||
            "You do not have Administrator permissions to view the user directory spreadsheet."}
        </p>
        <Link
          href="/dashboard"
          className="mt-6 px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-xs transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const users = result.data || [];

  return <UsersTable users={users} />;
}
