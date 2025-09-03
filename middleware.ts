import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization") ||
    request.cookies.get("next-auth.session-token")?.value

  // Mobile app routes protection
  if (pathname.startsWith("/m")) {
    // Only /m/login is public
    if (!token && pathname !== "/m/login") {
      return NextResponse.redirect(new URL("/m/login", request.url))
    }
    // If authenticated and accessing /m/login, redirect to /m
    if (token && pathname === "/m/login") {
      return NextResponse.redirect(new URL("/m", request.url))
    }
    // Allow all other /m routes if authenticated
    return NextResponse.next()
  }

  // Website routes protection (existing logic)
  if (
    [
      "/meet",
      "/matches",
      "/search",
      "/chatrooms",
      "/groups",
      "/events",
      "/forum",
      "/dashboard",
      "/profile/edit",
      "/profile/settings",
      "/messages",
      "/admin",
    ].some((route) => pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Website protected routes
    "/meet/:path*",
    "/matches/:path*",
    "/search/:path*",
    "/chatrooms/:path*",
    "/groups/:path*",
    "/events/:path*",
    "/forum/:path*",
    "/dashboard/:path*",
    "/profile/edit/:path*",
    "/profile/settings/:path*",
    "/messages/:path*",
    "/admin/:path*",
    // Mobile app routes
    "/m/:path*",
  ],
}