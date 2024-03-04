"use client";

import { cn } from "@/lib/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import {
  Calendar,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ManagementItems } from "./management-items";

const icons = {
  chevron: <ChevronDown className="size-4" />,
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  annoucement: <Megaphone className="h-6 w-6" />,
  schedule: <Calendar className="h-6 w-6" />,
  score: <GraduationCap className="h-6 w-6" />,
};

export const ManagementDropdown = () => {
  const pathname = usePathname();

  return (
    <Dropdown>
      <NavbarItem isActive={pathname.includes("/management")}>
        <DropdownTrigger>
          <Button
            disableRipple
            color="primary"
            endContent={icons.chevron}
            radius="sm"
            variant="light"
            className={cn(
              "text-md text-[#7D1F1F] dark:text-primary",
              pathname.includes("/management") && "font-semibold",
            )}
          >
            Management
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <ManagementItems />
    </Dropdown>
  );
};
