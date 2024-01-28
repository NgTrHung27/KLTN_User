"use client";

import { ExtendedUser } from "@/auth";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ModeToggle } from "../theme-switcher";
import { DictionaryLanguage } from "@/data/dictionaries";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

interface UserButtonProps {
  user: ExtendedUser;
  dict: DictionaryLanguage;
}

export const UserButton = ({ user, dict }: UserButtonProps) => {
  const router = useRouter();

  return (
    <Dropdown placement="bottom-end" backdrop="blur" closeOnSelect={false}>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user.name || "Student"}
          size="sm"
          src={user.image || "/placeholder.jpg"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Information" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-4">
          <div className="flex items-center justify-between gap-x-4">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="font-semibold">{user.studentCode}</p>
            </div>
            <ModeToggle dict={dict} />
          </div>
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push("/student/settings")}
          key="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push("/student/support")}
          key="help_and_feedback"
        >
          Help & Feedback
        </DropdownItem>
        <DropdownItem onClick={() => logout()} key="logout" color="danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
