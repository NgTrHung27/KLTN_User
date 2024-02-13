"use client";

import { useCurrentUser } from "./use-current-user";

export const useNewestProfilePosts = () => {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  const profile = user.profile;

  if (!profile) {
    return null;
  }

  const posts = profile.posts;

  if (posts.length === 0) {
    return null;
  }

  return posts;
};
