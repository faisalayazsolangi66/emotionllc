import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization") ||
    request.cookies.get("next-auth.session-token")?.value

  // If not authenticated, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
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
  ],
}