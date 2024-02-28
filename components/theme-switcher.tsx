"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DictionaryLanguage } from "@/data/dictionaries";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface ModeToggleProps {
  className?: string;
  dict: DictionaryLanguage;
}

export function ModeToggle({ className, dict }: ModeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger className={className}>
        <Button
          variant="outline"
          size="icon"
          className="z-[99999] rounded-[10px]"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme selector"
        classNames={{ list: "text-primary" }}
      >
        <DropdownItem aria-label="Light mode" onClick={() => setTheme("light")}>
          {dict.Theme.Light}
        </DropdownItem>
        <DropdownItem aria-label="Dark mode" onClick={() => setTheme("dark")}>
          {dict.Theme.Dark}
        </DropdownItem>
        <DropdownItem
          aria-label="System mode"
          onClick={() => setTheme("system")}
        >
          {dict.Theme.System}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
