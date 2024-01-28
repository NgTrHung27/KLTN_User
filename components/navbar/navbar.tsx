"use client";

import {
  Divider,
  Image,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { UserButton } from "./user-button";
import { ExtendedUser } from "@/auth";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ManagementDropdown } from "./management-dropdown";
import { MobileManagementDropdown } from "./mobile-management-dropdown";
import { DictionaryLanguage } from "@/data/dictionaries";

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
      classNames={{
        wrapper: "max-w-full flex h-[85px] p-0 pl-3 pr-6",
        menu: ["top-[85px]"],
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
          "data-[active=true]:after:bg-primary data-[active=true]:dark:after:bg-[#7D1F1F]",
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
          <Image alt="logo" src="/logo-red.png" className="h-fit" />
          <p className="font-bold text-inherit">Quan Ly Du Hoc</p>
        </NavbarBrand>
      </NavbarContent>
      {/* Navigation */}
      <NavbarContent className="hidden gap-4 md:flex" justify="start">
        <NavbarItem isActive={pathname.includes("/profile")}>
          <Link color="primary" href="/student/profile">
            Profile
          </Link>
        </NavbarItem>
        <ManagementDropdown />
        <NavbarItem isActive={pathname.includes("/settings")}>
          <Link color="primary" href="/student/settings">
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
            base: "max-w-full sm:max-w-[10rem] h-10",
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
        <div className="py-1.5">
          <p className="font-semibold">{user.name}</p>
          <p className="font-semibold">{user.studentCode}</p>
        </div>
        <Divider />
        <MobileManagementDropdown />
      </NavbarMenu>
    </Navbar>
  );
};
