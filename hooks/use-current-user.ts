"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  console.log(session);

  if (!session.data?.user) {
    return null;
  }

  return session.data.user;
};
