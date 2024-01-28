"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  Link,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ManagementItems } from "./management-items";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/logout";

const menuItems = [
  "Profile",
  "Activity",
  "Settings",
  "Help & Feedbacks",
  "Log Out",
];

const icons = {
  chevron: <ChevronDown className="h-4 w-4" />,
};

export const MobileManagementDropdown = () => {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((item, index) =>
        index === 1 ? (
          <Dropdown key={1} placement="bottom-start">
            <NavbarMenuItem isActive={pathname.includes("/management")} key={1}>
              <DropdownTrigger>
                <Button
                  disableRipple
                  color="primary"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                  className={cn(
                    "h-full w-full justify-start p-0 text-large",
                    pathname.includes("/student/management") && "font-semibold",
                  )}
                >
                  Management
                </Button>
              </DropdownTrigger>
            </NavbarMenuItem>
            <ManagementItems />
          </Dropdown>
        ) : index === menuItems.length - 1 ? (
          <NavbarMenuItem
            isActive={pathname.includes(`/${item.toLowerCase()}`)}
            key={`${item}-${index}`}
          >
            <Button
              onClick={() => logout()}
              disableRipple
              color="danger"
              radius="sm"
              variant="light"
              className="h-full w-full justify-start p-0 text-large"
            >
              Log Out
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem
            isActive={pathname.includes(`/${item.toLowerCase()}`)}
            key={`${item}-${index}`}
          >
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href={
                index === menuItems.length - 2
                  ? "/student/support"
                  : `/student/${item.toLowerCase()}`
              }
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ),
      )}
    </>
  );
};
