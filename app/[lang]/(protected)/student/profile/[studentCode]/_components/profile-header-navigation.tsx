"use client";

import { Chip, Link, Tab, Tabs } from "@nextui-org/react";

interface ProfileHeaderNavigationProps {
  studentCode: string;
  pathname: string;
  postCount?: number;
}

export const ProfileHeaderNavigation = ({
  studentCode,
  pathname,
  postCount,
}: ProfileHeaderNavigationProps) => {
  return (
    <Tabs
      key="profile"
      variant="underlined"
      aria-label="Profile in general"
      classNames={{
        tabList: "gap-4",
        cursor: "w-full bg-primary",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-primary",
      }}
      selectedKey={pathname.slice(3)}
      className="z-10"
    >
      <Tab
        as={Link}
        key={`/student/profile/${studentCode}`}
        title={
          <div className="flex items-center gap-2 text-primary">
            <Chip radius="full">{postCount}</Chip>
            <span className="text-lg font-semibold">Posts</span>
          </div>
        }
        href={`/student/profile/${studentCode}`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${studentCode}/followers`}
        title={
          <div className="flex items-center gap-2 text-primary">
            <Chip radius="full">{0}</Chip>
            <span className="text-lg font-semibold">Followers</span>
          </div>
        }
        href={`/student/profile/${studentCode}/followers`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${studentCode}/following`}
        title={
          <div className="flex items-center gap-2 text-primary">
            <Chip radius="full">{0}</Chip>
            <span className="text-lg font-semibold">Following</span>
          </div>
        }
        href={`/student/profile/${studentCode}/following`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${studentCode}/friends`}
        title={
          <div className="flex items-center gap-2 text-primary">
            <Chip radius="full">{0}</Chip>
            <span className="text-lg font-semibold">Friends</span>
          </div>
        }
        href={`/student/profile/${studentCode}/friends`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${studentCode}/blogs`}
        title={
          <div className="flex items-center gap-2 text-primary">
            <Chip radius="full">{0}</Chip>
            <span className="text-lg font-semibold">Blogs</span>
          </div>
        }
        href={`/student/profile/${studentCode}/blogs`}
        className="overflow-hidden"
      />
    </Tabs>
  );
};
