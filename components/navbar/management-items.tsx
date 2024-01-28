"use client";

import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import {
  Calendar,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import { useRouter } from "next/navigation";

const icons = {
  chevron: <ChevronDown className="h-4 w-4" />,
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  annoucement: <Megaphone className="h-6 w-6" />,
  schedule: <Calendar className="h-6 w-6" />,
  score: <GraduationCap className="h-6 w-6" />,
};

export const ManagementItems = () => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu
        aria-label="Manangement Features"
        className="w-[300px]"
        itemClasses={{ base: "gap-4" }}
      >
        <DropdownItem
          onClick={() => router.push("/student/management/dashboard")}
          key="dashboard"
          description="Overall scores, notifications and more"
          startContent={icons.dashboard}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push("/student/management/annoucement")}
          key="annoucement"
          description="Overall scores, notifications and more"
          startContent={icons.annoucement}
        >
          Annoucement
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push("/student/management/schedule")}
          key="schedule"
          description="Overall scores, notifications and more"
          startContent={icons.schedule}
        >
          Schedule
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push("/student/management/score")}
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
