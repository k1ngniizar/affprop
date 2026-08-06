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
    <div className="min-h-screen max-h-screen  lg:max-h-screen lg:min-h-screen xl:max-h-[95vh] xl:min-h-[95vh] 2xl:max-h-[80vh] 2xl:min-h-[80vh] flex relative  overflow-hidden max-w-7xl m-auto w-full rounded-sm gap-4 2xl:gap-10">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 relative p-3 bg-zinc-900 max-w-7xl border border-zinc-700 rounded-sm">
        <DashboardNavbar user={session.user} />

        <main className="flex-1 overflow-y-auto p-2">{children}</main>
      </div>
    </div>
  );
}
