"use client";

import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/react";
import {
  CalendarCheck,
  Group,
  MessageCircle,
  Newspaper,
  PenLine,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "News Feeds",
    icon: <Newspaper className="h-4 w-4" />,
    href: "/student/profile/news",
  },
  {
    label: "Friends",
    icon: <Users className="h-4 w-4" />,
    href: "/student/profile/friends",
  },
  {
    label: "Groups",
    icon: <Group className="h-4 w-4" />,
    href: "/student/profile/groups",
  },
  {
    label: "Blogs",
    icon: <PenLine className="h-4 w-4" />,
    href: "/student/profile/blogs",
  },
  {
    label: "Events",
    icon: <CalendarCheck className="h-4 w-4" />,
    href: "/student/profile/events",
  },
  {
    label: "Messages",
    icon: <MessageCircle className="h-4 w-4" />,
    href: "/student/profile/messages",
  },
];

export const ProfileNavigationList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4">
      {items.map((item) => (
        <Link
          isBlock
          size="lg"
          key={item.label}
          className={cn(
            "flex items-center justify-center gap-x-2 p-2 text-sm text-muted-foreground lg:justify-start",
            pathname.includes(item.href) &&
              "font-semibold text-[#7D1f1F] dark:text-primary",
          )}
          href={item.href}
        >
          {item.icon}
          <span className="hidden lg:block">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
