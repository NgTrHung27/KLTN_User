"use client";

import { Button, Link } from "@nextui-org/react";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link size="sm" color="foreground" underline="hover" href={href}>
      {label}
    </Link>
  );
};
