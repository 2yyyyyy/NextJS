"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/action/cookie";

const RedirectToast = () => {
  const path = usePathname();

  useEffect(() => {
    const showCookitToast = async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    };
    showCookitToast();
  }, [path]);
  return null;
};

export { RedirectToast };
