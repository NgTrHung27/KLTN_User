"use client";

import { logout } from "@/actions/logout";
import { ExtendedUser } from "@/auth";
import { DictionaryLanguage } from "@/data/dictionaries";
import {
  Avatar,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Switch,
} from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { UserAvatar } from "../user-avatar";

interface UserButtonProps {
  user: ExtendedUser;
  dict: DictionaryLanguage;
}

export const UserButton = ({ user, dict }: UserButtonProps) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return <CircularProgress size="sm" aria-label="Loading..." />;
  }

  const onLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <Dropdown placement="bottom-end" backdrop="blur" closeOnSelect={false}>
      <DropdownTrigger>
        <Avatar isBordered color="secondary" size="sm" src={user.image || ""} />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection
          title="Student's information"
          showDivider
          aria-label="Student"
        >
          <DropdownItem
            as={Link}
            key="profile"
            aria-label="User with information"
            className="h-14 gap-4"
            href={`/student/profile/${user.studentCode}`}
          >
            <div className="p-1">
              <UserAvatar
                name={user.name!}
                image={user.image || undefined}
                description={user.studentCode}
              />
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Actions" showDivider aria-label="Actions">
          <DropdownItem as={Link} href="/student/settings" key="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/student/support"
            key="help_and_feedback"
          >
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            key="theme"
            className="text-primary"
            endContent={
              <Switch
                defaultSelected={theme === "light" ? true : false}
                size="sm"
                color="primary"
                onValueChange={(isSelected) => {
                  setTheme(isSelected ? "light" : "dark");
                }}
                startContent={<Sun />}
                endContent={<Moon />}
              />
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          onClick={onLogout}
          key="logout"
          color="danger"
          className="text-primary"
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
