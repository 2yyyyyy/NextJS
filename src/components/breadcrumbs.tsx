import { LucideChevronDown, LucideSlash } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadcrumbsProps = {
  breadcrumbs: {
    title: string;
    href?: string;
    dropdown?: {
      title: string;
      href: string;
    }[];
  }[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          let breadcrumbItem = (
            <BreadcrumbPage className="text-lg font-medium">
              {breadcrumb.title}
            </BreadcrumbPage>
          );

          if (breadcrumb.href) {
            breadcrumbItem = (
              <BreadcrumbLink asChild className="text-lg font-medium">
                <Link
                  href={breadcrumb.href}
                  className="flex items-center gap-1"
                >
                  {breadcrumb.title}
                </Link>
              </BreadcrumbLink>
            );
          }

          if (breadcrumb.dropdown) {
            breadcrumbItem = (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-lg">
                  {breadcrumb.title}
                  <LucideChevronDown className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {breadcrumb.dropdown.map((item) => (
                    <DropdownMenuItem
                      key={item.title}
                      asChild
                      className="text-base"
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          return (
            <Fragment key={breadcrumb.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <LucideSlash className="size-4" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Breadcrumbs };
