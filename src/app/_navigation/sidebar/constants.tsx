import {
  LucideBook,
  LucideCircle,
  LucideCircleUser,
  LucideLibrary,
} from "lucide-react";
import { NavItem } from "@/components/sidebar/types";
import { accountProfilePath, homePath, ticketsPath } from "@/path";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "My Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
  },
  {
    separator: true,
    title: "Account",
    href: accountProfilePath(),
    icon: <LucideCircleUser />,
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40  group-hover:ml-4 group-hover:rounded group-hover:bg-forground group-hover:p-2 group-hover:opacity-100";
