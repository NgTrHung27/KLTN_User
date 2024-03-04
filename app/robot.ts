import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/en/auth/login",
        "/vi/auth/login",
        "/en/auth/register",
        "/en/auth/register",
        "/",
      ],
      disallow: "*/profile",
    },
  };
}
