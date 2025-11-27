import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected =
        nextUrl.pathname.startsWith("/add-event") ||
        nextUrl.pathname.startsWith("/manage-events");
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (
          nextUrl.pathname.startsWith("/login") ||
          nextUrl.pathname.startsWith("/register")
        ) {
          return Response.redirect(new URL("/manage-events", nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
