import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByIdAction } from "@/actions/user.actions";
import { getPropertiesByTargetUserIdAction } from "@/actions/property.actions";
import ProfileView from "@/components/profile/profile-view";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardNavbar from "@/components/dashboard/navbar";
import Link from "next/link";
import { UserX } from "lucide-react";
import Header from "@/components/Header";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { userId } = await params;
  const session = await auth();

  // Fetch target user data
  const userRes = await getUserByIdAction(userId);

  if (!userRes || !userRes.success || !userRes.data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
          <UserX className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          User Profile Not Found
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          The user profile you are looking for does not exist or has been
          removed.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs transition-all shadow-lg shadow-green-500/20"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const user = userRes.data;

  // Fetch properties created by this user
  const propsRes = await getPropertiesByTargetUserIdAction(userId);
  const properties = propsRes?.data || [];

  const isOwner = session?.user?.id === user._id;
  const isAdmin = session?.user?.role === "ADMIN";

  // If logged in, wrap in Dashboard layout shell
  if (session?.user) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row relative">
        <DashboardSidebar user={session.user} />
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-950 min-h-screen border-l border-zinc-800/80">
          <DashboardNavbar user={session.user} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            <ProfileView
              user={user}
              properties={properties}
              isOwner={isOwner}
              isAdmin={isAdmin}
            />
          </main>
        </div>
      </div>
    );
  }

  // Public standalone fallback view
  return (
    <div className="min-h-screen space-y-10 bg-zinc-950 text-white font-sans p-4 sm:p-8">
      <Header session={session} />
      <ProfileView
        user={user}
        properties={properties}
        isOwner={isOwner}
        isAdmin={isAdmin}
      />
    </div>
  );
}
