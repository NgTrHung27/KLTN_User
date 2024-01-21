import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiEdgestorePrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const locales = ["en", "vi"];
  const defaultLocale = "en";

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const getLocale = () => {
    const headers = { "accept-language": "en" };
    let languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale); // -> 'en'
  };

  const isLocalePathname = locales.some(
    (locale) =>
      nextUrl.pathname.startsWith(`/${locale}`) ||
      nextUrl.pathname === `${locale}`,
  );

  const locale = getLocale();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiEdgestoreRoute = nextUrl.pathname.startsWith(apiEdgestorePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isApiEdgestoreRoute) {
    return null;
  }

  if (!isLocalePathname) {
    return Response.redirect(new URL(`/${locale}${nextUrl.pathname}`, nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  console.log(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    console.log("meomeo");
    return Response.redirect(new URL(`/${locale}/auth/login`, nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
