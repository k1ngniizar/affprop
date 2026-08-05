import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardNavbar from "@/components/dashboard/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session?.user);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen max-h-screen flex  relative border-3 border-pink-600 overflow-hidden gap-5">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 relative">
        <DashboardNavbar user={session.user} />

        <main className="flex-1 border overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
