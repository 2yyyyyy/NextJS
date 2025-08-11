import {
  LucideBook,
  LucideBookCopy,
  LucideCircleUser,
  LucideLibrary,
  LucideUsers,
} from "lucide-react";
import { NavItem } from "@/app/_navigation/sidebar/types";
import {
  accountProfilePath,
  homePath,
  organizationPath,
  ticketByOrganizationPath,
  ticketsPath,
} from "@/path";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "Our Tickets",
    href: ticketByOrganizationPath(),
    icon: <LucideBookCopy />,
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
  {
    title: "Organization",
    href: organizationPath(),
    icon: <LucideUsers />,
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40  group-hover:ml-4 group-hover:rounded group-hover:bg-forground group-hover:p-2 group-hover:opacity-100";
