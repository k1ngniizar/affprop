import { LucideChartBar, LucideHouse, LucideUser } from "lucide-react";

export const dashboardNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LucideChartBar />,
  },
  {
    title: "My Properties",
    href: "/dashboard/properties",
    icon: <LucideHouse />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <LucideUser />,
  },
];
