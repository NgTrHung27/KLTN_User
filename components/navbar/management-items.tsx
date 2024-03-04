"use client";

import { DropdownItem, DropdownMenu, Link } from "@nextui-org/react";
import {
  Calendar,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";

const icons = {
  chevron: <ChevronDown className="size-4" />,
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  annoucement: <Megaphone className="h-6 w-6" />,
  schedule: <Calendar className="h-6 w-6" />,
  score: <GraduationCap className="h-6 w-6" />,
};

export const ManagementItems = () => {
  return (
    <>
      <DropdownMenu
        aria-label="Manangement Features"
        className="w-[300px]"
        itemClasses={{ base: "gap-4" }}
      >
        <DropdownItem
          as={Link}
          key="dashboard"
          description="Overall scores, notifications and more"
          startContent={icons.dashboard}
          href="/student/management/dashboard"
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/student/management/annoucement"
          key="annoucement"
          description="Overall scores, notifications and more"
          startContent={icons.annoucement}
        >
          Annoucement
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/student/management/schedule"
          key="schedule"
          description="Overall scores, notifications and more"
          startContent={icons.schedule}
        >
          Schedule
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/student/management/score"
          key="score"
          description="Overall scores, notifications and more"
          startContent={icons.score}
        >
          Score
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};
