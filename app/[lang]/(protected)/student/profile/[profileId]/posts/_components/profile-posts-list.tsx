"use client";

import { Post } from "@prisma/client";
import { ProfilePostItem } from "./profile-post-item";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { Check, ChevronDown } from "lucide-react";
import { useNewestProfilePosts } from "@/hooks/use-profile-posts";

interface ProfilePostsListProps {
  logo?: string;
  name: string;
}

export const ProfilePostsList = ({ logo, name }: ProfilePostsListProps) => {
  const [sort, setSort] = useState<"New" | "Relevant">("New");
  const [posts, setPosts] = useState(useNewestProfilePosts());

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );
  }
  if (!posts)
    return (
      <div className="flex items-center justify-center text-3xl font-semibold text-primary">
        No posts found. Please create a new one.
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">
          My {posts?.length} posts
        </h1>
        <div className="flex items-center ">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            SORT BY
          </span>
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ChevronDown className="h-4 w-4" />}
                variant="light"
                color="primary"
                className="font-bold"
              >
                {sort}
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="bg-white text-primary dark:bg-primary">
              <DropdownItem onClick={() => setSort("New")}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col items-start gap-0.5">
                    <p className="text-sm font-bold">Newest</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Display newest posts
                    </p>
                  </div>
                  {sort === "New" && <Check className="h-6 w-6" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => setSort("Relevant")}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col items-start gap-0.5">
                    <p className="text-sm font-bold">Relevant</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Display the most recent comments on posts
                    </p>
                  </div>
                  {sort === "Relevant" && <Check className="h-6 w-6" />}
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {posts.map((post) => (
        <ProfilePostItem
          id={post.id}
          images={post.postImages}
          content={post.content || undefined}
          key={post.content}
          name={name}
          logo={logo!}
          createdAt={post.createdAt}
          isModified={post.createdAt !== post.updatedAt}
          status={post.status}
          comments={post.comments}
        />
      ))}
    </>
  );
};
