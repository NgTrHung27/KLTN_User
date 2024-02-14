"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

interface IconPickerProps {
  onClick?: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
  isOpen: boolean;
  onOpen: () => void;
}

export const IconPicker = ({
  onClick,
  children,
  isOpen,
  onOpen,
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover isOpen={isOpen} placement="bottom">
      <PopoverTrigger onClick={onOpen}>{children}</PopoverTrigger>
      <PopoverContent className=" border-none p-0 shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onClick?.(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
