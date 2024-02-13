"use client";

import { Link, Tab, Tabs } from "@nextui-org/react";

interface ProfileHeaderNavigationProps {
  profileId: string;
  pathname: string;
  postCount?: number;
}

export const ProfileHeaderNavigation = ({
  profileId,
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
        key={`/student/profile/${profileId}/posts`}
        title={
          <div className="flex flex-col items-center text-primary ">
            <span className="text-xl font-bold">{postCount || 0}</span>
            <span className="text-base font-semibold">Posts</span>
          </div>
        }
        href={`/student/profile/${profileId}/posts`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${profileId}/followers`}
        title={
          <div className="flex flex-col items-center text-primary ">
            <span className="text-xl font-bold">0</span>
            <span className="text-base font-semibold">Followers</span>
          </div>
        }
        href={`/student/profile/${profileId}/followers`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${profileId}/following`}
        title={
          <div className="flex flex-col items-center text-primary ">
            <span className="text-xl font-bold">0</span>
            <span className="text-base font-semibold">Following</span>
          </div>
        }
        href={`/student/profile/${profileId}/following`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${profileId}/friends`}
        title={
          <div className="flex flex-col items-center text-primary ">
            <span className="text-xl font-bold">0</span>
            <span className="text-base font-semibold">Friends</span>
          </div>
        }
        href={`/student/profile/${profileId}/friends`}
        className="overflow-hidden"
      />
      <Tab
        as={Link}
        key={`/student/profile/${profileId}/blogs`}
        title={
          <div className="flex flex-col items-center text-primary ">
            <span className="text-xl font-bold">0</span>
            <span className="text-base font-semibold">Blogs</span>
          </div>
        }
        href={`/student/profile/${profileId}/blogs`}
        className="overflow-hidden"
      />
    </Tabs>
  );
};
