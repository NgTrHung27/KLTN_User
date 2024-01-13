"use client";

import { cn } from "@nextui-org/react";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1
        className={cn("text-3xl font-semibold text-[#7D1F1F]", font.className)}
      >
        🔐 Login
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
