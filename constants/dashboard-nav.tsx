import { LucideChartBar, LucideHouse, LucideUser, LucideUserCheck } from "lucide-react";

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
    href: "/profile",
    icon: <LucideUserCheck />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <LucideUser />,
  },
];
