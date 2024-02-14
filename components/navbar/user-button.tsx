"use client";

import { ExtendedUser } from "@/auth";
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
import { DictionaryLanguage } from "@/data/dictionaries";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

interface UserButtonProps {
  user: ExtendedUser;
  dict: DictionaryLanguage;
}

export const UserButton = ({ user, dict }: UserButtonProps) => {
  const router = useRouter();

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
        <Avatar
          isBordered
          color="secondary"
          name={"Image"}
          size="sm"
          src={user.image || "/placeholder.webp"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection
          title="Student's information"
          showDivider
          aria-label="Student"
        >
          <DropdownItem
            key="profile"
            aria-label="User with information"
            className="h-14 gap-4"
          >
            <div className="flex items-center justify-between gap-x-4">
              <div>
                <p className="font-semibold text-primary">{user.name}</p>
                <p className="font-semibold text-primary">{user.studentCode}</p>
              </div>
              <Switch
                defaultSelected={theme === "light" ? true : false}
                size="sm"
                color="primary"
                onValueChange={(isSelected) => {
                  setTheme(isSelected ? "light" : "dark");
                  window.location.reload();
                }}
                startContent={<Sun />}
                endContent={<Moon />}
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
