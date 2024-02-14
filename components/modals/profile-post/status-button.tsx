"use client";

import { Button } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import { SetStateAction } from "react";

interface StatusButtonProps {
  currentStatus: {
    label: string;
    icon: JSX.Element;
    description: string;
  };
  activeStatus: {
    label: string;
    icon: JSX.Element;
    description: string;
  };
  onClick: (
    value: SetStateAction<{
      label: string;
      icon: JSX.Element;
      description: string;
    }>,
  ) => void;
}

export const StatusButton = ({
  currentStatus,
  activeStatus,
  onClick,
}: StatusButtonProps) => {
  return (
    <Button
      size="lg"
      onClick={() => onClick(activeStatus)}
      color={currentStatus.label === activeStatus.label ? "primary" : "default"}
      variant="bordered"
      className="h-full w-full justify-start p-2"
      radius="sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 ">
        {activeStatus.icon}
      </div>
      <div className="flex flex-col items-start justify-start gap-1 leading-none">
        <p className="text-base font-semibold">{activeStatus.label}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {activeStatus.description}
        </p>
      </div>
    </Button>
  );
};
