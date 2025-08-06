"use client";
import { accountProfilePath, accountPasswordPath } from "@/path";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountTabs = () => {
  const path = usePathname();
  return (
    <Tabs value={path.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger asChild value="profile">
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="password">
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
