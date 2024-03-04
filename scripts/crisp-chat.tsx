"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d778616d-cf01-4555-91c0-7b30b1dd820f");
  }, []);

  return null;
};
