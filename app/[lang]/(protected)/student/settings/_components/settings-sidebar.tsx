"use client";

import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/react";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Account",
    icon: <User className="size-4" />,
    href: "/student/settings/account",
  },
  {
    label: "Appearance",
    icon: <User className="size-4" />,
    href: "/student/settings/appearance",
  },
  {
    label: "Notifications",
    icon: <User className="size-4" />,
    href: "/student/settings/notifications",
  },
  {
    label: "Display",
    icon: <User className="size-4" />,
    href: "/student/settings/display",
  },
];

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full w-full space-y-2 bg-white dark:bg-background">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          size="lg"
          className={cn(
            "w-full rounded-sm text-base text-muted-foreground hover:bg-primary/10 hover:text-[#7D1F1F] dark:hover:text-white",
            pathname.includes(item.href) &&
              "bg-[#7D1F1F]/10 font-semibold text-[#7D1F1F] dark:bg-white/10 dark:text-primary",
          )}
        >
          <span className="flex-1 px-2">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
