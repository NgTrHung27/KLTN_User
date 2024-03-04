"use client";

import {
  Avatar,
  Divider,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { UserButton } from "./user-button";
import { ExtendedUser } from "@/auth";
import { CameraIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ManagementDropdown } from "./management-dropdown";
import { MobileManagementDropdown } from "./mobile-management-dropdown";
import { DictionaryLanguage } from "@/data/dictionaries";
import Image from "next/image";
import { UserAvatar } from "../user-avatar";

interface ProtectedNavbarProps {
  user: ExtendedUser;
  dict: DictionaryLanguage;
}

export const ProtectedNavbar = ({ user, dict }: ProtectedNavbarProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsOpen}
      className="bg-white dark:bg-background"
      classNames={{
        wrapper: "max-w-full flex h-[85px] p-0 pl-3 pr-6",
        menu: "top-[85px] bg-white dark:bg-background",
        toggleIcon: "text-[#7D1f1F] dark:text-primary",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#7D1F1F] data-[active=true]:dark:after:bg-primary",
        ],
      }}
    >
      {/* Branding & Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Image
            height={85}
            width={92}
            priority={true}
            style={{ width: "auto", height: "auto" }}
            quality={100}
            alt="logo"
            src="/logo-red.webp"
            className="h-fit"
          />
          <p className="font-bold text-[#7D1F1F] dark:text-primary md:text-xs lg:text-base">
            Quan Ly Du Hoc
          </p>
        </NavbarBrand>
      </NavbarContent>
      {/* Navigation */}
      <NavbarContent className="hidden gap-4 md:flex" justify="start">
        <NavbarItem isActive={pathname.includes("/profile")}>
          <Link
            color="primary"
            href="/student/profile"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Profile
          </Link>
        </NavbarItem>
        <ManagementDropdown />
        <NavbarItem isActive={pathname.includes("/settings")}>
          <Link
            color="primary"
            href="/student/settings"
            className="text-[#7D1F1F] dark:text-primary"
          >
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end" className="hidden md:flex">
        <Input
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          classNames={{
            base: "max-w-full md:max-w-[16rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
        />
        <UserButton user={user} dict={dict} />
      </NavbarContent>
      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="flex items-center gap-x-4 py-1.5">
          <UserAvatar
            name={user.name!}
            description={user.studentCode}
            image={user.image || undefined}
          />
        </div>
        <Divider />
        <MobileManagementDropdown />
      </NavbarMenu>
    </Navbar>
  );
};
